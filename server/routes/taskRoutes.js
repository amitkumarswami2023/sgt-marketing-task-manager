import express from "express";

import {
  createTask,
  getDepartmentTasks,
  getMyTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
  addDeliverable,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Create Task
// ==========================
router.post("/", protect, createTask);

// ==========================
// Get Tasks
// ==========================
router.get("/department", protect, getDepartmentTasks);

// ==========================
// My Tasks
// ==========================
router.get("/my", protect, getMyTasks);

// ==========================
// Update Task
// ==========================
router.put("/:id", protect, updateTask);

// ==========================
// Update Status
// ==========================
router.patch("/:id/status", protect, updateTaskStatus);

// ==========================
// Add Deliverable
// ==========================
router.post("/:id/deliverables", protect, addDeliverable);

// ==========================
// Delete Task
// ==========================
router.delete("/:id", protect, deleteTask);

export default router;
