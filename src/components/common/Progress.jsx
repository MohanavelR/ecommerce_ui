import React from 'react'

const Progress = ({ width = 0 }) => {
  // Ensure width is clamped between 0 and 100 and converted to a number
  const progressWidth = Math.max(0, Math.min(100, Number(width)));
  
  // The completion state is TRUE only at exactly 100
  const isComplete = progressWidth === 100;
  
  // Base color classes
  const baseFillClass = isComplete
    // Stronger green gradient and shadow for 100% completion
    ? 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/50' 
    // Professional blue/indigo gradient for in-progress
    : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md shadow-indigo-500/50';

  // Text color class (Label is outside the bar)
  const textColorClass = isComplete ? 'text-emerald-600' : 'text-indigo-600';

  return (
    <div className="w-full">
      {/* 1. Label/Indicator ABOVE the bar */}
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-gray-600">Progress</span>
        <span className={`text-sm font-bold ${textColorClass} transition-colors duration-500`}>
          {progressWidth}%
        </span>
      </div>

      {/* 2. Progress Bar Container: Slimmer, rounded, and clean background */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
        <div 
          // Fill Div: Uses the new color and shadow classes
          className={`h-3 rounded-full transition-all duration-700 ease-out ${baseFillClass}`}
          style={{ width: `${progressWidth}%` }}
        >
          {/* Subtle glow/highlight effect (purely visual) */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-white/20 blur-sm rounded-r-full"></div>
        </div>
      </div>
      
    </div>
  )
}

export default Progress