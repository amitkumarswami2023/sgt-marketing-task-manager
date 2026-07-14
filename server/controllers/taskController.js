import Task from "../models/Task.js";
import User from "../models/User.js";

// ========================
// Create Task
// ========================
export const createTask = async (req, res) => {
  try {
    let { title, description, assignedTo, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    // Employee can only assign task to himself
    if (req.user.role === "employee") {
      assignedTo = req.user._id;
    }

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "Please select an assigned user.",
      });
    }

    const employee = await User.findById(assignedTo);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found.",
      });
    }

    // Team Lead can assign only within own department
    if (
      req.user.role === "team-lead" &&
      employee.department !== req.user.department
    ) {
      return res.status(403).json({
        success: false,
        message: "You can assign tasks only within your department.",
      });
    }

    let task = await Task.create({
      title,
      description,
      department:
        req.user.role === "admin" ? employee.department : req.user.department,
      assignedBy: req.user._id,
      assignedTo,
      priority,
      dueDate,
    });

    task = await Task.findById(task._id)
      .populate("assignedTo", "name email designation")
      .populate("assignedBy", "name");

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// Get All Tasks
// ========================
// GET TASKS BASED ON USER DEPARTMENT
export const getDepartmentTasks = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role !== "admin") {
      filter.department = req.user.department;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email designation")
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// Get My Tasks
// ========================
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id,
    }).populate("assignedBy", "name");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// Update Task
// ========================
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Team Lead - only own department
    if (
      req.user.role === "team-lead" &&
      task.department !== req.user.department
    ) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your department tasks",
      });
    }

    // Employee - only his own task
    if (
      req.user.role === "employee" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own tasks",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    res.json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================
// Delete Task
// ========================
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Team Lead
    if (
      req.user.role === "team-lead" &&
      task.department !== req.user.department
    ) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete other department tasks",
      });
    }

    // Employee
    if (
      req.user.role === "employee" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete other user's task",
      });
    }

    await task.deleteOne();

    res.json({
      success: true,

      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================
// Update Task Status
// ========================
export const updateTaskStatus = async (req, res) => {
  try {
    const { status, progress } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // =========================
    // TEAM LEAD
    // Only own department tasks
    // =========================

    if (
      req.user.role === "team-lead" &&
      task.department !== req.user.department
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your department tasks.",
      });
    }

    // =========================
    // EMPLOYEE
    // Only own assigned tasks
    // =========================

    if (
      req.user.role === "employee" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can update only your own tasks.",
      });
    }

    // =========================
    // UPDATE STATUS
    // =========================

    task.status = status;

    if (progress !== undefined) {
      task.progress = progress;
    }

    // Completed handling

    if (status === "Completed") {
      task.progress = 100;
      task.completedAt = new Date();
    } else {
      task.completedAt = null;
    }

    await task.save();

    res.status(200).json({
      success: true,

      message: "Task status updated successfully.",

      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
