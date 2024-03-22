import { useState } from "react";
import { Socket } from "socket.io-client";
import useLocalStorage from "../hooks/useLocalStorage";

interface Chat {
  userName: string;
  message: string;
  time: string;
}

interface ChatProps {
  socket: Socket;
}
interface LoginInfoInterface {
  email?: string;
  userName: string;
  accessToken?: string;
  refreshToken?: string;
}
const Chat: React.FC<ChatProps> = ({ socket }) => {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [messageData, setMessageData] = useState("");
  const [userInfo] = useLocalStorage<LoginInfoInterface>("userInfo", {
    userName: "User",
  });

  socket.on("receiveMessage", ({ message, userName, time }) => {
    console.log("Received message");
    setChatData([...chatData, { userName, message, time }]);
  });

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMessageData("");
    setChatData((prevState) => [
      ...prevState,
      {
        userName: userInfo.userName,
        message: messageData,
        time: new Date().toLocaleString(),
      },
    ]);
    socket.emit("sendMessage", {
      userName: userInfo.userName,
      message: messageData,
      time: new Date().toLocaleString(),
    });
  };

  return (
    <div className="min-w-80 h-full overflow-y-auto flex flex-col">
      <div className="bg-green-400">Chat Info</div>
      <div className="bg-green-600 flex-1 overflow-y-auto">
        <div className="p-4">
          {chatData.map((data: Chat, index: number) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-gray-100 text-sm">{data.userName}</div>
                  <div className="text-gray-100 text-sm">{data.message}</div>
                </div>
                <div className="text-gray-100 text-sm">{data.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-green-800">
        <input
          type="text"
          name="message"
          placeholder="Enter Message"
          className="w-3/4"
          value={messageData}
          onChange={(e) => setMessageData(e.target.value)}
        />
        <button
          type="button"
          className="p-2 hover:bg-green-900"
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
