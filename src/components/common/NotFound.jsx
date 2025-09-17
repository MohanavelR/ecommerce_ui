import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
    <div className="text-center max-w-2xl">
        {/* <!-- 404 Number --> */}
        <div className="mb-8">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                404
            </h1>
        </div>
        
        {/* <!-- Error Icon --> */}
        <div className="flex justify-center mb-6">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
        
        {/* <!-- Error Message --> */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-8">
            Oops! The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
        </p>
        
        {/* <!-- Action Buttons --> */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
            <Link to="/shop" 
               className="border-2 hover:text-white hover:bg-blue-600 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200">
                Go to Homepage
            </Link>
        </div>
      
    </div>
</div>

  )
}

export default NotFound