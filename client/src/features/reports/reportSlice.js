import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTeamReportAPI } from "./reportAPI";

export const getTeamReport = createAsyncThunk(
  "reports/getTeamReport",
  async (_, thunkAPI) => {
    try {
      return await getTeamReportAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch reports",
      );
    }
  },
);

const reportSlice = createSlice({
  name: "reports",

  initialState: {
    stats: {},
    employees: [],
    recentTasks: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getTeamReport.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTeamReport.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.employees = action.payload.employees;
        state.recentTasks = action.payload.recentTasks;
      })

      .addCase(getTeamReport.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default reportSlice.reducer;
