import api from "../../api/axios";

export const getTeamReportAPI = async () => {
  const { data } = await api.get("/reports/team");
  return data;
};
