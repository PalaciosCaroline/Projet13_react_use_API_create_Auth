import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./../feature/user.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
