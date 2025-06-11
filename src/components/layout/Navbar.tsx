import React from 'react';
import { Bell, Search, User, PenSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">InsightShare</h1>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                placeholder="Search articles, topics, or users..."
              />
            </div>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            
            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
              <PenSquare className="h-5 w-5" />
              <span>Create</span>
            </button>
            
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <PenSquare className="h-6 w-6 text-gray-600" />
            </button>
            
            <button className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </button>
          </div>
        </div>
        
        {/* Secondary Navigation */}
        <nav className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide">
          <a href="#" className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600">
            Home
          </a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Articles
          </a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Trending
          </a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Following
          </a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Bookmarks
          </a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
            Premium
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
