import React, { useState } from "react";
import './MessageInput.css'
interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear message input
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageInput">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default MessageInput;
