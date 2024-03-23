// Welcome.tsx
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client"; // Import Socket type

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { UserInfo } from "../util/types";
import useLocalStorage from "../hooks/localStorage";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/userReducer";
const userInfoInit: UserInfo = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};
const Welcome: React.FC = () => {
  const socket: Socket = io(import.meta.env.VITE_SERVER_BASE_URL); // Define socket and specify its type
  const [userInfo] = useLocalStorage<UserInfo>("userInfo", userInfoInit);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Welcome UseEffect !");
    dispatch(setUserInfo(userInfo));
    socket.on("connect", () => {
      console.log("Connection established", socket.id);
      socket.emit("welcome", userInfo.userName);
    });
    socket.on("disconnect", () => {
      console.log("Connection disconnected", socket.id);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-w-[480px] h-screen overflow-hidden">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row justify-between flex-1">
        <div className="w-1/4 min-w-60 bg-red-800 h-full overflow-y-auto">
          <SideBar />
        </div>
        <div className="w-3/4 min-w-80 bg-yellow-400 h-full overflow-y-auto">
          {/* Pass the socket instance as a prop */}
          <Chat socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
