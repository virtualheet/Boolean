'use client'

import fiverrCategories from '@/data/fields';
import React, { useState } from 'react';

const Fields = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    
    const handleMouseEnter = (category: string) => {
        setActiveCategory(category);
    };
    
    const handleMouseLeave = () => {
        setActiveCategory(null);
    };
    
    return (
        <div className="w-full relative bg-white dark:bg-black flex z-[999]" onMouseLeave={handleMouseLeave}>
            {/* Main category navigation */}
            <div className="flex items-center overflow-x-auto border-b border-gray-200 bg-white dark:bg-black scrollbar-none">
                {fiverrCategories.map((item) => (
                    <div
                        key={item.category}
                        className={`px-4 py-4 whitespace-nowrap text-base cursor-pointer transition-colors ${
                            activeCategory
                ? 'text-black font-medium' 
                : 'text-black/90 dark:text-white/90 hover:text-black'
            }`}
            onMouseEnter={() => handleMouseEnter(item.category)}
          >
            {item.category}
          </div>
        ))}
        <div className="ml-auto px-2">
          <button className="text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Dropdown menu */}
      {activeCategory && (
        <div className="absolute top-16 z-50 w-full border-b border-gray-200 bg-white shadow-lg">
          <div className="container mx-auto p-8">
            <div className="grid grid-cols-4 gap-8">
              {fiverrCategories
                .find(item => item.category === activeCategory)
                ?.subcategories.map((subcategory) => (
                  <div key={subcategory.name} className="mb-6">
                    <h3 className="text-gray-800 font-medium mb-4">{subcategory.name}</h3>
                    <ul className="space-y-3">
                      {subcategory.fields.map((field) => (
                        <li key={field} className="text-gray-600 hover:text-gray-900">
                          <a href="#" className="flex items-center">
                            {field}
                            {subcategory.newTags && subcategory.newTags.includes(field) && (
                              <span className="ml-2 text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full">
                                NEW
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {subcategory.hasSpecialLink && (
                      <div className="mt-4">
                        <a href="#" className="text-blue-500 flex items-center">
                          {subcategory.specialLinkName} 
                          <span className="ml-1">{subcategory.specialLinkIcon}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fields;