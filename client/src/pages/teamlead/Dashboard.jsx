import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../../components/dashboard/PageHeader";
import TeamLeadKPICards from "../../components/teamlead/TeamLeadKPICards";

import { getTeamLeadDashboard } from "../../features/dashboard/dashboardSlice";
import TeamTaskTable from "../../components/teamlead/TeamTaskTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { stats, recentTasks, loading } = useSelector(
    (state) => state.dashboard,
  );

  console.log("Team Lead Tasks:", recentTasks);

  useEffect(() => {
    dispatch(getTeamLeadDashboard());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Team Lead Dashboard"
        subtitle="Monitor your team performance and assigned work."
      />

      <TeamLeadKPICards stats={stats} />
      <TeamTaskTable tasks={recentTasks} />
    </div>
  );
};

export default Dashboard;
