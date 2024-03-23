import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ContactList, UserInfo } from "../util/types";

const initialState: { userInfo: UserInfo; allUsers: ContactList[] } = {
  userInfo: {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    accessToken: "",
    refreshToken: "",
  },
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.firstName = action.payload.firstName;
      state.userInfo.lastName = action.payload.lastName;
      state.userInfo.userName = action.payload.userName;
      state.userInfo.accessToken = action.payload.accessToken;
      state.userInfo.refreshToken = action.payload.refreshToken;
    },
    setAllUsers: (state, action: PayloadAction<ContactList[]>) => {
      state.allUsers = action.payload;
    },
    logoutUser: (state) => {
      state.allUsers = initialState.allUsers;
      state.userInfo = initialState.userInfo;
    },
  },
});
export const { setUserInfo, setAllUsers, logoutUser } = userSlice.actions;
export default userSlice.reducer;
