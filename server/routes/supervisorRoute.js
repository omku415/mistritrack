import express from "express";
import { createSupervisor } from "../controllers/supervisor.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/create", isAuthenticated, createSupervisor);

export default router;
