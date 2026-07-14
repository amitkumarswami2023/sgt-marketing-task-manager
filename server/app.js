import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Marketing Command Center API Running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    server: "Running",
  });
});

export default app;
