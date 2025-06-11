import React from 'react';
import './KnowledgeGraphUpdates.css';
import { KnowledgeGraphUpdate } from '../../data/mockDashboardData';

interface KnowledgeGraphUpdatesProps {
  updates: KnowledgeGraphUpdate[];
}

const KnowledgeGraphUpdates: React.FC<KnowledgeGraphUpdatesProps> = ({ updates }) => {
  return (
    <div className="knowledge-graph-updates">
      <h2>Knowledge Graph Updates</h2>
      <div className="updates-list">
        {updates.map(update => (
          <div key={update.id} className="update-item">
            <div className="update-connection">
              <span className="connection-node">{update.source}</span>
              <span className="connection-type">{update.relationship}</span>
              <span className="connection-node">{update.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGraphUpdates;
