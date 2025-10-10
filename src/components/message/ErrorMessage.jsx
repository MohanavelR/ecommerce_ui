import React from 'react'

const ErrorMessage = ({closeMessage,text}) => {
  return (

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-md p-4 flex items-center shadow-lg"> 
            <div className="flex-shrink-0">
                {/* Icons are white for high contrast */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div className="ml-3 flex-1">
                {/* Text is white */}
                <p className="text-sm font-medium text-white">
                    <span className="font-bold">Error!</span> {text}
                </p>
            </div>
            <div className="ml-auto pl-3">
                <button 
                    onClick={closeMessage} 
                    className="inline-flex text-white opacity-75 hover:opacity-100 focus:outline-none"
                    aria-label="Close error message"
                >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    
  )
}

export default ErrorMessage