import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentTrends from './ContentTrends';
import { TrendItem } from '../../data/mockDashboardData';

describe('ContentTrends Component', () => {
  const mockTrends: TrendItem[] = [
    {
      id: 't1',
      title: 'Green Technologies',
      growth: 32,
      dataPoints: [10, 12, 15, 18, 24, 30, 32]
    },
    {
      id: 't2',
      title: 'Smart Cities',
      growth: 28,
      dataPoints: [8, 10, 12, 15, 18, 22, 28]
    }
  ];

  test('renders trends section with correct title', () => {
    render(<ContentTrends trends={mockTrends} />);
    expect(screen.getByText('Content Trends')).toBeInTheDocument();
  });

  test('renders all trend items', () => {
    render(<ContentTrends trends={mockTrends} />);
    expect(screen.getByText('Green Technologies')).toBeInTheDocument();
    expect(screen.getByText('Smart Cities')).toBeInTheDocument();
    expect(screen.getByText('+32%')).toBeInTheDocument();
    expect(screen.getByText('+28%')).toBeInTheDocument();
  });

  test('renders correct number of trend items', () => {
    render(<ContentTrends trends={mockTrends} />);
    const trendItems = screen.getAllByRole('heading', { level: 3 });
    expect(trendItems).toHaveLength(2);
  });
});
