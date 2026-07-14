const EmployeePerformanceTable = ({ employees }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">Employee Performance</h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-5 py-3">Employee</th>
            <th>Assigned</th>
            <th>Completed</th>
            <th>Pending</th>
            <th>Completion</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t text-center">
              <td className="text-left px-5 py-4">
                <div>
                  <h3 className="font-semibold">{emp.name}</h3>
                  <p className="text-sm text-gray-500">{emp.designation}</p>
                </div>
              </td>

              <td>{emp.assigned}</td>

              <td>{emp.completed}</td>

              <td>{emp.pending}</td>

              <td>
                <span className="font-semibold text-green-600">
                  {emp.completion}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeePerformanceTable;
