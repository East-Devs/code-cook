import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import businessFormRoutes from "./routes/businessFormRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", businessFormRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
