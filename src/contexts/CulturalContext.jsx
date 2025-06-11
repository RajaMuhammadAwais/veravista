import React, { createContext, useState, useEffect, useContext } from 'react';

// Cultural preference constants
export const CULTURAL_CONTEXTS = {
  ENGLISH: 'english',
  URDU: 'urdu',
  CHINESE: 'chinese'
};

// Default cultural settings by language
const DEFAULT_CULTURAL_SETTINGS = {
  [CULTURAL_CONTEXTS.ENGLISH]: {
    layoutDensity: 'spacious',
    interactionStyle: 'direct',
    contentPriority: 'individual',
    colorScheme: 'modern',
    navigationStyle: 'exploration'
  },
  [CULTURAL_CONTEXTS.URDU]: {
    layoutDensity: 'moderate',
    interactionStyle: 'respectful',
    contentPriority: 'community',
    colorScheme: 'traditional',
    navigationStyle: 'relationship'
  },
  [CULTURAL_CONTEXTS.CHINESE]: {
    layoutDensity: 'dense',
    interactionStyle: 'indirect',
    contentPriority: 'collective',
    colorScheme: 'balanced',
    navigationStyle: 'efficient'
  }
};

// Create the context
const CulturalContext = createContext();

// Provider component
export const CulturalProvider = ({ children }) => {
  // State for current language and cultural settings
  const [language, setLanguage] = useState(null);
  const [culturalSettings, setCulturalSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Detect user's language on initial load
  useEffect(() => {
    const detectLanguage = () => {
      // Get browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      
      // Map to supported languages or default to English
      let detectedLang;
      switch (browserLang) {
        case 'ur':
          detectedLang = CULTURAL_CONTEXTS.URDU;
          break;
        case 'zh':
          detectedLang = CULTURAL_CONTEXTS.CHINESE;
          break;
        default:
          detectedLang = CULTURAL_CONTEXTS.ENGLISH;
      }
      
      // Check if user has a saved preference
      const savedLang = localStorage.getItem('veravista-language');
      const finalLang = savedLang || detectedLang;
      
      setLanguage(finalLang);
      setCulturalSettings(DEFAULT_CULTURAL_SETTINGS[finalLang]);
      setIsLoading(false);
    };
    
    detectLanguage();
  }, []);

  // Function to change language and update cultural settings
  const changeLanguage = (newLanguage) => {
    if (Object.values(CULTURAL_CONTEXTS).includes(newLanguage)) {
      setLanguage(newLanguage);
      setCulturalSettings(DEFAULT_CULTURAL_SETTINGS[newLanguage]);
      localStorage.setItem('veravista-language', newLanguage);
    }
  };

  // Function to update specific cultural settings
  const updateCulturalSetting = (setting, value) => {
    setCulturalSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Function to take cultural preference quiz and fine-tune settings
  const takeCulturalPreferenceQuiz = (quizResults) => {
    // Process quiz results and update settings accordingly
    const updatedSettings = { ...culturalSettings };
    
    // Example processing logic
    if (quizResults.prefersDenseInformation) {
      updatedSettings.layoutDensity = 'dense';
    }
    
    if (quizResults.prefersIndirectCommunication) {
      updatedSettings.interactionStyle = 'indirect';
    }
    
    setCulturalSettings(updatedSettings);
  };

  // Context value
  const contextValue = {
    language,
    culturalSettings,
    isLoading,
    changeLanguage,
    updateCulturalSetting,
    takeCulturalPreferenceQuiz
  };

  return (
    <CulturalContext.Provider value={contextValue}>
      {children}
    </CulturalContext.Provider>
  );
};

// Custom hook to use the cultural context
export const useCultural = () => {
  const context = useContext(CulturalContext);
  if (!context) {
    throw new Error('useCultural must be used within a CulturalProvider');
  }
  return context;
};

export default CulturalContext;
