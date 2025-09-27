import React from 'react'
import Loader from './Loader'; // Assuming you have the enhanced Loader component available

const PageLoader = () => {
  return (
    // Fixed container to cover the entire viewport, set z-index high, and use a light, blurred backdrop
    <div className='fixed inset-0 z-[5000] flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300'>
       
        {/* Main Spinner (Large and Indigo) */}
        <div className='w-20 h-20 border-8 animate-spin border-t-indigo-600 border-gray-200 rounded-full shadow-lg'>
        </div>
        
        {/* Optional: Add a subtle loading message */}
        <p className="absolute mt-28 text-lg font-semibold text-gray-700 animate-pulse">
            Loading...
        </p>
    </div>
  )
}

export default PageLoader