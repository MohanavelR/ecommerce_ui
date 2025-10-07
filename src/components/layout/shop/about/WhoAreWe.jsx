const WhoWAreWe = () => {
    const content=[
                  'Offer the highest quality pet products online',
                  'Deliver exceptional customer experience every time',
                  'Provide expert advice and resources for pet wellness'
                ]
  return (
    <section className="py-5 lg:py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap flex-col-reverse md:flex-row items-center -mx-4">
          {/* Text Content */}
          <div className="w-full lg:w-5/12 px-4 mb-12 lg:mb-0">
              <h5 className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wide mb-1">
 Who Are We
</h5>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Dedicated to Making Online Pet Shopping Easy and Enjoyable
            </h2>
            <p className="text-gray-600 mb-8">
              Our mission is to simplify pet care by providing curated products, secure checkout, and fast delivery. We’re committed to educating and empowering pet owners with resources and personalized service.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pg-primary mb-8">
              <p className="text-xl font-bold text-gray-800 mb-4">Our Mission</p>
              <ul className="space-y-3">
                {content.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <div className="mr-3 mt-1 text-green-500">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="mt-8">
              <a 
                href="service.html" 
                className="inline-flex items-center px-8 py-3 bg-pg-primary text-white font-semibold rounded-full shadow-lg hover:bg-pg-primary/80 transition duration-300"
              >
                Browse All Products <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
              </a>
            </div> */}
          </div>

          {/* Image Grid */}
          <div className="w-full lg:w-6/12 px-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <div className="hidden md:block h-16 lg:h-24"></div>
                <img 
                  src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80" 
                  alt="Pet shop products display" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80" 
                  alt="Happy dog with owner" 
                  className="w-full  rounded-lg shadow-lg"
                />
                 <img 
                  src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=800&q=80" 
                  alt="Happy dog with owner" 
                  className="w-full mt-6  rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 bg-white p-4 rounded-lg shadow-xl flex items-center space-x-3">
                  <div className="text-yellow-500 text-2xl">
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    Loved By Thousands of Pet Owners Nationwide
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Spacer */}
          {/* <div className="hidden lg:block lg:w-1/12 px-4"></div> */}
        </div>
      </div>
    </section>
  );
};

export default WhoWAreWe