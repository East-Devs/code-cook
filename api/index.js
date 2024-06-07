import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "../script.js";
import { getUserByEmail } from "./data/user.js";
import jwt from "jsonwebtoken";
import OpenAI from "openai";
import multerUpload from "./middleware/multer.config.js";
import cloudinary from "./middleware/cloudinary.config.js";
const secretKey = process.env.JWT_SECRET;
import bcryptjs from "bcryptjs";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

app.get("/", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to connet with openAI" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      userId: user.id,
      userEmail: user.email,
      success: "Logged In!",
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.post("/register", async (req, res) => {
  const user = req.body;
  const { email, password, name } = user;
  const takenEmail = await getUserByEmail(email);
  if (takenEmail) {
    res.json({ error: "Email already in use!" });
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.json({ success: "User Created!" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// businessform
app.post("/businessform", multerUpload.single("logo"), async (req, res) => {
  const {
    name,
    address,
    email,
    primaryColor,
    secondaryColor,
    typeOfBusiness,
    description,
    targetCompanyName,
    targetCompanyEmail,
    targetAudience,
    emailStyle,
    userId,
  } = req.body;
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result.secure_url);
    // Save company data including Cloudinary image URL to Prisma
    const company = await prisma.businessForm.create({
      data: {
        name,
        address,
        email,
        primaryColor,
        secondaryColor,
        typeOfBusiness,
        description,
        targetCompanyName,
        targetCompanyEmail,
        targetAudience,
        emailStyle,
        user: { connect: { id: Number(userId) } },
        logo: result.secure_url, // Assuming 'secure_url' from Cloudinary response
      },
    });

    res.status(201).json({ company, success: "Success!" });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Error uploading file" });
  }
});
