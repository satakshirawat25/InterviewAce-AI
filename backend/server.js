import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware handle to cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware
app.use(express.json());

// routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at ${PORT}`));
