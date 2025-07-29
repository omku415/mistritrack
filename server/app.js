import express from "express";
import { config } from "dotenv";
import { connection } from "./config/db.js";


config({ path: "./.env" });


connection();