import {
  ClipboardList,
  Clock,
  Loader,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const TaskStats = ({ tasks }) => {
  const total = tasks.length;

  const pending = tasks.filter((t) => t.status === "Pending").length;

  const progress = tasks.filter((t) => t.status === "In Progress").length;

  const completed = tasks.filter((t) => t.status === "Completed").length;

  const overdue = tasks.filter((t) => {
    return (
      t.status !== "Completed" && t.dueDate && new Date(t.dueDate) < new Date()
    );
  }).length;

  const cards = [
    {
      title: "Total",
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
    {
      title: "Overdue",
      value: overdue,
      color: "bg-red-600",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
      {cards.map((card) => {
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
              <Icon className="text-white" size={26} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStats;
