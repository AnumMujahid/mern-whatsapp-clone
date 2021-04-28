import React, { useState} from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    const [room, setRoom] = useState([]);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://avatars.githubusercontent.com/u/75484624?v=4" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
