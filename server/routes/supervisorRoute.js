import express from "express";
import { createSupervisor,getSupervisorDashboard,getSupervisorLabours,markAttendance,getTodayAttendance} from "../controllers/supervisor.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();


router.post("/create", isAuthenticated, createSupervisor);
router.get("/dashboard", isAuthenticated, getSupervisorDashboard);
router.get("/labours", isAuthenticated, getSupervisorLabours);
router.post("/markAttendance", isAuthenticated, markAttendance);
router.get("/today-attendance", isAuthenticated, getTodayAttendance);



export default router;
