import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="VeraVista" />
        <h2>VeraVista</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <i className="icon-dashboard"></i>
            <span>Dashboard</span>
          </li>
          <li>
            <i className="icon-graph"></i>
            <span>Knowledge Graph</span>
          </li>
          <li>
            <i className="icon-projects"></i>
            <span>Projects</span>
          </li>
          <li>
            <i className="icon-verify"></i>
            <span>Verify</span>
          </li>
          <li>
            <i className="icon-connect"></i>
            <span>Connect</span>
          </li>
          <li>
            <i className="icon-settings"></i>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-user">
        <div className="user-avatar">
          <img src="/avatars/alex.jpg" alt="User" />
        </div>
        <div className="user-info">
          <span className="user-name">Alex</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
