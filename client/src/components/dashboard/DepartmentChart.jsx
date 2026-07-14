const DepartmentChart = ({ data = [] }) => {
  const max = Math.max(...data.map((d) => d.totalTasks), 1);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Department Performance</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No department data.</p>
      ) : (
        <div className="space-y-5">
          {data.map((dept) => (
            <div key={dept._id}>
              <div className="flex justify-between mb-2">
                <span>{dept._id}</span>
                <span>{dept.totalTasks}</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-[#134080] h-3 rounded-full"
                  style={{
                    width: `${(dept.totalTasks / max) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentChart;
