import React from 'react';
import './DashboardHeader.css';
import { User } from '../../data/mockDashboardData';

interface DashboardHeaderProps {
  user: User;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-title">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-actions">
        <button className="new-connect-button">New Connect</button>
        <div className="user-profile">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <span className="user-name">{user.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
