const RecentTasksTable = ({ tasks }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">Recent Tasks</h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-5 py-3">Task</th>
            <th>Status</th>
            <th>Assigned To</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t">
              <td className="px-5 py-4">{task.title}</td>

              <td>{task.status}</td>

              <td>{task.assignedTo?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTasksTable;
