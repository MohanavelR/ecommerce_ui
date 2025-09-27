import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    // Dark background for a sleek, modern feel
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl bg-gray-800 p-10 sm:p-12 rounded-xl shadow-2xl border-t border-cyan-500/50">
        
        {/* */}
        <div className="mb-6">
            {/* High-contrast, massive 404 number */}
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500 leading-none tracking-tighter sm:text-[10rem]">
                404
            </h1>
        </div>
        
        {/* */}
        <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-red-800/20 border border-red-500/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/* Exclamation icon for clear error state */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.39 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
        </div>
        
        {/* */}
        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mb-8 px-4">
            It looks like you've wandered into the digital void. The page you requested doesn't exist.
        </p>
        
        {/* */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
            {/* Primary Action: Teal/Cyan button for maximum visibility */}
            <Link to="/" 
               className="bg-cyan-500 text-gray-900 py-3 px-8 rounded-lg font-bold shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition duration-200 ease-in-out transform hover:-translate-y-0.5">
                <i className="fas fa-arrow-left mr-2"></i> Return Home
            </Link>

            {/* Secondary Action: Transparent gray button */}
            <Link to="/contact" 
               className="border border-gray-600 text-gray-300 py-3 px-8 rounded-lg font-medium shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition duration-200 ease-in-out">
                Report Issue
            </Link>
        </div>
      
      </div>
    </div>
  )
}

export default NotFound