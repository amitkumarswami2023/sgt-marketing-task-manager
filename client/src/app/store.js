import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import taskReducer from "../features/tasks/taskSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import reportReducer from "../features/reports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    tasks: taskReducer,
    dashboard: dashboardReducer,
    reports: reportReducer,
  },
});
