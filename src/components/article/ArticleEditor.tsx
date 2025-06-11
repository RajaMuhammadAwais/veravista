import React, { useState } from 'react';
import { Image, Link, Bold, Italic, List, ListOrdered, Quote } from 'lucide-react';
import CopyrightDetection, { DetectionResult } from '../plagiarism/CopyrightDetection';

interface ArticleEditorProps {
  onPublish?: (article: ArticleData) => void;
}

interface ArticleData {
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  isOriginal: boolean;
  copyrightStatus: DetectionResult | null;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  onPublish = () => {}
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isOriginal, setIsOriginal] = useState(true);
  const [copyrightStatus, setCopyrightStatus] = useState<DetectionResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tagInput, setTagInput] = useState('');

  const availableCategories = [
    'Technology', 'Politics', 'Health', 'Science', 
    'Business', 'Entertainment', 'Sports', 'Education'
  ];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !categories.includes(value)) {
      setCategories([...categories, value]);
    }
    setSelectedCategory('');
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDetectionComplete = (result: DetectionResult) => {
    setCopyrightStatus(result);
  };

  const handlePublish = () => {
    const articleData: ArticleData = {
      title,
      content,
      categories,
      tags,
      isOriginal,
      copyrightStatus
    };
    
    onPublish(articleData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New Article</h1>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter article title..."
          className="w-full px-4 py-3 text-xl font-bold border-b border-gray-200 focus:outline-none focus:border-blue-500"
        />
      </div>
      
      {/* Rich Text Editor Toolbar */}
      <div className="flex items-center space-x-2 border border-gray-200 rounded-t-lg p-2 bg-gray-50">
        <button className="p-2 rounded hover:bg-gray-200">
          <Bold size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <Italic size={18} />
        </button>
        <div className="h-6 border-l border-gray-300 mx-1"></div>
        <button className="p-2 rounded hover:bg-gray-200">
          <List size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <ListOrdered size={18} />
        </button>
        <div className="h-6 border-l border-gray-300 mx-1"></div>
        <button className="p-2 rounded hover:bg-gray-200">
          <Link size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <Image size={18} />
        </button>
        <button className="p-2 rounded hover:bg-gray-200">
          <Quote size={18} />
        </button>
      </div>
      
      {/* Content Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your article here..."
        className="w-full h-64 p-4 border border-t-0 border-gray-200 rounded-b-lg focus:outline-none focus:border-blue-500 resize-none"
      ></textarea>
      
      {/* Copyright Detection */}
      <div className="mt-4 mb-6">
        <CopyrightDetection 
          content={content} 
          onDetectionComplete={handleDetectionComplete} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {categories.map(category => (
              <span key={category} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                {category}
                <button 
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category...</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                {tag}
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a tag..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      {/* Copyright Status */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isOriginal}
            onChange={(e) => setIsOriginal(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">I confirm this is original content or properly cited</span>
        </label>
      </div>
      
      {/* Publish Button */}
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          disabled={!title || !content || !isOriginal}
          className={`px-6 py-2 rounded-md ${
            !title || !content || !isOriginal
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Publish Article
        </button>
      </div>
    </div>
  );
};

export default ArticleEditor;
