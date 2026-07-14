import { Users, ClipboardList, CheckCircle2, Clock3 } from "lucide-react";

import StatCard from "../common/StatCard";

const KPICards = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-600",
      change: "+0%",
    },
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: ClipboardList,
      color: "bg-purple-600",
      change: "+0%",
    },
    {
      title: "Completed Tasks",
      value: stats?.completedTasks || 0,
      icon: CheckCircle2,
      color: "bg-green-600",
      change: "+0%",
    },
    {
      title: "In Progress",
      value: stats?.inProgressTasks || 0,
      icon: Clock3,
      color: "bg-orange-500",
      change: "+0%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default KPICards;
