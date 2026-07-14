import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboard } from "../../features/dashboard/dashboardSlice";

import PageHeader from "../../components/dashboard/PageHeader";
import ExecutiveSummary from "../../components/dashboard/ExecutiveSummary";
import KPICards from "../../components/dashboard/KPICards";
import TrafficOverview from "../../components/dashboard/TrafficOverview";
import LeadSources from "../../components/dashboard/LeadSources";
import ChannelPerformance from "../../components/dashboard/ChannelPerformance";
import LeadFunnel from "../../components/dashboard/LeadFunnel";
import TopCampaigns from "../../components/dashboard/TopCampaigns";
import RecentInsights from "../../components/dashboard/RecentInsights";
import TaskStatusChart from "../../components/dashboard/TaskStatusChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import RecentTasks from "../../components/dashboard/RecentTasks";
import RecentUsers from "../../components/dashboard/RecentUsers";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { stats, recentTasks, recentUsers, departmentStats, loading } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Executive Dashboard"
        subtitle="Marketing performance overview across all digital channels"
      />

      <ExecutiveSummary stats={stats} />

      <KPICards stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TaskStatusChart stats={stats} />
        <DepartmentChart data={departmentStats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentTasks tasks={recentTasks} />
        <RecentUsers users={recentUsers} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TrafficOverview />
        </div>

        <LeadSources />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChannelPerformance />
        <LeadFunnel />
      </div>

      <TopCampaigns recentTasks={recentTasks} />

      <RecentInsights recentUsers={recentUsers} />
    </div>
  );
};

export default Dashboard;
