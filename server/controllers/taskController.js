import Task from "../models/Task.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
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
    // if (req.user.role === "employee") {
    //   assignedTo = req.user._id;
    // }

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
    // if (
    //   req.user.role === "team-lead" &&
    //   employee.department !== req.user.department
    // ) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You can assign tasks only within your department.",
    //   });
    // }

    let task = await Task.create({
      title,
      description,
      department: employee.department,
      assignedBy: req.user._id,
      assignedTo,
      priority,
      dueDate,
    });

    task = await Task.findById(task._id)
      .populate("assignedTo", "name email designation")
      .populate("assignedBy", "name")
      .populate("deliverables.addedBy", "name");

    await Notification.create({
      user: assignedTo,
      sender: req.user._id,
      task: task._id,
      type: "task_assigned",
      title: "New Task Assigned",
      message: `${req.user.name} assigned you "${task.title}".`,
    });

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
    let tasks = await Task.find()
      .populate("assignedTo", "name email designation department role")
      .populate("assignedBy", "name department role")
      .populate("deliverables.addedBy", "name")
      .sort({ createdAt: -1 });

    // Admin
    if (req.user.role === "admin") {
      return res.json({
        success: true,
        tasks,
      });
    }

    // Team Lead
    if (req.user.role === "team-lead") {
      tasks = tasks.filter(
        (task) =>
          task.assignedBy?._id.toString() === req.user._id.toString() ||
          task.assignedTo?.department === req.user.department,
      );

      return res.json({
        success: true,
        tasks,
      });
    }

    // Employee
    tasks = tasks.filter(
      (task) =>
        task.assignedBy?._id.toString() === req.user._id.toString() ||
        task.assignedTo?._id.toString() === req.user._id.toString(),
    );

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
    // Employee - only his own task
    if (req.user.role === "admin") {
      // allowed
    } else if (task.assignedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can edit only your own created tasks.",
      });
    }

    Object.assign(task, req.body);

    // If task is reassigned, update department automatically
    if (req.body.assignedTo) {
      const assignedUser = await User.findById(req.body.assignedTo);

      if (assignedUser) {
        task.department = assignedUser.department;
      }
    }
    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email designation department")
      .populate("assignedBy", "name")
      .populate("deliverables.addedBy", "name");

    res.json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
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

    // Admin can delete everything
    if (req.user.role !== "admin") {
      if (task.assignedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You can delete only tasks created by you.",
        });
      }
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

    // Only the assigned employee can update progress/status

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the assigned user can update task status.",
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

    await Notification.create({
      user: task.assignedBy,
      sender: req.user._id,
      task: task._id,
      type: "task_status_changed",
      title: "Task Status Updated",
      message: `${req.user.name} changed "${task.title}" to ${task.status}.`,
    });

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email designation department")
      .populate("assignedBy", "name")
      .populate("deliverables.addedBy", "name");

    res.status(200).json({
      success: true,

      message: "Task status updated successfully.",

      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================
// Add Deliverable
// ========================
export const addDeliverable = async (req, res) => {
  try {
    const { title, url } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Only assigned user can submit deliverables
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Only the assigned user can submit deliverables.",
      });
    }

    task.deliverables.push({
      title,
      url,
      addedBy: req.user._id,
    });

    await task.save();

    await Notification.create({
      user: task.assignedBy,
      sender: req.user._id,
      task: task._id,
      type: "deliverable_added",
      title: "Deliverable Submitted",
      message: `${req.user.name} submitted a deliverable for "${task.title}".`,
    });

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email designation")
      .populate("assignedBy", "name")
      .populate("deliverables.addedBy", "name");

    res.status(200).json({
      success: true,
      message: "Deliverable added successfully.",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
