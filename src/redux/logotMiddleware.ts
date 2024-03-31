import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "./authReducer";
import { clearAllData } from "./userReducer";
import { clearAllChats } from "./chatReducer";

export const logoutAndClearData = createAsyncThunk(
  "auth/logoutAndClearData",
  async (_, { dispatch }) => {
    try {
      dispatch(logout());
      dispatch(clearAllData());
      dispatch(clearAllChats());
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
);
