import React from 'react';
import './ResearchSuggestions.css';
import { ResearchSuggestion } from '../../data/mockDashboardData';

interface ResearchSuggestionsProps {
  suggestions: ResearchSuggestion[];
}

const ResearchSuggestions: React.FC<ResearchSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="research-suggestions">
      <h2>Research Copilot Suggestions</h2>
      <div className="suggestions-list">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="suggestion-item">
            <div className="suggestion-icon">
              <i className="icon-suggestion"></i>
            </div>
            <div className="suggestion-content">
              <h3>{suggestion.title}</h3>
              <div className="suggestion-relevance">
                <div className="relevance-bar">
                  <div 
                    className="relevance-fill" 
                    style={{ width: `${suggestion.relevance}%` }}
                  ></div>
                </div>
                <span className="relevance-text">{suggestion.relevance}% relevant</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchSuggestions;
