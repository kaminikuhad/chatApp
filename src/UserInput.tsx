import React, { useState } from "react";
import './UserInput.css'

interface UserInputProps {
  setUsername: (username: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ setUsername }) => {
  const [username, setLocalUsername] = useState<string>("");

  const handleSetUsername = () => {
    if (username.trim()) {
      setUsername(username);
    }
  };

  return (
    <div >
      <span className="heading">Please Enter your name to start the conversation</span>
      <div className="chatbox-footer">
      <input
        type="text"
        value={username}
        onChange={(e) => setLocalUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleSetUsername}>Send</button>
      </div>
    </div>
  );
};

export default UserInput;
