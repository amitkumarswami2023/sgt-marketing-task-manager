import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getTeamReport } from "../controllers/reportController.js";

const router = express.Router();

// Team Lead & Admin Reports
router.get("/team", protect, getTeamReport);

export default router;
