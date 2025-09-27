import React from 'react'

const NotAvailable = () => {
  return (
    // Ensure the container fills the parent and is centered vertically and horizontally
    <div className="flex flex-col h-full min-h-[400px] justify-center items-center p-8 bg-gray-50 border border-gray-100 rounded-xl shadow-lg">
        {/* */}
        {/* Using a larger icon for impact, with a softer red tone */}
        <div className="mb-6">
            <i className="fas fa-times-circle text-7xl text-red-500 opacity-80 animate-pulse-slow"></i>
        </div>
        
        {/* */}
        {/* Using a clear, consistent heading size */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
            Item <span className="text-red-600">Unavailable</span>
        </h1>
        
        {/* */}
        <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-sm text-center">
            This item is currently out of stock, has been removed, or does not exist.
        </p>

        {/* Optional: Add a button to navigate back or refresh */}
        
    </div>
  )
}

export default NotAvailable