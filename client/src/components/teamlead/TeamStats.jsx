import { Users, CheckCircle, Clock } from "lucide-react";

const TeamStats = ({ members }) => {
  const total = members.length;

  const completed = members.reduce(
    (sum, m) => sum + (m.completedTasks || 0),
    0,
  );

  const pending = members.reduce((sum, m) => sum + (m.pendingTasks || 0), 0);

  const cards = [
    {
      title: "Team Members",
      value: total,
      icon: Users,
      color: "bg-[#134080]",
    },
    {
      title: "Completed Tasks",
      value: completed,
      icon: CheckCircle,
      color: "bg-green-600",
    },
    {
      title: "Pending Tasks",
      value: pending,
      icon: Clock,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-5">
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
              <Icon className="text-white" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStats;
