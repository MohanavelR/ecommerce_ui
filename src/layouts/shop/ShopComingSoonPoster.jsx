import React, { useState, useEffect } from 'react';
import CloseBtn from '../../components/common/CloseBtn';

// Define the key used in sessionStorage
const SESSION_STORAGE_KEY = 'ShopHidden';

const ShopComingSoonPoster = ({ 
    posterTitle = "The Grand Opening Sale",
    posterImage = "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
}) => {
  const [isVisible, setIsVisible] = useState(() => {
    const isHidden = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    return !isHidden;
  });

  // --- EFFECT TO DISABLE BODY SCROLLING ---
  // This is what prevents the main page content from scrolling behind the modal.
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  };

  return (
   
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
                src={posterImage} 
                alt={posterTitle} 
                className="w-full h-full object-cover" 
            />

            {/* Title Layer - Centered on the image with bg-black/30 */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
                
                <p className="text-xl sm:text-2xl font-semibold text-white/90 uppercase tracking-widest mb-3 drop-shadow-md">
                    Launching Very Soon
                </p>

                <h2 className="text-4xl sm:text-6xl font-extrabold text-white text-center leading-tight drop-shadow-xl">
                    {posterTitle}
                </h2>
                
                <p className="mt-4 text-2xl font-bold text-yellow-300 drop-shadow-md">
                    Exclusive Access!
                </p>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default ShopComingSoonPoster;