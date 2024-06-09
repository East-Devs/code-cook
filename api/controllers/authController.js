import { getUserByEmail } from "../data/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../script.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

export const login = async (req, res) => {
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
};

export const register = async (req, res) => {
  const { email, password, name } = req.body;
  const takenEmail = await getUserByEmail(email);

  if (takenEmail) {
    res.json({ error: "Email already in use!" });
  } else {
    const hashedPassword = await bcryptjs.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json({ success: "User Created!" });
  }
};
