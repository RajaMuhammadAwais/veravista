import React from 'react';
import { DashboardProvider } from './contexts/DashboardContext';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
