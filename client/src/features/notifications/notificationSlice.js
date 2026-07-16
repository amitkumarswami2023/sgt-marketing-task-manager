import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getNotificationsAPI,
  markNotificationReadAPI,
  markAllNotificationsReadAPI,
  deleteNotificationAPI,
} from "./notificationAPI";

// =========================
// GET
// =========================

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (_, thunkAPI) => {
    try {
      return await getNotificationsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to load notifications",
      );
    }
  },
);

// =========================
// READ ONE
// =========================

export const markNotificationRead = createAsyncThunk(
  "notifications/read",
  async (id, thunkAPI) => {
    try {
      return await markNotificationReadAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// =========================
// READ ALL
// =========================

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/readAll",
  async (_, thunkAPI) => {
    try {
      return await markAllNotificationsReadAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// =========================
// DELETE
// =========================

export const deleteNotification = createAsyncThunk(
  "notifications/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteNotificationAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",

  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // GET
      // =========================

      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;

        state.notifications = action.payload.notifications;

        state.unreadCount = action.payload.unreadCount;
      })

      // =========================
      // READ ONE
      // =========================

      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n._id === action.payload.notification._id,
        );

        if (index !== -1) {
          state.notifications[index] = action.payload.notification;
        }

        state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
      })

      // =========================
      // READ ALL
      // =========================

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((n) => ({
          ...n,
          isRead: true,
        }));

        state.unreadCount = 0;
      })

      // =========================
      // DELETE
      // =========================

      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.notifications = state.notifications.filter(
          (n) => n._id !== action.meta.arg,
        );

        state.unreadCount = state.notifications.filter((n) => !n.isRead).length;
      });
  },
});

export default notificationSlice.reducer;
