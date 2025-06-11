import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { DashboardProvider } from '../../contexts/DashboardContext';

// Mock the child components to isolate testing
jest.mock('./DashboardHeader', () => () => <div data-testid="dashboard-header">Header Mock</div>);
jest.mock('./Sidebar', () => () => <div data-testid="sidebar">Sidebar Mock</div>);
jest.mock('./RecentProjects', () => () => <div data-testid="recent-projects">Projects Mock</div>);
jest.mock('./VerificationActivity', () => () => <div data-testid="verification-activity">Verification Mock</div>);
jest.mock('./ContentTrends', () => () => <div data-testid="content-trends">Trends Mock</div>);
jest.mock('./KnowledgeGraphUpdates', () => () => <div data-testid="knowledge-graph">Knowledge Graph Mock</div>);
jest.mock('./ResearchSuggestions', () => () => <div data-testid="research-suggestions">Suggestions Mock</div>);

describe('Dashboard Component', () => {
  test('renders all dashboard sections', () => {
    render(
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    );
    
    // Check that all major components are rendered
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('recent-projects')).toBeInTheDocument();
    expect(screen.getByTestId('verification-activity')).toBeInTheDocument();
    expect(screen.getByTestId('content-trends')).toBeInTheDocument();
    expect(screen.getByTestId('knowledge-graph')).toBeInTheDocument();
    expect(screen.getByTestId('research-suggestions')).toBeInTheDocument();
  });
});
