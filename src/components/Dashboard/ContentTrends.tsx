import React from 'react';
import './ContentTrends.css';
import { TrendItem } from '../../data/mockDashboardData';

interface ContentTrendsProps {
  trends: TrendItem[];
}

const ContentTrends: React.FC<ContentTrendsProps> = ({ trends }) => {
  // Function to render the trend line visualization
  const renderTrendLine = (dataPoints: number[]) => {
    // Simple SVG line chart
    const height = 30;
    const width = 100;
    const maxValue = Math.max(...dataPoints);
    
    // Calculate points for the polyline
    const points = dataPoints.map((point, index) => {
      const x = (index / (dataPoints.length - 1)) * width;
      const y = height - (point / maxValue) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} className="trend-line">
        <polyline
          points={points}
          fill="none"
          stroke="#2196F3"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  return (
    <div className="content-trends">
      <h2>Content Trends</h2>
      <div className="trends-list">
        {trends.map(trend => (
          <div key={trend.id} className="trend-item">
            <div className="trend-info">
              <h3>{trend.title}</h3>
              <span className="trend-growth">+{trend.growth}%</span>
            </div>
            <div className="trend-visualization">
              {renderTrendLine(trend.dataPoints)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTrends;
