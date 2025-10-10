import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import FadeIn from "../../components/layout/shop/common/FadeIn";

const ShopCarousel = () => {
  const { sliders } = useSelector((state) => state.slider);
  const activeSliders = sliders.filter((b) => b.isActive);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = activeSliders.length;

  if (totalSlides === 0) {
    return (
      <div className="w-full">
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900/40 flex items-center justify-center">
          <img
            src="https://picsum.photos/200"
            alt="https://picsum.photos/200"
            className="absolute inset-0 w-full h-full object-cover"

          />

          {/* Overlay for Contrast */}

          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content */}

          <div className="relative z-10 container mx-auto flex flex-col justify-center h-full text-white px-4 py-8 sm:px-6">
            {/* Subtitle */}

            <p className="text-sm sm:text-lg font-medium tracking-wide text-green-300 uppercase mb-2">
              Bring the Outdoors In
            </p>

            {/* Title */}

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg max-w-4xl">
              Garden & Patio Essentials
            </h1>

            {/* Description */}

            <p className="text-base sm:text-xl mt-3 mb-6 max-w-xl hidden md:block">
              New range of running shoes, yoga mats, and resistance bands
              available now.
            </p>

            {/* Action Button */}
          </div>
        </div>
      </div>
    );
  }

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-Play: Cycle slides automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  return (
    // Only one container needed for the entire carousel
    <div className="relative w-full overflow-hidden shadow-2xl">
      {/* --------------- SLIDE CONTAINER (Controlled by transform) --------------- */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          // Total width is N * 100%
          width: `${totalSlides * 100}%`,
          // Shift container left by (current index * 1/N) * 100%
          transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
        }}
      >
        {/* Map over slides to create individual slide elements */}
        {activeSliders.map((data, index) => (
          // Each slide takes up 1/N of the container's width
          <div key={index} style={{ width: `${100 / totalSlides}%` }}>
            <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gray-900/40 flex items-center justify-center">
              {/* Background Image */}
              <img
                src={data.image}
                alt={data.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading='lazy'
              />

              {/* Overlay for Contrast */}
              <div className="absolute inset-0 bg-black opacity-50"></div>

              {/* Content */}
         
              <div className="relative z-10 container mx-auto flex flex-col justify-center h-full text-white px-4 py-8 sm:px-6">
                {/* Subtitle */}
                <p className="text-sm sm:text-lg font-medium tracking-wide text-green-300 uppercase mb-2">
                  {data.subtitle}
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg max-w-4xl">
                  {data.title}
                </h1>

                {/* Description */}
                <p className="text-base sm:text-xl mt-3 mb-6 max-w-xl hidden md:block">
                  {data.description}
                </p>

                {/* Action Button */}
                <a
                  href={data.link}
                  className="inline-block self-start px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-xl 
                               hover:bg-red-700 transition duration-300 transform hover:scale-105"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ------------------------------------------------------------- */}

      {/* -------------------- NAVIGATION ARROWS (Outside the map) -------------------- */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full 
                   hover:bg-black/60 transition z-20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 text-white rounded-full 
                   hover:bg-black/60 transition z-20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* -------------------- INDICATOR DOTS (Outside the map) -------------------- */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {activeSliders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors duration-300 
              ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-gray-400 opacity-70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCarousel;
