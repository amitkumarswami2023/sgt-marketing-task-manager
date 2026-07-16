import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  updateTaskStatusAPI,
  addDeliverableAPI,
} from "./taskAPI";

// ================= CREATE TASK =================

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      return await createTaskAPI(taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Create task failed",
      );
    }
  },
);

// ================= GET TASKS =================

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      return await getTasksAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch tasks",
      );
    }
  },
);

// ================= UPDATE TASK =================

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, thunkAPI) => {
    try {
      return await updateTaskAPI(id, taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Update failed",
      );
    }
  },
);

// ================= DELETE TASK =================

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      return await deleteTaskAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Delete failed",
      );
    }
  },
);

// ================= UPDATE STATUS =================

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status, progress }, thunkAPI) => {
    try {
      return await updateTaskStatusAPI(id, {
        status,
        progress,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Status update failed",
      );
    }
  },
);

// ================= ADD DELIVERABLE =================

export const addDeliverable = createAsyncThunk(
  "tasks/addDeliverable",
  async ({ id, deliverable }, thunkAPI) => {
    try {
      return await addDeliverableAPI(id, deliverable);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to add deliverable",
      );
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",

  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= GET =================

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })

      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload.task);
      })

      // ================= UPDATE =================

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })

      // ================= DELETE =================

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.meta.arg,
        );
      })

      // ================= STATUS =================

      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })

      // ================= DELIVERABLE =================

      .addCase(addDeliverable.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      });
  },
});

export default taskSlice.reducer;
