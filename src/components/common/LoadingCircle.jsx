import React from 'react';

const LoadingCircle = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div 
        className="w-12 h-12 border-4 border-t-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingCircle;