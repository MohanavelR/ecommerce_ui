import React from 'react'

const StarRating = ({ rating, handleRatingChange }) => {

  return (
    <div className="flex items-center space-x-0.5"> {/* Use flex and space-x for clean star arrangement */}
      {
        [1, 2, 3, 4, 5].map((starValue) => (
          <button 
            key={starValue} // Added key for list stability
            onClick={() => handleRatingChange(starValue)} 
            // Tailwind classes: cursor-pointer, focus outline removal
            className="group p-1 cursor-pointer focus:outline-none transition-transform duration-150 hover:scale-110"
          >
            <svg 
              // Dynamically set the fill color and size
              className={starValue <= rating ? "text-yellow-500" : "text-gray-300 group-hover:text-yellow-400"} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512" 
              width="24" // Tailwind equivalent: w-6
              height="24" // Tailwind equivalent: h-6
            >
              <path 
                // Using 'currentColor' allows the SVG path to inherit the color set by Tailwind's text-* class on the SVG tag.
                fill="currentColor" 
                d="M287.9 17.8L354 150.2l146.1 21.3c26.2 3.8 36.7 36 17.7 54.6L416 347.1
                 l25 145.5c4.5 26.1-23 46-46.4 33.7L288 439.6l-130.6 68.7c-23.4 12.3-50.9-7.6
                 -46.4-33.7l25-145.5L58.2 226.1c-19-18.6-8.5-50.8 17.7-54.6L222 150.2 288.1
                 17.8c11.7-23.6 45.6-23.9 57.2 0z"
              />
            </svg>
          </button>
        ))
      }
    </div>
  )
}

export default StarRating