import api from "../../api/axios";

// =======================
// Get Tasks
// =======================
export const getTasksAPI = async () => {
  const { data } = await api.get("/tasks/department");
  return data;
};

// =======================
// Create Task
// =======================
export const createTaskAPI = async (task) => {
  const { data } = await api.post("/tasks", task);
  return data;
};

// =======================
// Update Task
// =======================
export const updateTaskAPI = async (id, task) => {
  const { data } = await api.put(`/tasks/${id}`, task);
  return data;
};

// =======================
// Delete Task
// =======================
export const deleteTaskAPI = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

// =======================
// Update Status
// =======================
export const updateTaskStatusAPI = async (id, statusData) => {
  const { data } = await api.patch(`/tasks/${id}/status`, statusData);
  return data;
};

// =======================
// Add Deliverable
// =======================
export const addDeliverableAPI = async (id, deliverable) => {
  const { data } = await api.post(`/tasks/${id}/deliverables`, deliverable);

  return data;
};
