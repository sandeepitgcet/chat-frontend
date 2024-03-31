import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage, ChatState } from "../util/types";

const initialState: ChatState = {
  userChatMessages: {},
  currentChatUser: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ userName: string; message: ChatMessage }>
    ) => {
      const { userName, message } = action.payload;
      if (!state.userChatMessages[userName]) {
        state.userChatMessages[userName] = [];
      }
      state.userChatMessages[userName].push(message);
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      const userName = action.payload;
      delete state.userChatMessages[userName];
    },
    setCurrentChatUser: (state, action: PayloadAction<string | null>) => {
      state.currentChatUser = action.payload;
    },
    clearAllChats: (state) => {
      state.userChatMessages = {};
      state.currentChatUser = null;
    },
  },
});
export const { addMessage, clearMessages, setCurrentChatUser, clearAllChats } =
  chatSlice.actions;
export default chatSlice.reducer;
