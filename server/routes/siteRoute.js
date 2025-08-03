import express from "express";
const router = express.Router();

import { createSite } from "../controllers/siteController.js";
import { isAuthenticated } from "../middleware/auth.js";

router.post("/create", isAuthenticated, createSite);

export const siteRoutes = router;
