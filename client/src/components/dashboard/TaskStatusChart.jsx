const TaskStatusChart = ({ stats }) => {
  const data = [
    {
      label: "Completed",
      value: stats?.completedTasks || 0,
      color: "bg-green-500",
    },
    {
      label: "In Progress",
      value: stats?.inProgressTasks || 0,
      color: "bg-blue-500",
    },
    {
      label: "Pending",
      value: stats?.pendingTasks || 0,
      color: "bg-yellow-500",
    },
    {
      label: "Overdue",
      value: stats?.overdueTasks || 0,
      color: "bg-red-500",
    },
  ];

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Task Status</h2>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2">
              <span>{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${item.color} h-3 rounded-full`}
                style={{
                  width: `${(item.value / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusChart;
