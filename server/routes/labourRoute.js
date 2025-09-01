import express from "express";
const router = express.Router();
import { createLabour } from "../controllers/labourController.js";
import { isAuthenticated } from "../middleware/auth.js";

router.post("/create", isAuthenticated, createLabour);

export const labourRoutes = router;
