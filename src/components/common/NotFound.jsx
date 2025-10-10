import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex items-center justify-center px-6">
      <div className="text-center  bg-white p-10 sm:p-12 rounded-2xl">
        
        {/* 404 Title */}
        <div className="mb-6">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 leading-none tracking-tighter sm:text-[10rem]">
            404
          </h1>
        </div>
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-red-50 border border-red-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.39 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        {/* Headline */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Oops! Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 px-4">
          The page you’re looking for doesn’t exist or may have been moved.  
          Let’s get you back on track!
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Primary: Return Home */}
          <Link 
            to="/" 
            className="bg-gradient-to-r from-blue-500 to-primary text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <i className="fas fa-arrow-left mr-2"></i> Return Home
          </Link>
          <Link 
            to="/contact" 
            className="border border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition duration-200"
          >
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
