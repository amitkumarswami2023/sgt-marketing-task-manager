import {
  CalendarDays,
  Flag,
  CheckCircle2,
  Building2,
  FileText,
  TrendingUp,
} from "lucide-react";

const badgeColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "In Progress":
      return "bg-blue-100 text-blue-700";

    default:
      return "bg-red-100 text-red-700";
  }
};

const TaskEventModal = ({ open, onClose, task }) => {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[650px] p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">{task.title}</h2>

          <span
            className={`px-3 py-1 rounded-full text-sm ${badgeColor(
              task.status,
            )}`}
          >
            {task.status}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="flex gap-3">
            <FileText />
            <div>
              <p className="text-gray-500">Description</p>
              <h3>{task.description || "-"}</h3>
            </div>
          </div>

          <div className="flex gap-3">
            <Building2 />
            <div>
              <p className="text-gray-500">Department</p>
              <h3>{task.department}</h3>
            </div>
          </div>

          <div className="flex gap-3">
            <Flag />
            <div>
              <p className="text-gray-500">Priority</p>
              <h3>{task.priority}</h3>
            </div>
          </div>

          <div className="flex gap-3">
            <TrendingUp />
            <div>
              <p className="text-gray-500">Progress</p>
              <h3>{task.progress}%</h3>
            </div>
          </div>

          <div className="flex gap-3">
            <CalendarDays />
            <div>
              <p className="text-gray-500">Due Date</p>

              <h3>{new Date(task.dueDate).toLocaleDateString()}</h3>
            </div>
          </div>

          <div className="flex gap-3">
            <CheckCircle2 />
            <div>
              <p className="text-gray-500">Assigned By</p>

              <h3>{task.assignedBy?.name}</h3>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="bg-[#134080] text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEventModal;
