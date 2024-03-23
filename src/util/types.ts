import { Socket } from "socket.io-client";
import { SET_USER_INFO } from "./constants";

export interface UserInfo {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  payload: UserInfo;
}

export interface ContactList {
  firstName: string;
  lastName: string;
  userName: string;
}

export interface ChatMessage {
  id: string; // Unique message identifier
  senderUserName: string;
  toUserName: string;
  messageType: "text" | "image" | "video" | "audio";
  message?: string;
  media?: MediaMessage;
  timestamp: number; // Unix timestamp of when the message was sent
}

export interface MediaMessage {
  type: string; // Type of media (e.g., 'image', 'video', 'audio')
  link: string; // Link to the media content
  metaData?: MediaMetaData; // Metadata for the media content
}

export interface MediaMetaData {
  width?: number; // Width of the media (for images and videos)
  height?: number; // Height of the media (for images and videos)
  duration?: number; // Duration of the media (for videos and audio)
  format?: string; // Format of the media (e.g., JPEG, PNG, MP4)
  size?: number; // Size of the media in bytes
  // Add more properties as needed
}

export interface UserChatMessages {
  [userName: string]: ChatMessage[];
}

export interface ChatState {
  userChatMessages: UserChatMessages;
  currentChatUser: string | null;
}

export interface ChatProps {
  socket: Socket;
}
