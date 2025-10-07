import React, { useState, useEffect } from 'react';

const ALL_TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote: "“But don't just take our word for it – hear what our best satisfied customers have to say! From homeowners to businesses, our clients have experienced the difference our services make in their daily lives. Discover how we've helped businesses thrive client.”",
    name: "Shakib Mahmud",
    title: "Happy Client",
    imgSrc: "assets/img/all-images/testimonial-img2.png"
  },
  {
    id: 2,
    rating: 4,
    quote: "“The service quality exceeded all my expectations. The team was professional, prompt, and resolved our complex electrical issues quickly and efficiently. Highly recommend their expertise for any scale of work!”",
    name: "Olivia Chen",
    title: "Business Owner",
    imgSrc: "assets/img/all-images/testimonial-img1.png" // Placeholder
  },
  {
    id: 3,
    rating: 5,
    quote: "“Exceptional customer support! They walked me through the process of upgrading my smart home system, and everything works flawlessly now. A truly reliable and trustworthy company in the energy sector.”",
    name: "James Rodriguez",
    title: "Homeowner",
    imgSrc: "assets/img/all-images/testimonial-img3.png" // Placeholder
  },
];

const TestimonialsSection = () => {
  // 1. STATE: Track which testimonial is currently active
  const [activeIndex, setActiveIndex] = useState(0);
  const currentTestimonial = ALL_TESTIMONIALS[activeIndex];

  // 2. EFFECT: Implement the automatic right-to-left transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Logic for right-to-left (next slide) effect
      setActiveIndex((prevIndex) => 
        (prevIndex + 1) % ALL_TESTIMONIALS.length
      );
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function to stop the timer when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs only once on mount

  // 3. TRANSITION CLASS: We use a key change on the card to force a re-render 
  // with a CSS transition class for the "slide" look.

  return (
    <div className="py-20 lg:py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          
          {/* Left Column (Testimonial Header) */}
          <div className="w-full lg:w-4/12 px-4 mb- lg:mb-0">
            <div className="sticky top-10">
              <h5 className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wide mb-1">Testimonials</h5>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
                Powerful Praise Hear from Our Customers
              </h2>
              <p className="text-gray-600 mb-8">
                We take pride in providing top-notch electricity services that exceed our customers' expectations.
              </p>
              {/* Button Area */}
              {/* <div className="mt-8">
                <a 
                  href="testimonials.html" 
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  View all reviews <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                </a>
              </div> */}
            </div>
          </div>

          {/* Right Column (Testimonial Slides) */}
          <div className="w-full lg:w-8/12 px-4">
            <div className="max-w-3xl relative h-auto min-h-[350px]">
              
              {/* Testimonial Card with Transition */}
              {/* The 'key' forces a re-render, enabling the transition class below. */}
              <div 
                key={currentTestimonial.id}
                className="
                  bg-white p-8 rounded-lg shadow-xl border-t-4 border-blue-600 
                  transition-all duration-700 ease-in-out transform 
                  animate-slideIn
                "
              >
                <div className="mb-6 relative">
                  {/* Rating Stars */}
                  <ul className="flex space-x-1 text-yellow-400 mb-4">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <li key={i}><i className="fa-solid fa-star"></i></li>
                    ))}
                  </ul>
                  
                  {/* Quote Icon */}
                  <div className="absolute top-0 right-0 text-gray-200 text-6xl opacity-75">
                    <i className="fa-solid fa-quote-right"></i>
                  </div>
                  
                  {/* Quote Text */}
                  <p className="text-lg italic text-gray-700 relative z-10">{currentTestimonial.quote}</p>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center mt-6 pt-4 border-t border-gray-200">
                  <div className="w-16 flex font-bold bg-primary text-accent rounded-full text-3xl justify-center items-center h-16 mr-4">
                    {currentTestimonial.name[0]}
                  </div>
                  <div>
                    <h1  className="text-xl font-bold text-gray-800 hover:text-blue-600">
                      {currentTestimonial.name}
                    </h1>
                    <p className="text-sm text-gray-500">{currentTestimonial.title}</p>
                  </div>
                </div>
              </div>
              
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;

/* NOTE: For the visual "slide-in" effect, you would typically define a 
  CSS animation (e.g., using @keyframes for 'animate-slideIn' that 
  translates the element from off-screen to its final position). 
  Since external CSS/keyframes are not provided, the 'transition-all' 
  class provides a simple fade/change effect between slides.
*/