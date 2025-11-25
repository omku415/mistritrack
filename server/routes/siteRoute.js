import express from "express";
const router = express.Router();

import { createSite,getAllSites} from "../controllers/siteController.js";
import { isAuthenticated } from "../middleware/auth.js";
import upload from "../Cloudinary/upload.js"

// Use upload.single("image") to handle a single image file from the frontend
router.post("/create", isAuthenticated, upload.single("image"), createSite);
router.get("/all", isAuthenticated, getAllSites);

export const siteRoutes = router;
