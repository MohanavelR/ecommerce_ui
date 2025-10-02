import React, { useState, useEffect } from 'react';
import CloseBtn from '../../components/common/CloseBtn';
import { useSelector } from 'react-redux';

// Define the key used in sessionStorage
const SESSION_STORAGE_KEY = 'ShopHidden';

const ShopComingSoonPoster = ({ 
    posterTitle = "The Grand Opening Sale",
    posterImage = "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
}) => {
  const {posters}=useSelector(state=>state.comingsoon)
  const activePoster = (posters && posters.length > 0)?posters.find(poster=>poster.isActive):null
  // 1. STATE TO CHECK IF THE USER HAS PREVIOUSLY CLOSED THE POSTER
  const [hasUserHidden, setHasUserHidden] = useState(() => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  });

  // 2. STATE TO MANAGE THE 5-SECOND DELAY
  const [isDelayComplete, setIsDelayComplete] = useState(false);

  // The poster is visible ONLY if the user hasn't hidden it AND the delay is complete.
  const isVisible = !hasUserHidden && isDelayComplete;

  // --- EFFECT FOR THE 5-SECOND DELAY ---
  useEffect(() => {
    // If the user has already hidden the poster, don't start the timer.
    if (hasUserHidden) {
      setIsDelayComplete(true); // Treat as complete if it shouldn't show anyway
      return;
    }

    // Set a timeout to complete the delay after 5000 milliseconds (5 seconds)
    const timer = setTimeout(() => {
      setIsDelayComplete(true);
    }, 5000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [hasUserHidden]); // Re-run if 'hasUserHidden' changes (though unlikely after mount)

  // --- EFFECT TO DISABLE BODY SCROLLING ---
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      // It's important to unset overflow only when the poster is *not* visible.
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure body scroll is re-enabled on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    // Update the local state to prevent re-rendering and remove from view
    setHasUserHidden(true); 
    // Store in session storage so it doesn't reappear on page refresh
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  };

  return (
   <>
   {
    activePoster &&
    <div className="fixed inset-0 z-[9999] bg-black/60  flex items-center justify-center transition-opacity duration-300"> 
      <div 
        className="relative bg-white shadow-2xl transform transition-all duration-500 ease-out max-w-3xl w-11/12 mx-auto overflow-hidden" 
        role="dialog" 
        aria-modal="true"
      >
        
        {/* Close Button - Adjusted positioning to be 2 units (0.5rem) away from the sharp corner. */}
        <button
          onClick={handleClose}
          // Positioning the button 2 units (0.5rem) outside the top and right edge
          className="absolute -top-2 -right-2 text-white  transition-colors duration-200 p-2 z-20" 
          aria-label="Close Poster"
        >
          {/* Simple X SVG icon */}
          <CloseBtn/>
        </button>

        {/* IMAGE AND TITLE LAYER */}
        <div className="relative h-[30rem] sm:h-[32rem]">
             {/* Image */}
             <img 
                src={activePoster.image} 
                alt={activePoster.title} 
                className="w-full h-full object-cover" 
            />

            {/* Title Layer - Centered on the image with bg-black/30 */}
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-4">
                
                <p className="text-xl sm:text-2xl font-semibold text-white/90 uppercase tracking-widest mb-3 drop-shadow-md">
                    Launching Very Soon
                </p>

                <h2 className="text-4xl sm:text-6xl font-extrabold text-white text-center leading-tight drop-shadow-xl">
                    {activePoster.title}
                </h2>
                
                
            </div>
        </div>
        
      </div>
    </div>
   }
   </>
  );
};

export default ShopComingSoonPoster;