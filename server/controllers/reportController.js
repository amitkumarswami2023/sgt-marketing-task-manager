import Task from "../models/Task.js";
import User from "../models/User.js";

export const getTeamReport = async (req, res) => {
  try {
    let taskFilter = {};
    let userFilter = {};

    // Admin
    if (req.user.role === "admin") {
      // No filters
    }

    // Team Lead
    else if (req.user.role === "team-lead") {
      taskFilter.department = req.user.department;

      userFilter.department = req.user.department;
      userFilter.role = "employee";
    }

    // Employee
    else {
      taskFilter.assignedTo = req.user._id;

      userFilter._id = req.user._id;
    }

    const tasks = await Task.find(taskFilter).populate(
      "assignedTo",
      "name designation",
    );

    const employees = await User.find(userFilter);

    // ===========================
    // Statistics
    // ===========================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter((t) => t.status === "Completed").length;

    const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

    const progressTasks = tasks.filter(
      (t) => t.status === "In Progress",
    ).length;

    const overdueTasks = tasks.filter((t) => {
      return (
        t.status !== "Completed" &&
        t.dueDate &&
        new Date(t.dueDate) < new Date()
      );
    }).length;

    // ===========================
    // Employee Report
    // ===========================

    const employeeReport = employees.map((employee) => {
      const employeeTasks = tasks.filter(
        (task) =>
          task.assignedTo &&
          task.assignedTo._id.toString() === employee._id.toString(),
      );

      const assigned = employeeTasks.length;

      const completed = employeeTasks.filter(
        (t) => t.status === "Completed",
      ).length;

      const pending = employeeTasks.filter(
        (t) => t.status !== "Completed",
      ).length;

      const completion =
        assigned === 0 ? 0 : Math.round((completed / assigned) * 100);

      return {
        _id: employee._id,
        name: employee.name,
        designation: employee.designation,
        assigned,
        completed,
        pending,
        completion,
      };
    });

    // ===========================
    // Recent Tasks
    // ===========================

    const recentTasks = tasks
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);

    res.json({
      success: true,

      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        progressTasks,
        overdueTasks,
      },

      employees: employeeReport,

      recentTasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
