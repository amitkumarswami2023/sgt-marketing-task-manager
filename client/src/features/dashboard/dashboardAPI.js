import api from "../../api/axios";

// ================= ADMIN =================

export const getAdminDashboardAPI = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};

// ================= TEAM LEAD =================

export const getTeamLeadDashboardAPI = async () => {
  const response = await api.get("/dashboard/teamlead");
  return response.data;
};

// ================= EMPLOYEE =================

export const getEmployeeDashboardAPI = async () => {
  const response = await api.get("/dashboard/employee");
  return response.data;
};
