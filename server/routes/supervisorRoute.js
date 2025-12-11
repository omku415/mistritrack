import express from "express";
import { createSupervisor,getSupervisorDashboard } from "../controllers/supervisor.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/create", isAuthenticated, createSupervisor);
router.get("/dashboard", isAuthenticated, getSupervisorDashboard);

export default router;
