import React, { useState } from "react";
import './MessageList.css'
import { socket } from "./App";
interface Message {
  username: string;
  content: string;
  index: number;
}

interface MessageListProps {
  messages: Message[];
}
  
const MessageList: React.FC<MessageListProps> = ({ messages}) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <strong>{message.username}: </strong>{message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
