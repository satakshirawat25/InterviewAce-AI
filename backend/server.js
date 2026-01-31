import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import  sessionRoutes  from "./routes/sessionRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB()

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
app.use("/api/auth",authRoutes)
app.use("/api/sessions",sessionRoutes)
// app.use("/api/questions",questionRoutes)

// app.use("/api/ai/generate-question",protect,generateInterviewQuestions)
// app.use("/api/ai/generate-explanations",protect,generateConceptExplanation)






app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at ${PORT}`));
