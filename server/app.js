import express from "express";
import { config } from "dotenv";
import { connection } from "./config/db.js";
import { errorMiddleware } from "./middleware/error.js";
import { authRoutes } from "./routes/authRoutes.js";
import { siteRoutes } from "./routes/siteRoute.js";
import cookieParser from "cookie-parser";

config({ path: "./.env" });

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/sites", siteRoutes);

connection();
app.use(errorMiddleware);
