import {
  Calendar,
  User,
  UserRound,
  Building2,
  Link2,
  Pencil,
  Trash2,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import PriorityBadge from "../common/PriorityBadge";
import ProgressBar from "../common/ProgressBar";

const TaskTable = ({
  tasks,
  user,
  onEdit,
  onDelete,
  onView,
  onStatusChange,
  onDeliverables,
}) => {
  if (!tasks.length) {
    return (
      <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow">
        No Tasks Found
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {tasks.map((task) => {
        const canEdit =
          user.role === "admin" || task.assignedBy?._id === user._id;

        const canDelete =
          user.role === "admin" || task.assignedBy?._id === user._id;

        const canUpdateStatus = task.assignedTo?._id === user._id;

        return (
          <div
            key={task._id}
            className="bg-white rounded-2xl shadow border border-slate-200 p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {task.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {task.description || "No description provided"}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
              <div className="flex items-start gap-3">
                <UserRound size={18} className="text-[#134080] mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Assigned By</p>
                  <p className="font-medium">{task.assignedBy?.name || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User size={18} className="text-[#134080] mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Assigned To</p>
                  <p className="font-medium">{task.assignedTo?.name || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 size={18} className="text-[#134080] mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="font-medium">{task.department}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-[#134080] mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress */}
            {/* <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>

                <span className="text-sm font-semibold text-[#134080]">
                  {task.progress}%
                </span>
              </div>

              <ProgressBar progress={task.progress} />
            </div> */}

            {/* Footer */}
            <div className="mt-6 flex flex-col xl:flex-row xl:justify-between gap-4">
              <button
                onClick={() => onDeliverables(task)}
                className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium"
              >
                <Link2 size={18} />
                Deliverables ({task.deliverables?.length || 0})
              </button>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onView(task)}
                  className="px-4 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium"
                >
                  View
                </button>

                {canEdit && (
                  <button
                    onClick={() => onEdit(task)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                )}

                {canDelete && (
                  <button
                    onClick={() => onDelete(task)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                )}

                {canUpdateStatus && (
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task._id, e.target.value)}
                    className="border rounded-lg px-4 py-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskTable;
