import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import './Dashboard.css';

// Import dashboard components
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import RecentProjects from './RecentProjects';
import VerificationActivity from './VerificationActivity';
import ContentTrends from './ContentTrends';
import KnowledgeGraphUpdates from './KnowledgeGraphUpdates';
import ResearchSuggestions from './ResearchSuggestions';

const Dashboard: React.FC = () => {
  const dashboardData = useDashboard();
  
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-main">
        <DashboardHeader user={dashboardData.user} />
        
        <div className="dashboard-content">
          <div className="dashboard-column">
            <RecentProjects projects={dashboardData.projects} />
            <VerificationActivity items={dashboardData.verificationActivity} />
            <ResearchSuggestions suggestions={dashboardData.researchSuggestions} />
          </div>
          
          <div className="dashboard-column">
            <ContentTrends trends={dashboardData.trends} />
            <KnowledgeGraphUpdates updates={dashboardData.knowledgeGraphUpdates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
