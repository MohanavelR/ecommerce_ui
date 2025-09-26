import React from 'react'

const NotAvailable = () => {
  return (
   
    <div class="flex flex-col h-96 justify-center items-center">
        {/* <!-- Main Icon --> */}
        <div class="mb-8 animate-pulse-slow">
            <i class="fas fa-times-circle text-3xl text-red-400"></i>
        </div>
        
        {/* <!-- Main Text --> */}
        <h1 class="text-6xl md:text-2xl font-bold text-gray-800 mb-4">
            Not <span class="gradient-text">Available</span>
        </h1>
        
        {/* <!-- Subtitle --> */}
        <p class="text-xl md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            This item is currently unavailable or does not exist
        </p>
        
      
        </div>
       
  )
}

export default NotAvailable