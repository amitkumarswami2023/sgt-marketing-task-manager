import express from "express";

import {
  createTask,
  getDepartmentTasks,
  getMyTasks,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Task
// Admin, Team Lead, Employee
router.post("/", protect, createTask);

// Admin gets all tasks
// Team Lead + Employee get department tasks
router.get("/department", protect, getDepartmentTasks);

// Logged in user personal tasks
router.get("/my", protect, getMyTasks);

// Edit Task
// All roles
router.put("/:id", protect, updateTask);

// Change Status
// All roles
router.patch("/:id/status", protect, updateTaskStatus);

// Delete Task
// All roles
router.delete("/:id", protect, deleteTask);

export default router;
