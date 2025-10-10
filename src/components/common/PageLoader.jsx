import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[5000] flex flex-col items-center justify-center  transition-opacity duration-500">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl">
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 border-4 animate-spin border-t-indigo-600 border-b-indigo-400 border-gray-100 rounded-full"></div>
          <div className="absolute inset-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        <p className="text-base font-medium text-gray-700 animate-pulse-slow">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
