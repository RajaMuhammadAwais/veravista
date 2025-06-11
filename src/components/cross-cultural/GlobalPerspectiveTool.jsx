import React, { useState, useEffect } from 'react';
import { useCultural, CULTURAL_CONTEXTS } from '../../contexts/CulturalContext';
import CulturalBridgeService from '../../services/CulturalBridgeService';

/**
 * GlobalPerspectiveTool component - Presents multiple cultural viewpoints on topics
 * and facilitates cross-cultural understanding through diverse perspectives
 */
const GlobalPerspectiveTool = ({ topic, currentUserLanguage }) => {
  const { culturalSettings } = useCultural();
  const [perspectives, setPerspectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [viewMode, setViewMode] = useState('summary'); // 'summary' or 'detailed'
  
  // Languages to include in perspectives (all supported languages)
  const languages = Object.values(CULTURAL_CONTEXTS);
  
  // Fetch perspectives on component mount
  useEffect(() => {
    const fetchPerspectives = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call a backend API
        // Here we're simulating the response
        
        // Generate perspectives for each language
        const fetchedPerspectives = languages.map(language => ({
          language,
          isNative: language === currentUserLanguage,
          summary: generatePerspectiveSummary(topic, language),
          details: generatePerspectiveDetails(topic, language),
          culturalContext: generateCulturalContext(topic, language),
          sources: generateSources(language)
        }));
        
        setPerspectives(fetchedPerspectives);
        
        // Set the current user's language perspective as selected by default
        const userPerspective = fetchedPerspectives.find(p => p.language === currentUserLanguage);
        setSelectedPerspective(userPerspective || fetchedPerspectives[0]);
      } catch (error) {
        console.error('Error fetching perspectives:', error);
        // Handle error (show notification, etc.)
      } finally {
        setLoading(false);
      }
    };
    
    fetchPerspectives();
  }, [topic, currentUserLanguage]);
  
  // Handle perspective selection
  const handleSelectPerspective = (perspective) => {
    setSelectedPerspective(perspective);
  };
  
  // Toggle view mode between summary and detailed
  const toggleViewMode = () => {
    setViewMode(viewMode === 'summary' ? 'detailed' : 'summary');
  };
  
  // Get cultural context notes for the selected perspective
  const getCulturalContextNotes = async () => {
    if (!selectedPerspective) return;
    
    try {
      const notes = await CulturalBridgeService.getCulturalContextNotes(
        currentUserLanguage,
        selectedPerspective.language,
        topic
      );
      
      // In a real app, display these notes in a modal or panel
      console.log('Cultural context notes:', notes);
      
      // For demo purposes, alert the first note
      if (notes.length > 0) {
        alert(`Cultural Context: ${notes[0].note}`);
      }
    } catch (error) {
      console.error('Error getting cultural context notes:', error);
    }
  };
  
  // Render loading state
  if (loading) {
    return <div className="loading">Loading perspectives...</div>;
  }
  
  return (
    <div className="global-perspective-tool">
      <h2>Global Perspectives on: {topic}</h2>
      
      <div className="perspective-selector">
        {perspectives.map((perspective) => (
          <button
            key={perspective.language}
            className={`perspective-button ${perspective.language} ${
              selectedPerspective?.language === perspective.language ? 'active' : ''
            }`}
            onClick={() => handleSelectPerspective(perspective)}
          >
            {getLanguageDisplayName(perspective.language)}
            {perspective.isNative && ' (Your Culture)'}
          </button>
        ))}
      </div>
      
      {selectedPerspective && (
        <div className="perspective-content">
          <div className="perspective-header">
            <h3>{getLanguageDisplayName(selectedPerspective.language)} Perspective</h3>
            <div className="view-controls">
              <button onClick={toggleViewMode}>
                Show {viewMode === 'summary' ? 'Detailed' : 'Summary'} View
              </button>
              <button onClick={getCulturalContextNotes}>
                Cultural Context Notes
              </button>
            </div>
          </div>
          
          <div className="perspective-body">
            {viewMode === 'summary' ? (
              <div className="perspective-summary">
                <p>{selectedPerspective.summary}</p>
              </div>
            ) : (
              <div className="perspective-details">
                {selectedPerspective.details.map((detail, index) => (
                  <div key={index} className="detail-point">
                    <h4>{detail.title}</h4>
                    <p>{detail.content}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="cultural-context">
              <h4>Cultural Context</h4>
              <p>{selectedPerspective.culturalContext}</p>
            </div>
            
            <div className="sources">
              <h4>Sources</h4>
              <ul>
                {selectedPerspective.sources.map((source, index) => (
                  <li key={index}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title}
                    </a>
                    {source.isNativeLanguage && ' (in native language)'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for generating mock data
function getLanguageDisplayName(language) {
  switch (language) {
    case CULTURAL_CONTEXTS.ENGLISH:
      return 'English';
    case CULTURAL_CONTEXTS.URDU:
      return 'Urdu';
    case CULTURAL_CONTEXTS.CHINESE:
      return 'Chinese';
    default:
      return language;
  }
}

function generatePerspectiveSummary(topic, language) {
  // In a real app, this would come from a database or API
  switch (language) {
    case CULTURAL_CONTEXTS.ENGLISH:
      return `From a Western perspective, ${topic} is often viewed through the lens of individual rights and freedoms. There's an emphasis on innovation, personal expression, and challenging traditional boundaries.`;
    case CULTURAL_CONTEXTS.URDU:
      return `In South Asian cultural contexts, ${topic} is typically understood within community and family frameworks. Traditional values, collective wisdom, and intergenerational perspectives play important roles.`;
    case CULTURAL_CONTEXTS.CHINESE:
      return `Chinese perspectives on ${topic} often balance traditional values with modernization. Harmony, practical utility, and collective benefit are key considerations in how this topic is approached.`;
    default:
      return `Perspectives on ${topic} vary across cultures.`;
  }
}

function generatePerspectiveDetails(topic, language) {
  // In a real app, this would come from a database or API
  switch (language) {
    case CULTURAL_CONTEXTS.ENGLISH:
      return [
        {
          title: 'Individual Focus',
          content: `Western approaches to ${topic} often emphasize personal choice and individual expression.`
        },
        {
          title: 'Innovation Emphasis',
          content: `There's typically a focus on new ideas and challenging conventions around ${topic}.`
        },
        {
          title: 'Diverse Viewpoints',
          content: `Western discourse encourages debate and multiple perspectives on ${topic}.`
        }
      ];
    case CULTURAL_CONTEXTS.URDU:
      return [
        {
          title: 'Community Context',
          content: `In South Asian cultures, ${topic} is often considered within family and community frameworks.`
        },
        {
          title: 'Traditional Values',
          content: `Religious and cultural traditions significantly influence perspectives on ${topic}.`
        },
        {
          title: 'Intergenerational Wisdom',
          content: `Elders' perspectives on ${topic} are highly valued and often guide younger generations.`
        }
      ];
    case CULTURAL_CONTEXTS.CHINESE:
      return [
        {
          title: 'Practical Approach',
          content: `Chinese perspectives on ${topic} often emphasize practical utility and real-world application.`
        },
        {
          title: 'Harmony and Balance',
          content: `Maintaining social harmony while addressing ${topic} is an important consideration.`
        },
        {
          title: 'Modernization with Tradition',
          content: `Contemporary approaches to ${topic} often blend innovation with respect for traditional values.`
        }
      ];
    default:
      return [
        {
          title: 'Cultural Variation',
          content: `Perspectives on ${topic} vary significantly across different cultural contexts.`
        }
      ];
  }
}

function generateCulturalContext(topic, language) {
  // In a real app, this would come from a database or API
  switch (language) {
    case CULTURAL_CONTEXTS.ENGLISH:
      return `Western perspectives on ${topic} have been shaped by historical emphasis on individualism, scientific rationalism, and democratic values. These views continue to evolve with increasing cultural diversity and global exchange.`;
    case CULTURAL_CONTEXTS.URDU:
      return `South Asian perspectives on ${topic} are influenced by rich cultural traditions, strong family structures, and religious values. Colonial history and post-colonial identity also shape how this topic is understood and discussed.`;
    case CULTURAL_CONTEXTS.CHINESE:
      return `Chinese perspectives on ${topic} reflect thousands of years of cultural continuity balanced with rapid modernization. Confucian values, pragmatic approaches to social harmony, and collective progress influence these viewpoints.`;
    default:
      return `Cultural context significantly shapes how ${topic} is understood and approached.`;
  }
}

function generateSources(language) {
  // In a real app, these would be actual sources
  switch (language) {
    case CULTURAL_CONTEXTS.ENGLISH:
      return [
        {
          title: 'Western Perspectives Journal',
          url: 'https://example.com/western-perspectives',
          isNativeLanguage: true
        },
        {
          title: 'Global Cultural Studies',
          url: 'https://example.com/global-cultural-studies',
          isNativeLanguage: true
        }
      ];
    case CULTURAL_CONTEXTS.URDU:
      return [
        {
          title: 'South Asian Cultural Review',
          url: 'https://example.com/south-asian-review',
          isNativeLanguage: true
        },
        {
          title: 'Traditional and Modern Perspectives',
          url: 'https://example.com/traditional-modern',
          isNativeLanguage: true
        }
      ];
    case CULTURAL_CONTEXTS.CHINESE:
      return [
        {
          title: 'Chinese Cultural Studies Journal',
          url: 'https://example.com/chinese-cultural-studies',
          isNativeLanguage: true
        },
        {
          title: 'East-West Comparative Analysis',
          url: 'https://example.com/east-west-analysis',
          isNativeLanguage: false
        }
      ];
    default:
      return [
        {
          title: 'Global Cultural Perspectives',
          url: 'https://example.com/global-perspectives',
          isNativeLanguage: false
        }
      ];
  }
}

export default GlobalPerspectiveTool;
