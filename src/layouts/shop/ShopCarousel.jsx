import React, { useState, useEffect } from 'react';

const SLIDER_DATA = [
  {
    title: "Eco-Friendly Tech: 50% Off",
    subtitle: "New Arrivals for a Greener Home",
    description: "Upgrade your gadgets responsibly. Shop our limited-time sale on refurbished and sustainable electronics.",
    image: "https://images.unsplash.com/photo-1549488344-f8b1b9e11898?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/shop/electronics",
    isActive: true,
  },
  {
    title: "Summer Fashion Clearance",
    subtitle: "Up to 70% Off All Apparel",
    description: "Don't miss out on the season's hottest styles. Final reduction on dresses, swimwear, and accessories.",
    image: "https://images.unsplash.com/photo-1594953934509-32247b9b1e93?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%P",
    link: "/shop/apparel",
    isActive: true,
  },
  {
    title: "Garden & Patio Essentials",
    subtitle: "Bring the Outdoors In",
    description: "Explore durable, weather-resistant furniture and outdoor lighting. Free shipping on orders over $150.",
    image: "https://images.unsplash.com/photo-1598160010998-349f7b49463c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/shop/garden",
    isActive: true,
  },
   {
    title: "Garden & Patio Essentials",
    subtitle: "Bring the Outdoors In",
    description: "Explore durable, weather-resistant furniture and outdoor lighting. Free shipping on orders over $150.",
    image: "https://images.unsplash.com/photo-1598160010998-349f7b49463c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/shop/garden",
    isActive: true,
  },
   {
    title: "Garden & Patio Essentials",
    subtitle: "Bring the Outdoors In",
    description: "Explore durable, weather-resistant furniture and outdoor lighting. Free shipping on orders over $150.",
    image: "https://images.unsplash.com/photo-1598160010998-349f7b49463c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/shop/garden",
    isActive: true,
  },
];
// -----------------------------------------------------------------


const ShopCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const slides = SLIDER_DATA.filter(slide => slide.isActive !== false); 

  if (slides.length === 0) {
    return null; 
  }
  
  const totalSlides = slides.length;

  // --- Navigation Functions ---
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // --- Auto-scroll functionality ---
  useEffect(() => {
    // 🔑 Changed duration from 7000ms to 10000ms (10 seconds)
    const interval = setInterval(nextSlide, 7000); 
    return () => clearInterval(interval);
  }, [currentIndex]); 

  const currentSlide = slides[currentIndex];

  return (
    // Main Container
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden group">
      
      {/* --- SLIDE CONTENT --- */}
      {/* 1. Background Image */}
      <img 
        key={currentSlide.image} 
        src={currentSlide.image} 
        alt={currentSlide.title} 
        className="absolute inset-0 w-full h-full object-cover animate-fade-in"
      />
      
      {/* 2. Overlay for Readability */}
      <div className="absolute inset-0 bg-black/20 lg:bg-gradient-to-r from-black/20 to-transparent"></div>

      {/* 3. Text Content */}
      <div className="relative z-10 container mx-auto flex flex-col justify-center h-full text-white px-4 py-8 sm:px-6">
          
          {/* Subtitle */}
          <p className="text-sm sm:text-lg font-medium tracking-wide text-green-300 uppercase mb-2">
              {currentSlide.subtitle}
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg max-w-4xl">
              {currentSlide.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl mt-3 mb-6 max-w-xl hidden md:block">
              {currentSlide.description}
          </p>

      </div>

      {/* --- NAVIGATION BUTTONS (Pure SVG) --- */}
      
      {/* Previous Button */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
        aria-label="Previous Slide"
      >
        {/* Pure SVG Left Arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Next Button */}
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full hover:bg-black/60 transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
        aria-label="Next Slide"
      >
        {/* Pure SVG Right Arrow */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* --- DOTS INDICATORS --- */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default ShopCarousel;