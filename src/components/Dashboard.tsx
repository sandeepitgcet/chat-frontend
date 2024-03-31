// Welcome.tsx
import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client"; // Import Socket type

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { useAppSelector } from "../hooks/reduxHook";
import { addMessage } from "../redux/chatReducer";
import { useDispatch } from "react-redux";

const Dashboard: React.FC = () => {
  const socket: Socket = io(import.meta.env.VITE_SERVER_BASE_URL); // Define socket and specify its type
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connection established", socket.id);
      socket.emit("welcome", userInfo.userName);
    });

    socket.on("receiveMessage", ({ message }) => {
      console.log("Received message", message);
      dispatch(addMessage({ userName: message.toUserName, message }));
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

export default Dashboard;
