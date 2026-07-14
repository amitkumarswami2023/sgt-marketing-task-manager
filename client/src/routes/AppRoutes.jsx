import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import Analytics from "../pages/analytics/Analytics";
import GoogleAds from "../pages/googleAds/GoogleAds";
import MetaAds from "../pages/metaAds/MetaAds";
import SearchConsole from "../pages/searchConsole/SearchConsole";
import CRM from "../pages/crm/CRM";
import Social from "../pages/social/Social";
import Reports from "../pages/reports/Reports";
import { Settings } from "lucide-react";
import Users from "../pages/users/Users";
import Tasks from "../pages/tasks/Tasks";
import TeamLeadLayout from "../components/layout/TeamLeadLayout";
import EmployeeLayout from "../components/layout/EmployeeLayout";

import TeamLeadDashboard from "../pages/teamlead/Dashboard";
import TeamTasks from "../pages/teamlead/TeamTasks";
import TeamMembers from "../pages/teamlead/TeamMembers";
import TeamReports from "../pages/teamlead/Reports";
import Profile from "../pages/common/Profile";

import EmployeeDashboard from "../pages/employee/Dashboard";
import MyTasks from "../pages/employee/MyTasks";
import EmployeeCalendar from "../pages/employee/Calendar";
import EmployeeProfile from "../pages/employee/Profile";
import RoleProtectedRoute from "./RoleProtectedRoute";
import TaskManagement from "../pages/tasks/TaskManagement";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <RoleProtectedRoute roles={["admin"]}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="google-ads" element={<GoogleAds />} />
          <Route path="meta-ads" element={<MetaAds />} />
          <Route path="search-console" element={<SearchConsole />} />
          <Route path="crm" element={<CRM />} />
          <Route path="social" element={<Social />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/teamlead"
          element={
            <RoleProtectedRoute roles={["team-lead"]}>
              <TeamLeadLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<TeamLeadDashboard />} />

          <Route path="tasks" element={<TaskManagement />} />

          <Route path="members" element={<TeamMembers />} />

          <Route path="reports" element={<TeamReports />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/employee"
          element={
            <RoleProtectedRoute roles={["employee"]}>
              <EmployeeLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />

          <Route path="tasks" element={<TaskManagement />} />

          <Route path="calendar" element={<EmployeeCalendar />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
