import { Pencil, Trash2, Eye } from "lucide-react";

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
}) => {
  if (!tasks.length) {
    return (
      <div className="bg-white rounded-xl p-10 text-center text-gray-500">
        No Tasks Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-6 py-4">Task</th>

            <th className="text-left px-6 py-4">Assigned To</th>

            <th className="text-left px-6 py-4">Department</th>

            <th className="text-left px-6 py-4">Priority</th>

            <th className="text-left px-6 py-4">Status</th>

            <th className="text-left px-6 py-4">Progress</th>

            <th className="text-left px-6 py-4">Due Date</th>

            <th className="text-center px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t hover:bg-slate-50">
              <td className="px-6 py-4">
                <h3 className="font-semibold">{task.title}</h3>

                <p className="text-sm text-gray-500">{task.description}</p>
              </td>

              <td className="px-6 py-4">{task.assignedTo?.name}</td>

              <td className="px-6 py-4">{task.department}</td>

              <td className="px-6 py-4">
                <PriorityBadge priority={task.priority} />
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={task.status} />
              </td>

              <td className="px-6 py-4">
                <ProgressBar progress={task.progress} />
              </td>

              <td className="px-6 py-4">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {/* View - Everyone */}
                  <button
                    onClick={() => onView(task)}
                    className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-sm"
                  >
                    View
                  </button>

                  {/* Edit - Admin + Team Lead + Employee */}
                  {user && (
                    <button
                      onClick={() => onEdit(task)}
                      className="px-3 py-1 rounded bg-blue-100 text-blue-700"
                    >
                      Edit
                    </button>
                  )}

                  {/* Status - Everyone */}
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task._id, e.target.value)}
                    className="border rounded-lg px-3 py-2"
                  >
                    <option value="Pending">Pending</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Completed">Completed</option>

                    <option value="On Hold">On Hold</option>
                  </select>

                  {/* Delete - Everyone */}
                  {user && (
                    <button
                      onClick={() => onDelete(task)}
                      className="px-3 py-1 rounded bg-red-100 text-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
