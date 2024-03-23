import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { ChatMessage, ChatProps } from "../util/types";
import { addMessage } from "../redux/chatReducer";
import { v4 as uuidv4 } from "uuid";

const Chat: React.FC<ChatProps> = ({ socket }) => {
  const toUserName = useAppSelector((state) => state.chat.currentChatUser);
  const chatMessages = useAppSelector((state) => state.chat.userChatMessages);
  const [messageData, setMessageData] = useState("");
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  console.log(chatMessages);
  if (!toUserName) {
    return (
      <div>
        <h1>Select a user to chat with</h1>
      </div>
    );
  }

  socket.on("receiveMessage", ({ message }) => {
    console.log("Received message", message);
    // const message: ChatMessage = {
    //   id: uuidv4(),
    //   senderUserName: userInfo.userName,
    //   toUserName: toUserName,
    //   messageType: "text",
    //   message: messageData,
    //   timestamp: Date.now(), // Unix timestamp of when the message was sent
    // };
    dispatch(addMessage({ userName: toUserName, message }));
  });

  const sendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const message: ChatMessage = {
      id: uuidv4(),
      senderUserName: userInfo.userName,
      toUserName: toUserName,
      messageType: "text",
      message: messageData,
      timestamp: Date.now(),
    };
    dispatch(addMessage({ userName: toUserName, message }));
    socket.emit("sendMessage", {
      userName: toUserName,
      message,
    });
    setMessageData("");
  };

  return (
    <div className="min-w-80 h-full overflow-y-auto flex flex-col">
      <div className="bg-green-400">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <span className="text-white text-lg font-semibold">
              {toUserName}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-green-600 flex-1 overflow-y-auto">
        <div className="p-4">
          {chatMessages[toUserName]?.map((chat: ChatMessage) => (
            <div key={chat.id}>
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-gray-100 text-sm">{chat.toUserName}</div>
                  <div className="text-gray-100 text-sm">{chat.message}</div>
                </div>
                <div className="text-gray-100 text-sm">{chat.timestamp}</div>
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
