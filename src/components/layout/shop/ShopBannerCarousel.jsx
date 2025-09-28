import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const ShopBannerCarousel = () => {
  const{banners} = useSelector(state => state.banner);
  const activeItems = banners.filter(item => item.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex === activeItems.length - 1 ? 0 : prevIndex + 1)
    );
  }, [activeItems.length]);

  // Auto-slide effect
  useEffect(() => {
    // Change slide every 3 seconds (3000ms)
    const intervalId = setInterval(nextSlide, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [nextSlide]); // Dependency array ensures effect runs only when nextSlide changes

  if (activeItems.length === 0) {
    return null; // Don't render if no active images
  }

  // Use the image of the current index
  const currentImage = activeItems[currentIndex];
  if(!activeItems){
    return null
  }
  return (
   
    <div className="relative w-80 my-7 rounded-2xl mx-auto overflow-hidden">
      {/* The h-20 class makes it very, very small as requested.
        Use a larger value like h-48 or h-64 for a typical banner. 
      */}
      <div className="h-20 sm:h-20 w-full rounded-2xl"> 
        <img
          key={currentIndex} // Key forces a re-render/transition for image change
          src={currentImage.image}
          alt={currentImage.title}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
        />
        
        {/* Simple text overlay to demonstrate content */}
        <div className="absolute inset-0  bg-black/50 bg-opacity-30 flex items-center justify-center">
            <h2 className="text-red-600 text-sm font-semibold">{currentImage.title}</h2>
        </div>
      </div>
    </div>
  
  );
};

export default ShopBannerCarousel;