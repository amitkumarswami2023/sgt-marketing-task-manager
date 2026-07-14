import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
  updateTaskStatusAPI,
} from "./taskAPI";

// ================= CREATE TASK =================

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      const response = await createTaskAPI(taskData);
      return response;
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
      const response = await getTasksAPI();
      return response;
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
      const response = await updateTaskAPI(id, taskData);
      return response;
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
      const response = await deleteTaskAPI(id);
      return response;
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
      const response = await updateTaskStatusAPI(id, {
        status,
        progress,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Status update failed",
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

      // GET TASKS

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })

      // CREATE TASK

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload.task);
      })

      // UPDATE TASK

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload.task._id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })

      // DELETE TASK

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.meta.arg,
        );
      })

      // STATUS UPDATE

      .addCase(updateTaskStatus.fulfilled, (state, action) => {
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
