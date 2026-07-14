import User from "../models/User.js";
import Task from "../models/Task.js";

// ================= ADMIN =================
export const adminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" },
    });

    const recentTasks = await Task.find()
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    const departmentStats = await Task.aggregate([
      {
        $group: {
          _id: "$department",
          totalTasks: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        overdueTasks,
      },

      recentTasks,
      recentUsers,
      departmentStats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= TEAM LEAD =================
// ================= TEAM LEAD =================
export const teamLeadDashboard = async (req, res) => {
  try {
    const department = req.user.department;

    const members = await User.countDocuments({
      department,
    });

    const totalTasks = await Task.countDocuments({
      department,
    });

    const completed = await Task.countDocuments({
      department,
      status: "Completed",
    });

    const pending = await Task.countDocuments({
      department,
      status: "Pending",
    });

    const inProgress = await Task.countDocuments({
      department,
      status: "In Progress",
    });

    // Recent team tasks
    const recentTasks = await Task.find({
      department,
    })
      .populate("assignedTo", "name email designation")
      .sort({ createdAt: -1 })
      .limit(5);

    // Team members list
    const teamMembers = await User.find({
      department,
    })
      .select("-password")
      .limit(5);

    // Progress percentage
    const progress =
      totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

    res.json({
      success: true,

      stats: {
        members,
        totalTasks,
        completed,
        pending,
        progress,
      },

      recentTasks,

      teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EMPLOYEE =================
export const employeeDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Task.countDocuments({
      assignedTo: userId,
    });

    const completed = await Task.countDocuments({
      assignedTo: userId,
      status: "Completed",
    });

    const pending = await Task.countDocuments({
      assignedTo: userId,
      status: "Pending",
    });

    const progress = await Task.countDocuments({
      assignedTo: userId,
      status: "In Progress",
    });

    const dueToday = await Task.countDocuments({
      assignedTo: userId,
      dueDate: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999),
      },
    });

    res.json({
      success: true,

      stats: {
        total,
        completed,
        pending,
        progress,
        dueToday,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
