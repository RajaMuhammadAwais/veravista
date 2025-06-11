import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';
import ArticleCard from './ArticleCard';

interface TrendingArticlesProps {
  onArticleClick?: (id: string) => void;
}

// Mock data for trending articles
const mockTrendingArticles = [
  {
    id: '1',
    title: 'The Future of AI in Content Creation',
    excerpt: 'How artificial intelligence is revolutionizing the way we create and consume content online.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=500',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    publishedAt: '2025-05-21T14:30:00Z',
    readTime: 5,
    likes: 243,
    comments: 42,
    saved: false
  },
  {
    id: '2',
    title: 'Copyright Protection in the Digital Age',
    excerpt: 'Understanding how to protect your intellectual property in an era of easy content sharing.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=500',
    author: {
      name: 'Samantha Lee',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    publishedAt: '2025-05-20T09:15:00Z',
    readTime: 7,
    likes: 189,
    comments: 31,
    saved: true
  },
  {
    id: '3',
    title: 'How to Write Engaging Content That Readers Love',
    excerpt: 'Tips and strategies for creating content that captures attention and keeps readers coming back.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500',
    author: {
      name: 'Marcus Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    publishedAt: '2025-05-19T16:45:00Z',
    readTime: 6,
    likes: 156,
    comments: 28,
    saved: false
  }
];

const TrendingArticles: React.FC<TrendingArticlesProps> = ({
  onArticleClick = () => {}
}) => {
  const [trendingArticles, setTrendingArticles] = useState(mockTrendingArticles);
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');
  
  // Simulate fetching trending articles based on timeframe
  useEffect(() => {
    // In a real app, this would be an API call
    console.log(`Fetching trending articles for timeframe: ${timeframe}`);
    // For demo purposes, we'll just use the mock data
  }, [timeframe]);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-red-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Trending Now</h2>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <button 
              onClick={() => setTimeframe('today')}
              className={`px-3 py-1 rounded-full ${
                timeframe === 'today' 
                  ? 'bg-gray-200 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Today
            </button>
            <button 
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 rounded-full ${
                timeframe === 'week' 
                  ? 'bg-gray-200 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Week
            </button>
            <button 
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 rounded-full ${
                timeframe === 'month' 
                  ? 'bg-gray-200 text-gray-800 font-medium' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Month
            </button>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {trendingArticles.map((article, index) => (
          <div key={article.id} className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-500 font-bold text-lg mr-3">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 
                  className="text-base font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                  onClick={() => onArticleClick(article.id)}
                >
                  {article.title}
                </h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{article.author.name}</span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime} min read
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {article.likes} likes
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Trending
        </button>
      </div>
    </div>
  );
};

export default TrendingArticles;
