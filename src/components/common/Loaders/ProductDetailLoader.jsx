import React from 'react';

const ProductDetailLoader = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        
        {/* -------------------- LEFT COLUMN: IMAGE GALLERY SKELETON -------------------- */}
        <div className="space-y-4">
          {/* Main Image Placeholder (Aspect Square) */}
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full"></div>
          </div>
          
          {/* Thumbnail Gallery Placeholder */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200"></div>
            ))}
          </div>
        </div>

        {/* -------------------- RIGHT COLUMN: DETAILS SKELETON -------------------- */}
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div>
            <div className="flex items-start justify-between">
              {/* Title Placeholder */}
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div> {/* SKU Placeholder */}
              </div>
              {/* Badge Placeholder (Trending/Offer) */}
              <div className="h-6 bg-red-200 rounded-full w-20"></div>
            </div>
          </div>

          {/* Price Section Placeholder */}
          <div className="space-y-2 py-2">
            <div className="h-10 bg-gray-300 rounded w-2/5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          </div>

          {/* Stock/Status Placeholder */}
          <div className="h-4 bg-gray-200 rounded w-2/5"></div>

          {/* Category & Brand Placeholder */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Offer Banner Placeholder */}
          <div className="h-12 bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded"></div>

          {/* Variations Title Placeholder */}
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          
          {/* Variation Buttons Placeholder */}
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded-md w-16"></div>
            <div className="h-8 bg-gray-200 rounded-md w-16"></div>
            <div className="h-8 bg-gray-200 rounded-md w-16"></div>
          </div>
          
          {/* Action Buttons Placeholder */}
          <div className="flex space-x-4">
            <div className="flex-1 h-12 bg-blue-200 rounded-md"></div>
            <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
          </div>

          {/* Info Tabs Placeholder */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-8 mb-4">
              <div className="h-4 bg-blue-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoader;