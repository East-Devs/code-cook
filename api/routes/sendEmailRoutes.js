import express from "express";
import { sendEmails } from "../controllers/sendEmailController.js";

const router = express.Router();

router.post("/send-emails", sendEmails);

export default router;
