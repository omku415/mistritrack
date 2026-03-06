import express from "express";
import { exportAttendance } from "../controllers/attendanceController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Export attendance Excel
router.get("/export", isAuthenticated, exportAttendance);

export default router;