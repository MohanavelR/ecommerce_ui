import React, { useState, useEffect } from 'react';
import HeadingHome from './HeadingHome';

// Sample Testimonial Data (kept the same)
const testimonials = [
  {
    id: 1,
    name: "Aisha Sharma",
    review: "Absolutely love the quality and design of the products! Shipping was incredibly fast, and customer service was top-notch. Highly recommend this store to everyone.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ben Carter",
    review: "I was skeptical at first, but the 'Premium Wireless Headphones' exceeded my expectations. Fantastic sound and comfortable for long use. Will definitely be a returning customer.",
    rating: 4,
  },
  {
    id: 3,
    name: "Chloe Lee",
    review: "My go-to store for electronics. The 'Smart Home Hub' I purchased works flawlessly. The prices are competitive, and the product descriptions are very accurate.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    review: "Great selection and easy checkout process. Had a small issue with my order, but their support team resolved it quickly and efficiently. Impressed!",
    rating: 4,
  },
  {
    id: 5,
    name: "Eva Martinez",
    review: "The 'Vintage Camera' arrived beautifully packaged and works perfectly. It feels nostalgic and robust. A true gem! Thanks for such a unique find.",
    rating: 5,
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInterval = 7000;
  
  // Placeholder for your bg-primary and text-primary colors
  const PRIMARY_BG = 'bg-indigo-600';
  const PRIMARY_TEXT = 'text-indigo-700';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      );
    }, carouselInterval);

    return () => clearInterval(timer);
  }, [testimonials.length, carouselInterval]);

  const currentTestimonial = testimonials[currentIndex];

  // Helper to generate star rating icons
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fas fa-star ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
        ></i>
      );
    }
    return <div className="flex text-sm mb-2">{stars}</div>; 
  };

  // Helper to generate a random background color for the initial avatar
  const getRandomBackgroundColor = (name) => {
    const colors = [
      'bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-red-100'
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  return (
    <section className="py-16 md:py-20"> 
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-12">
            <HeadingHome heading="Happy Customers Say" primaryText="What" />
            <p className="mt-2 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear what our valued clients have to say about their experience
            </p>
        </div>

        {/* Testimonial Card Container */}
        {/* We use the white background for the whole card now */}
        <div className="rounded-2xl shadow-xl bg-white p-8 md:p-10 relative"> 
          
          {/* Testimonial Content: Avatar (Left) and Text (Right) */}
          <div 
            key={currentTestimonial.id}
            className="flex items-start transition-opacity duration-700 ease-in-out"
          >
            
            {/* 1. Reviewer Initial "Avatar" - Enhanced as the primary visual marker */}
            <div className={`flex-shrink-0 w-50 h-50 rounded  flex items-center justify-center mr-6 
               bg-primary text-accent font-bold text-9xl shadow-lg`}>
                {currentTestimonial.name.charAt(0).toUpperCase()}
            </div>

            {/* 2. Content Block (Name, Rating, Review) - Right Side */}
            <div className="flex-grow pt-2">
                
                {/* Quote Icon (Optional but stylish) */}
                <i className={`fas fa-quote-left text-xl ${PRIMARY_TEXT} opacity-75 mb-2`}></i>

                {/* Review Text (italic) */}
                <p className="text-base text-gray-700 leading-relaxed italic mb-4">
                    "{currentTestimonial.review}"
                </p>
                
                {/* Reviewer Name */}
                <p className="text-lg font-extrabold text-gray-900">
                    {currentTestimonial.name}
                </p>

                {/* Star Rating */}
                {renderStars(currentTestimonial.rating)}
                
            </div>
          </div>
        </div>

        {/* Carousel Dots - primary color for active, gray for inactive */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary": 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Call to Action Button - Primary button style */}
        {/* <div className="text-center mt-10">
          <button className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white ${PRIMARY_BG} hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}>
            Read All Reviews
            <i className="fas fa-arrow-right ml-2 -mr-1"></i>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;