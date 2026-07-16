import api from "../../api/axios";

// =========================
// Get Notifications
// =========================

export const getNotificationsAPI = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

// =========================
// Mark Read
// =========================

export const markNotificationReadAPI = async (id) => {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data;
};

// =========================
// Mark All Read
// =========================

export const markAllNotificationsReadAPI = async () => {
  const { data } = await api.patch("/notifications/read-all");
  return data;
};

// =========================
// Delete Notification
// =========================

export const deleteNotificationAPI = async (id) => {
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
};
