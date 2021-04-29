import { Avatar, IconButton } from '@material-ui/core';
import Pusher from 'pusher-js';
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import axios from './axios';
import { useStateValue } from './StateProvider';

const Chat = () => {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState('');
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      axios.get(`/rooms/${roomId}`).then((response) => {
        setRoom(response.data);
        setMessages(response.data.messages);
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 10000));
  }, [roomId]);

  useEffect(() => {
    const pusher = new Pusher('338b6a41b2c2a68d42df', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(`/rooms/${roomId}/messages/new`, {
      message: input,
      name: user.displayName,
    });
    setInput('');
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{room?.name}</h3>
          <p>Last seen at {messages[messages.length - 1]?.timestamp}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message._id}
            className={`chat__message ${
              message.name === user.displayName && 'chat__receiver'
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
