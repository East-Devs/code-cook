import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Home", // Optional, specify folder name in Cloudinary
    format: async (req, file) => "png", // Example file format
  },
});

const multerUpload = multer({ storage: storage });

export default multerUpload;
