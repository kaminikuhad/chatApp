import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import UserInput from "./UserInput";
import './App.css'
export const socket = socketIOClient("http://localhost:4000");

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ username: string; content: string, index:number }>>([]);

  useEffect(() => {
    // Listen for new messages from the backend
    socket.on("newMessage", (message: { username: string; content: string,index:number }) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Fetch the initial message history from the backend
    socket.emit("getMessages");
    socket.on("initialMessages", (messageHistory: Array<{ username: string; content: string , index:number}>) => {
      setMessages(messageHistory);
    });

    socket.on("deleteMessage", (messageId: number) => {
      setMessages((prevMessages) => prevMessages.filter((_, idx) => idx !== messageId));
    });

    return () => {
      socket.off("newMessage");
      socket.off("initialMessages");
      socket.off("deleteMessage")
    };
  }, []);

  const handleSendMessage = (content: string) => {
    const message = { username, content};
    socket.emit("sendMessage", message);
  };

  return (
    //<div className="card col-lg-6">
    <div className="chatbox">
    <div className="chatbox-header">
        <h3>Chat</h3>
    </div>
      <UserInput setUsername={setUsername} />
      <MessageList messages={messages} />
      {username && <MessageInput onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default App;
