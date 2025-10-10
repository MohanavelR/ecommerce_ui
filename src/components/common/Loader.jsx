import React from 'react'

// This component provides a clean, modern loading spinner.
const Loader = ({ size = 'md', color = 'indigo' }) => {
  // Determine spinner dimensions and border thickness based on 'size' prop
  const sizeClasses = {
    sm: 'w-4 h-4 border-2', // Small, good for tight spaces/buttons
    md: 'w-5 h-5 border-2', // Medium (default), good for forms
    lg: 'w-8 h-8 border-4', // Large, good for fullscreen overlays
  }[size] || 'w-5 h-5 border-2';

  // Determine spinner colors based on 'color' prop
  const colorClasses = {
    indigo: 'border-indigo-500 border-t-transparent', // Primary color
    white: 'border-white border-t-transparent',       // For use on dark backgrounds/buttons
    gray: 'border-gray-500 border-t-transparent',     // Neutral color
  }[color] || 'border-indigo-500 border-t-transparent';


  return (
    // Outer container: minimal styling, uses flex to center the spinner
    <div className="flex items-center justify-center">
       <div 
         // Combine size, color, animation, and shape classes
         className={`${sizeClasses} ${colorClasses} animate-spin rounded-full`}
       >
       </div>
    </div>
  )
}

export default Loader