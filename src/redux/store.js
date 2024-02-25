import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/aurth/authSlice";
// import { api } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  
});
