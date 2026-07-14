import api from "../../api/axios";

// Get Users
export const getUsersAPI = async () => {
  const { data } = await api.get("/users");
  return data;
};

// Create User
export const createUserAPI = async (userData) => {
  const { data } = await api.post("/users", userData);
  return data;
};

export const updateUserAPI = async (id, userData) => {
  const { data } = await api.put(`/users/${id}`, userData);
  return data;
};

export const deleteUserAPI = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
