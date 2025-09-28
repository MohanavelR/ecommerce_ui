import React from 'react';

const ShopPageLayoutLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        
        {/* -------------------- 1. HEADER LOADER (Top Bar) -------------------- */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="h-6 bg-blue-300 rounded w-24"></div>
            {/* Nav Links */}
            <div className="hidden md:flex space-x-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            {/* Icons */}
            <div className="flex space-x-4">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* -------------------- 2. MAIN CONTENT AREA -------------------- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
          {/* 3. SLIDER/BANNER LOADER */}
          <div className="h-80 w-full bg-gray-300 rounded-lg">
            {/* Central Text Overlay Placeholder */}
            <div className="w-1/3 h-10 bg-white opacity-50 rounded mx-auto mt-32"></div>
          </div>
          
          {/* 4. PRODUCTS / LIST LOADER */}
          <div className="space-y-4">
            {/* Section Title Placeholder */}
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            
            {/* Product Card Grid (Horizontal Scroll - x-axis) */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {/* Product Card Skeletons */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex-shrink-0 w-64 bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                  {/* Image */}
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-3 space-y-2">
                    {/* Title */}
                    <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                    {/* Price */}
                    <div className="h-5 bg-blue-400 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Another Section (e.g., Categories or another Product Row) */}
          <div className="h-64 w-full bg-gray-200 rounded-lg">
            {/* Section Content Placeholder */}
          </div>
          
        </div>
        
        {/* -------------------- 5. FOOTER LOADER (Bottom Bar) -------------------- */}
        <div className="bg-gray-800 text-white mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
              {/* Footer Column Placeholders */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                </div>
              ))}
            </div>
            {/* Copyright/Bottom Info */}
            <div className="mt-4 h-3 bg-gray-600 rounded w-40 mx-auto md:mx-0"></div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ShopPageLayoutLoader;