import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "../script.js";
import { getUserByEmail } from "./data/user.js";
import jwt from "jsonwebtoken";
import OpenAI from "openai";
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

    res.status(200).json({ token, userId: user.id, success: "Logged In!" });
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
