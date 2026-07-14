import { Users, ClipboardList, CheckCircle2, TrendingUp } from "lucide-react";

import StatCard from "../common/StatCard";

const TeamLeadKPICards = ({ stats }) => {
  const cards = [
    {
      title: "Team Members",
      value: stats?.members || 0,
      icon: Users,
      color: "bg-blue-600",
      change: "Members",
    },
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
      icon: ClipboardList,
      color: "bg-orange-500",
      change: "Assigned",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: "bg-green-600",
      change: "Finished",
    },
    {
      title: "Team Progress",
      value: stats?.progress || 0,
      suffix: "%",
      icon: TrendingUp,
      color: "bg-purple-600",
      change: "Overall",
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

export default TeamLeadKPICards;
