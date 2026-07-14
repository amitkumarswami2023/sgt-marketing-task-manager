import { CalendarDays, Flag } from "lucide-react";

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColors = {
  Pending: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
};

const RecentTasks = ({ tasks = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">Recent Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 hover:bg-slate-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-500">
                    Assigned to {task.assignedTo?.name}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    priorityColors[task.priority]
                  }`}
                >
                  <Flag size={12} className="inline mr-1" />
                  {task.priority}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[task.status]
                  }`}
                >
                  {task.status}
                </span>

                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays size={15} className="mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTasks;
