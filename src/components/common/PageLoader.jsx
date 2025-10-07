import React from 'react';
// import Loader from './Loader'; // Assuming this component is not needed for the new design

const PageLoader = () => {
  return (
    // Fixed container: Darker, opaque background for focus, high z-index
    <div className='fixed inset-0 z-[5000] flex flex-col items-center justify-center  transition-opacity duration-500'>
       
        {/* Loader Container: Centered box for visual grouping */}
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-2xl">
            
            {/* Dynamic Spinner Ring (Medium size, primary color) */}
            <div className='relative w-20 h-20 mb-4'>
                
                {/* Outer Ring: The main spinning element */}
                <div className='absolute inset-0 border-4 animate-spin border-t-indigo-600 border-b-indigo-400 border-gray-100 rounded-full'>
                </div>

                {/* Optional: Central Logo/Icon (replace with your actual logo/SVG) */}
                <div className="absolute inset-2 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                </div>
            </div>
            
            {/* Subtly Animated Message */}
            <p className="text-base font-medium text-gray-700 animate-pulse-slow">
                Processing Data...
            </p>
            
            {/* Optional: Progress bar appearance (purely aesthetic in this version) */}
            {/* <div className="mt-4 w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-indigo-500 rounded-full animate-indeterminate"></div>
            </div> */}
        </div>
        
    </div>
  )
}

export default PageLoader