import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface CopyrightDetectionProps {
  content: string;
  onDetectionComplete?: (result: DetectionResult) => void;
}

export interface DetectionResult {
  hasPotentialIssues: boolean;
  matchedContent: MatchedContent[];
  originalityScore: number;
}

interface MatchedContent {
  text: string;
  source: string;
  similarity: number;
}

const CopyrightDetection: React.FC<CopyrightDetectionProps> = ({
  content,
  onDetectionComplete = () => {}
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Simulate plagiarism detection
  const checkForPlagiarism = () => {
    setIsChecking(true);
    
    // This would be replaced with an actual API call to a plagiarism detection service
    setTimeout(() => {
      // Simulate detection result
      const detectionResult: DetectionResult = {
        hasPotentialIssues: content.length > 100, // Just for demo purposes
        matchedContent: content.length > 100 ? [
          {
            text: content.substring(0, 100) + '...',
            source: 'example.com/article',
            similarity: 85
          }
        ] : [],
        originalityScore: content.length > 100 ? 65 : 98
      };
      
      setResult(detectionResult);
      setIsChecking(false);
      
      if (detectionResult.hasPotentialIssues) {
        setShowModal(true);
      }
      
      onDetectionComplete(detectionResult);
    }, 2000);
  };

  const handleResolve = (action: 'cite' | 'rewrite' | 'remove' | 'fair_use') => {
    // In a real implementation, this would handle the selected action
    console.log(`Resolving with action: ${action}`);
    setShowModal(false);
  };

  return (
    <div className="copyright-detection">
      <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            !result ? 'bg-gray-300' : 
            result.originalityScore > 90 ? 'bg-green-500' : 
            result.originalityScore > 70 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
          <span className="text-sm font-medium">
            {!result ? 'Content not checked' : 
             result.originalityScore > 90 ? 'Original content' : 
             result.originalityScore > 70 ? 'Potential minor issues' : 'Significant copyright concerns'}
          </span>
        </div>
        
        <button
          onClick={checkForPlagiarism}
          disabled={isChecking || !content}
          className={`px-3 py-1 text-sm rounded-md ${
            isChecking ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isChecking ? 'Checking...' : result ? 'Check Again' : 'Check Copyright'}
        </button>
      </div>
      
      {result && result.originalityScore < 100 && (
        <div className="mt-2 text-sm text-gray-600">
          Originality score: <span className="font-medium">{result.originalityScore}%</span>
        </div>
      )}
      
      {/* Copyright Alert Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center text-red-600 mb-4">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">Potential Copyright Issue Detected</h3>
            </div>
            
            <p className="mb-4">We've detected content that may be copied from other sources:</p>
            
            <div className="bg-gray-50 p-3 rounded border mb-4">
              <p className="italic text-gray-700">{result.matchedContent[0].text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Possible source: <a href="#" className="text-blue-600 hover:underline">{result.matchedContent[0].source}</a>
              </p>
            </div>
            
            <p className="mb-4 font-medium">Options:</p>
            
            <div className="space-y-2 mb-6">
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                <span>Add proper citation</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                <span>Rewrite this section</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                <span>Remove this section</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolution" className="mr-2" />
                <span>This is fair use or my original content</span>
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleResolve('cite')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Resolve and Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyrightDetection;
