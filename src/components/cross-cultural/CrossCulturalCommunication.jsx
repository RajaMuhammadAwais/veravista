import React, { useState, useEffect } from 'react';
import { useCultural, CULTURAL_CONTEXTS } from '../../contexts/CulturalContext';
import TranslationService from '../../services/TranslationService';

/**
 * CrossCulturalCommunication component - Facilitates communication between users of different languages
 * with cultural context preservation and real-time translation
 */
const CrossCulturalCommunication = ({ currentUser, recipient, onSend }) => {
  const { language: userLanguage, culturalSettings } = useCultural();
  const [message, setMessage] = useState('');
  const [translatedPreview, setTranslatedPreview] = useState('');
  const [culturalNotes, setCulturalNotes] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showCulturalContext, setShowCulturalContext] = useState(false);
  
  // Get recipient's language
  const recipientLanguage = recipient?.language || CULTURAL_CONTEXTS.ENGLISH;
  
  // Generate translation preview as user types
  useEffect(() => {
    const previewTimeout = setTimeout(async () => {
      if (message.trim() && userLanguage !== recipientLanguage) {
        setIsTranslating(true);
        try {
          const result = await TranslationService.translateWithContext(
            message,
            userLanguage,
            recipientLanguage,
            { userContext: currentUser.culturalPreferences }
          );
          
          setTranslatedPreview(result.translatedText);
          setCulturalNotes(result.culturalNotes);
        } catch (error) {
          console.error('Translation preview error:', error);
        } finally {
          setIsTranslating(false);
        }
      }
    }, 500); // Debounce translation requests
    
    return () => clearTimeout(previewTimeout);
  }, [message, userLanguage, recipientLanguage]);
  
  // Handle message submission
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      // If languages differ, use the translation
      let finalMessage = message;
      let translation = null;
      
      if (userLanguage !== recipientLanguage) {
        const result = await TranslationService.translateWithContext(
          message,
          userLanguage,
          recipientLanguage,
          { userContext: currentUser.culturalPreferences }
        );
        
        translation = {
          text: result.translatedText,
          culturalNotes: result.culturalNotes,
          confidenceScore: result.confidenceScore
        };
      }
      
      // Send message with translation if available
      onSend({
        text: finalMessage,
        translation,
        timestamp: new Date(),
        sender: currentUser.id,
        recipient: recipient.id
      });
      
      // Clear input
      setMessage('');
      setTranslatedPreview('');
      setCulturalNotes([]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error (show notification, etc.)
    }
  };
  
  // Request alternative translation
  const requestAlternativeTranslation = async () => {
    try {
      const alternatives = await TranslationService.getAlternativeTranslations(
        message,
        userLanguage,
        recipientLanguage
      );
      
      // In a real app, show these alternatives in a UI component
      console.log('Alternative translations:', alternatives);
      
      // For demo purposes, use the first alternative
      if (alternatives.length > 0) {
        setTranslatedPreview(alternatives[0].text);
      }
    } catch (error) {
      console.error('Error getting alternative translations:', error);
    }
  };
  
  return (
    <div className="cross-cultural-communication">
      <div className="message-composer">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          rows={4}
        />
        
        {userLanguage !== recipientLanguage && (
          <div className="translation-preview">
            <h4>Translation Preview:</h4>
            {isTranslating ? (
              <p>Translating...</p>
            ) : (
              <>
                <p>{translatedPreview}</p>
                <button onClick={requestAlternativeTranslation}>
                  Request alternative translation
                </button>
              </>
            )}
          </div>
        )}
        
        {culturalNotes.length > 0 && (
          <div className="cultural-notes">
            <button 
              onClick={() => setShowCulturalContext(!showCulturalContext)}
            >
              {showCulturalContext ? 'Hide' : 'Show'} cultural context
            </button>
            
            {showCulturalContext && (
              <div className="notes-content">
                <h4>Cultural Context Notes:</h4>
                <ul>
                  {culturalNotes.map((note, index) => (
                    <li key={index}>
                      <strong>{note.original}:</strong> {note.explanation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="message-actions">
          <button onClick={handleSendMessage} disabled={!message.trim()}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrossCulturalCommunication;
