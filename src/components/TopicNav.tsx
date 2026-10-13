import React from 'react';
import { TopicCategory } from '../types';

interface TopicNavProps {
  categories: TopicCategory[];
  activeCategory: TopicCategory;
  onSelectCategory: (category: TopicCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'latest' | 'claps' | 'short';
  onSortChange: (sort: 'latest' | 'claps' | 'short') => void;
}

export const TopicNav: React.FC<TopicNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="border-b border-stone-200 bg-white sticky top-18 z-30 pt-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        {/* Horizontal Topic Category Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`pb-3 text-sm font-medium whitespace-nowrap shrink-0 transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-stone-900 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 shrink-0 pb-2 sm:pb-0">
          {/* Search Input */}
          <div className="relative">
            <svg
              className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stories..."
              className="pl-9 pr-8 py-1.5 text-xs bg-stone-100 hover:bg-stone-100/80 focus:bg-white text-stone-900 placeholder:text-stone-400 rounded-full border border-transparent focus:border-stone-300 focus:outline-hidden transition-all w-36 sm:w-48"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center text-xs text-stone-500 font-medium">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-stone-700 py-1 pl-1 pr-6 border-none focus:outline-hidden cursor-pointer rounded text-xs font-sans"
            >
              <option value="latest">Latest</option>
              <option value="claps">Most Clapped</option>
              <option value="short">Quick Reads</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
