import { useSelector } from "react-redux";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

const ProfileStats = () => {
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);

  let myTasks = [];

  if (user?.role === "admin") {
    myTasks = tasks;
  } else if (user?.role === "team-lead") {
    myTasks = tasks.filter((task) => task.department === user.department);
  } else {
    myTasks = tasks.filter((task) => task.assignedTo?._id === user._id);
  }

  const total = myTasks.length;

  const completed = myTasks.filter((t) => t.status === "Completed").length;

  const pending = myTasks.filter((t) => t.status !== "Completed").length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      color: "bg-[#134080]",
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-600",
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: pending,
      color: "bg-yellow-500",
      icon: Clock,
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

export default ProfileStats;
