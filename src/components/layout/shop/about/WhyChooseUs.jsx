import AboutProgressBar from "./AboutProgressBar";

const WhyChooseUs = () => {
   const content = [
    { label: "Extensive product catalog", width: 90 },
    { label: "Expert customer support", width: 95 },
    { label: "Reliable nationwide shipping", width: 92 },
  ];

  return (
    <section className="py-5 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap  items-center -mx-4">
          {/* Images */}
          <div className="w-full lg:w-6/12 px-4 mb-12 lg:mb-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80" 
              alt="Pets playing happily"
              className="w-10/12 rounded-lg shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80"
              alt="Customer service for online pet shop" 
              className="absolute right-0 bottom-0 w-6/12 h-auto rounded-lg shadow-2xl transform translate-x-1/4 translate-y-1/4 sm:translate-x-1/3 md:translate-x-1/4 lg:translate-x-0"
            />
          </div>

          {/* Content & Progress Bars */}
          <div className="w-full lg:w-6/12 px-4 pt-12 lg:pt-0">
            <h5 className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wide mb-1">
  Why Choose Us
</h5>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Your One-Stop Online Pet Shop for Quality and Care
            </h2>
            <p className="text-gray-600 mb-8">
              More than just products, we provide an exceptional shopping experience with expert guidance, fast shipping, and customer service dedicated to your pet’s happiness.
            </p>
            <div className="mt-10"> 
    {content.map((item, index) => (
        <AboutProgressBar 
          key={index} 
          label={item.label} 
          percentage={item.width} 
        />
      ))}
   
            </div>
            {/* <div className="mt-8">
              <a 
                href="about.html" 
                className="inline-flex items-center px-8 py-3 bg-pg-primary text-white font-semibold rounded-full shadow-lg hover:bg-pg-primary/80 transition duration-300"
              >
                Learn More <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs