import express from "express";
import multerUpload from "../config/multer.config.js";
import {
  createBusinessForm,
  getBusinessForms,
  getBusinessFormById,
  updateBusinessForm,
} from "../controllers/businessFormController.js";

const router = express.Router();

router.post("/businessform", multerUpload.single("logo"), createBusinessForm);
router.get("/businessforms/:userId", getBusinessForms);
router.get("/businessform/:businessFormId", getBusinessFormById);
router.put(
  "/businessform/:businessFormId",
  multerUpload.single("logo"),
  updateBusinessForm
);
export default router;
