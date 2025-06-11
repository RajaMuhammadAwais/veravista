import React, { useState, useEffect } from 'react';
import { CulturalProvider, useCultural, CULTURAL_CONTEXTS } from './contexts/CulturalContext.jsx';
import Navbar from './components/layout/Navbar';
import ArticleCard from './components/article/ArticleCard';
import ArticleEditor from './components/article/ArticleEditor';
import TrendingArticles from './components/article/TrendingArticles';
import CopyrightDetection from './components/plagiarism/CopyrightDetection';
import CrossCulturalCommunication from './components/cross-cultural/CrossCulturalCommunication.jsx';
import GlobalPerspectiveTool from './components/cross-cultural/GlobalPerspectiveTool.jsx';

// Sample user data
const currentUser = {
  id: 'user-1',
  name: 'Sample User',
  language: CULTURAL_CONTEXTS.ENGLISH,
  culturalPreferences: {}
};

// Sample recipient for cross-cultural communication
const sampleRecipient = {
  id: 'user-2',
  name: 'Sample Recipient',
  language: CULTURAL_CONTEXTS.CHINESE
};

const AppContent = () => {
  const { language, culturalSettings, isLoading, changeLanguage } = useCultural();
  const [activeTab, setActiveTab] = useState('feed');
  const [articles, setArticles] = useState([]);
  const [showEditor, setShowEditor] = useState(false);

  // Load sample articles
  useEffect(() => {
    // In a real app, this would fetch from an API
    const sampleArticles = [
      {
        id: 1,
        title: 'Understanding Cultural Differences in Social Media',
        content: 'Social media usage varies significantly across cultures...',
        author: 'Alex Johnson',
        date: '2025-05-20',
        likes: 245,
        comments: 37,
        shares: 18,
        verified: true
      },
      {
        id: 2,
        title: 'The Future of Multilingual Platforms',
        content: 'As global connectivity increases, platforms must adapt...',
        author: 'Maria Garcia',
        date: '2025-05-19',
        likes: 189,
        comments: 24,
        shares: 12,
        verified: true
      },
      {
        id: 3,
        title: 'Psychological Engagement Across Cultures',
        content: 'Different cultures respond to digital engagement in unique ways...',
        author: 'Wei Zhang',
        date: '2025-05-18',
        likes: 312,
        comments: 41,
        shares: 29,
        verified: false
      }
    ];
    
    setArticles(sampleArticles);
  }, []);

  // Handle article submission
  const handleArticleSubmit = (article) => {
    setArticles([
      {
        id: articles.length + 1,
        ...article,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        shares: 0,
        verified: false
      },
      ...articles
    ]);
    setShowEditor(false);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  // Loading state
  if (isLoading) {
    return <div className="loading">Loading VeraVista...</div>;
  }

  return (
    <div className={`app-container ${language}`}>
      <Navbar onLanguageChange={handleLanguageChange} currentLanguage={language} />
      
      <div className="language-selector">
        <button 
          className={language === CULTURAL_CONTEXTS.ENGLISH ? 'active' : ''} 
          onClick={() => handleLanguageChange(CULTURAL_CONTEXTS.ENGLISH)}
        >
          English
        </button>
        <button 
          className={language === CULTURAL_CONTEXTS.URDU ? 'active' : ''} 
          onClick={() => handleLanguageChange(CULTURAL_CONTEXTS.URDU)}
        >
          Urdu
        </button>
        <button 
          className={language === CULTURAL_CONTEXTS.CHINESE ? 'active' : ''} 
          onClick={() => handleLanguageChange(CULTURAL_CONTEXTS.CHINESE)}
        >
          Chinese
        </button>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'feed' ? 'active' : ''} 
          onClick={() => setActiveTab('feed')}
        >
          Article Feed
        </button>
        <button 
          className={activeTab === 'trending' ? 'active' : ''} 
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </button>
        <button 
          className={activeTab === 'cross-cultural' ? 'active' : ''} 
          onClick={() => setActiveTab('cross-cultural')}
        >
          Cross-Cultural
        </button>
        <button 
          className={activeTab === 'perspectives' ? 'active' : ''} 
          onClick={() => setActiveTab('perspectives')}
        >
          Global Perspectives
        </button>
      </div>
      
      <main className="content">
        {activeTab === 'feed' && (
          <div className="feed">
            <button 
              className="new-article-button" 
              onClick={() => setShowEditor(true)}
            >
              Create New Article
            </button>
            
            {showEditor && (
              <div className="editor-container">
                <ArticleEditor 
                  onSubmit={handleArticleSubmit} 
                  onCancel={() => setShowEditor(false)} 
                />
              </div>
            )}
            
            <div className="articles-list">
              {articles.map(article => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'trending' && (
          <TrendingArticles />
        )}
        
        {activeTab === 'cross-cultural' && (
          <div className="cross-cultural-container">
            <h2>Cross-Cultural Communication</h2>
            <CrossCulturalCommunication 
              currentUser={currentUser}
              recipient={sampleRecipient}
              onSend={(message) => console.log('Message sent:', message)}
            />
          </div>
        )}
        
        {activeTab === 'perspectives' && (
          <GlobalPerspectiveTool 
            topic="Digital Privacy and Data Protection"
            currentUserLanguage={language}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>VeraVista - A Multilingual Social Platform for Authentic Content © 2025</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <CulturalProvider>
      <AppContent />
    </CulturalProvider>
  );
}

export default App;
