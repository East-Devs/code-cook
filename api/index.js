import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "../script.js";
import { getUserByEmail } from "../data/user.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;
import bcryptjs from "bcryptjs";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users); // Ensure you're sending JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
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
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id, success: "Logged In!" });
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
