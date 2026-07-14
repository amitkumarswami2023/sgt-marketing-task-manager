import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersAPI,
  createUserAPI,
  deleteUserAPI,
  updateUserAPI,
} from "./userAPI";

// GET USERS
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, thunkAPI) => {
    try {
      return await getUsersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// CREATE USER
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      await createUserAPI(userData);

      thunkAPI.dispatch(getUsers());

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      await updateUserAPI(id, userData);

      thunkAPI.dispatch(getUsers());

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await deleteUserAPI(id);

      thunkAPI.dispatch(getUsers());

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

const initialState = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })

      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
