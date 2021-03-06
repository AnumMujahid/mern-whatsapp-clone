import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState('');

  const createChat = () => {
    const roomName = prompt('Please enter new name for chat');
    if (roomName) {
      //handle database
      axios.post('/rooms/new', {
        name: roomName,
      });
    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 10000));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`/rooms/${id}`).then((response) => {
        setMessages(response.data.messages);
      });
    }
  }, [id, messages]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages && messages[messages?.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
