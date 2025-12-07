import express from "express";
import { config } from "dotenv";
import { connection } from "./config/db.js";
import { errorMiddleware } from "./middleware/error.js";
import { authRoutes } from "./routes/authRoutes.js";
import { siteRoutes } from "./routes/siteRoute.js";
import supervisorRoute from "./routes/supervisorRoute.js";
import cookieParser from "cookie-parser";
import { labourRoutes } from "./routes/labourRoute.js";
import cors from "cors";

config({ path: "./.env" });

export const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/supervisor", supervisorRoute);
app.use("/api/labour", labourRoutes);
app.use("/api/sites", siteRoutes);


connection();


app.use(errorMiddleware);
