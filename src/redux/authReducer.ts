import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState } from "../util/types";

const initialState: AuthInitialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
