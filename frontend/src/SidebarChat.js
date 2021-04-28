import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import React, { useState, useEffect } from 'react';

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState('');
  const createChat = () => {
    const roomName = prompt('Please enter new name for chat');
    if (roomName) {
      //handle database
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 10000));
  }, []);

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
