import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

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
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
