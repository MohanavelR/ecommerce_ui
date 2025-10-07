import React from 'react';

const NotAvailable = () => {
  return (
    // Outer container: Full height, flexbox for centering, subtle gradient background
    <div className="flex flex-col   items-center justify-center p-8  text-gray-800">
      {/* Inner card: Slightly raised, rounded, with a subtle border */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 max-w-lg w-full text-center">
        
        {/* Icon: Illustrative icon with a soft, vibrant color */}
        <div className="mb-3">
            <span className="inline-block p-5 rounded-full bg-red-100 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
            </span>
        </div>
        
        {/* Heading: Clear, bold, and larger with emphasis */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Oops! Item <span className="text-red-600">Not Found</span>
        </h1>
        
        {/* Subtext: Friendly and informative */}
        <p className="text-lg text-gray-600 leading-relaxed">
            It looks like this item is currently unavailable, out of stock, or may have been removed. We apologize for the inconvenience.
        </p>

        {/* Removed the Call to Action button */}
        
      </div>
    </div>
  )
}

export default NotAvailable