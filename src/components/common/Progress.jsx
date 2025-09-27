import React from 'react'

const Progress = ({ width = 0 }) => {
  // Ensure width is clamped between 0 and 100 and converted to a number
  const progressWidth = Math.max(0, Math.min(100, Number(width)));
  const isComplete = progressWidth === 100;
  
  // Custom class for the progress fill
  const fillClass = isComplete
    ? 'bg-gradient-to-r from-green-400 to-green-600' // Green when complete
    : 'bg-gradient-to-r from-indigo-500 to-indigo-600'; // Indigo gradient during progress

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div 
        // Added flex justify-center to center the content horizontally
        className={`h-2.5 rounded-full shadow-md transition-all duration-500 ease-out flex items-center justify-center ${fillClass}`}
        style={{ width: `${progressWidth}%` }}
      >
        {/* Only show the text if the progress is greater than 0.
          Since the outer flex container of this div is set to justify-center, 
          the text will always be centered within the blue filled area.
        */}
        {progressWidth > 0 && (
          <span className="text-xs font-bold text-white leading-none px-2 whitespace-nowrap">
            {Math.round(progressWidth)}%
          </span>
        )}
      </div>
    </div>
  )
}

export default Progress