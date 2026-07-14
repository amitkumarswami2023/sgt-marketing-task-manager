import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipboardList, Clock, Loader, CheckCircle } from "lucide-react";
import { getTasks } from "../../features/tasks/taskSlice";
import ProgressBar from "../../components/common/ProgressBar";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const total = tasks.length;

  const pending = tasks.filter((task) => task.status === "Pending").length;

  const progress = tasks.filter((task) => task.status === "In Progress").length;

  const completed = tasks.filter((task) => task.status === "Completed").length;

  const stats = [
    {
      title: "My Tasks",
      value: total,
      color: "bg-[#134080]",
      icon: ClipboardList,
    },
    {
      title: "Pending",
      value: pending,
      color: "bg-yellow-500",
      icon: Clock,
    },
    {
      title: "In Progress",
      value: progress,
      color: "bg-blue-500",
      icon: Loader,
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-600",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500 mt-1">
          Here's an overview of your assigned work.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center`}
              >
                <Icon className="text-white" size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}

      <div className="bg-white rounded-xl shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-3">Task</th>

                <th className="text-left px-6 py-3">Priority</th>

                <th className="text-left px-6 py-3">Status</th>

                <th className="text-left px-6 py-3">Progress</th>

                <th className="text-left px-6 py-3">Due Date</th>
              </tr>
            </thead>

            <tbody>
              {tasks.slice(0, 5).map((task) => (
                <tr key={task._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{task.title}</td>

                  <td className="px-6 py-4">{task.priority}</td>

                  <td className="px-6 py-4">{task.status}</td>

                  <td className="px-6 py-4 w-52">
                    <ProgressBar progress={task.progress} />
                  </td>

                  <td className="px-6 py-4">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Deadlines */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">Upcoming Deadlines</h2>

        <div className="space-y-4">
          {tasks
            .filter((task) => task.status !== "Completed")
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 5)
            .map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>

                  <p className="text-sm text-gray-500">{task.department}</p>
                </div>

                <span className="text-sm font-medium text-red-600">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
