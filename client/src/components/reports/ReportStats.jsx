import { ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const ReportStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0,
      color: "bg-[#134080]",
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: stats.completedTasks || 0,
      color: "bg-green-600",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: stats.pendingTasks || 0,
      color: "bg-yellow-500",
      icon: Clock,
    },
    {
      title: "Overdue",
      value: stats.overdueTasks || 0,
      color: "bg-red-600",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-5 flex justify-between"
          >
            <div>
              <p className="text-gray-500">{card.title}</p>
              <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
            </div>

            <div
              className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center`}
            >
              <Icon className="text-white" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportStats;
