import React, { createContext, useContext, ReactNode } from 'react';
import mockDashboardData from '../data/mockDashboardData';

// Define the context type
type DashboardContextType = typeof mockDashboardData;

// Create the context with default value
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real application, we would fetch this data from an API
  // For now, we're using mock data
  const dashboardData = mockDashboardData;

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
