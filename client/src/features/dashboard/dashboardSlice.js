import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminDashboardAPI,
  getTeamLeadDashboardAPI,
  getEmployeeDashboardAPI,
} from "./dashboardAPI";

// ================= ADMIN =================

export const getAdminDashboard = createAsyncThunk(
  "dashboard/admin",
  async (_, thunkAPI) => {
    try {
      return await getAdminDashboardAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load Admin Dashboard",
      );
    }
  },
);

// ================= TEAM LEAD =================

export const getTeamLeadDashboard = createAsyncThunk(
  "dashboard/teamlead",
  async (_, thunkAPI) => {
    try {
      return await getTeamLeadDashboardAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load Team Lead Dashboard",
      );
    }
  },
);

// ================= EMPLOYEE =================

export const getEmployeeDashboard = createAsyncThunk(
  "dashboard/employee",
  async (_, thunkAPI) => {
    try {
      return await getEmployeeDashboardAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load Employee Dashboard",
      );
    }
  },
);

const initialState = {
  stats: {},
  recentTasks: [],
  recentUsers: [],
  teamMembers: [],
  departmentStats: [],
  loading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ================= ADMIN =================

    builder
      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats;
        state.recentTasks = action.payload.recentTasks;
        state.recentUsers = action.payload.recentUsers;
        state.departmentStats = action.payload.departmentStats;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= TEAM LEAD =================

    builder
      .addCase(getTeamLeadDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamLeadDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.stats = action.payload.stats || {};

        state.recentTasks = action.payload.recentTasks || [];

        state.teamMembers = action.payload.teamMembers || [];
      })
      .addCase(getTeamLeadDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= EMPLOYEE =================

    builder
      .addCase(getEmployeeDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentTasks = action.payload.recentTasks;
      })
      .addCase(getEmployeeDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
