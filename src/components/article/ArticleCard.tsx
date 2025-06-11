import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    image?: string;
    author: {
      name: string;
      avatar?: string;
    };
    publishedAt: string;
    readTime: number;
    likes: number;
    comments: number;
    saved: boolean;
  };
  onArticleClick?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article,
  onArticleClick = () => {}
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        {/* Author info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
              {article.author.avatar ? (
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="h-full w-full object-cover" 
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold">
                  {article.author.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{article.author.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                <span className="mx-1">•</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        {/* Article content */}
        <div onClick={() => onArticleClick(article.id)} className="cursor-pointer">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.excerpt}</p>
          
          {article.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover" 
              />
            </div>
          )}
        </div>
        
        {/* Engagement actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <Heart size={18} className={article.saved ? "fill-red-500 text-red-500" : ""} />
              <span>{article.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <MessageCircle size={18} />
              <span>{article.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
              <Share2 size={18} />
            </button>
          </div>
          <button className="text-gray-500 hover:text-blue-600">
            <Bookmark size={18} className={article.saved ? "fill-blue-600 text-blue-600" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
