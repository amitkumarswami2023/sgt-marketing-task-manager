import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    department: {
      type: String,
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "On Hold"],
      default: "Pending",
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    dueDate: Date,

    completedAt: Date,

    remarks: {
      type: String,
      default: "",
    },

    attachments: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],

    // Final work submitted by the assignee
    deliverables: [
      {
        title: {
          type: String,
          required: true,
        },

        url: {
          type: String,
          required: true,
        },

        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        comment: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Task", taskSchema);
