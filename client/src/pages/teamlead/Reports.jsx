import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTeamReport } from "../../features/reports/reportSlice";

import ReportStats from "../../components/reports/ReportStats";
import EmployeePerformanceTable from "../../components/reports/EmployeePerformanceTable";
import RecentTasksTable from "../../components/reports/RecentTasksTable";

const TeamReports = () => {
  const dispatch = useDispatch();

  const { stats, employees, recentTasks } = useSelector(
    (state) => state.reports,
  );

  useEffect(() => {
    dispatch(getTeamReport());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Reports</h1>

        <p className="text-gray-500">Monitor your team's performance.</p>
      </div>

      <ReportStats stats={stats} />

      <EmployeePerformanceTable employees={employees} />

      <RecentTasksTable tasks={recentTasks} />
    </div>
  );
};

export default TeamReports;
