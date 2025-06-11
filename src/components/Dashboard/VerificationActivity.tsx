import React from 'react';
import './VerificationActivity.css';
import { VerificationItem } from '../../data/mockDashboardData';

interface VerificationActivityProps {
  items: VerificationItem[];
}

const VerificationActivity: React.FC<VerificationActivityProps> = ({ items }) => {
  return (
    <div className="verification-activity">
      <h2>Verification Activity</h2>
      <div className="verification-list">
        {items.map(item => (
          <div key={item.id} className="verification-item">
            <div className="verification-icon">
              {item.status === 'verified' && <i className="icon-verified"></i>}
              {item.status === 'pending' && <i className="icon-pending"></i>}
              {item.status === 'failed' && <i className="icon-failed"></i>}
            </div>
            <div className="verification-content">
              <h3>{item.title}</h3>
              <div className="verification-meta">
                <span className="verification-time">{item.timestamp}</span>
                {item.confidence && (
                  <span className="verification-confidence">{item.confidence}% confidence</span>
                )}
              </div>
            </div>
            <div className="verification-status">
              <span className={`status-badge ${item.status}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationActivity;
