import api from "../../api/axios";

export const getTasksAPI = async () => {
  const { data } = await api.get("/tasks/department");
  return data;
};

export const createTaskAPI = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

export const updateTaskAPI = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

export const deleteTaskAPI = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

export const updateTaskStatusAPI = async (id, data) => {
  const response = await api.patch(`/tasks/${id}/status`, data);

  return response.data;
};
