// middleware/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // ES module import

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "site_images", // change folder name if needed
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
