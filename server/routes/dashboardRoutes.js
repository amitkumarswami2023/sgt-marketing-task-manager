import express from "express";

import {
  adminDashboard,
  teamLeadDashboard,
  employeeDashboard,
} from "../controllers/dashboardController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, adminDashboard);

router.get("/teamlead", protect, teamLeadDashboard);

router.get("/employee", protect, employeeDashboard);

export default router;
