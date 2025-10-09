import { Link, useLocation } from "react-router-dom";
import FadeIn from "../common/FadeIn";

const AboutSection = () => {
  const location=useLocation()
    const content=[
                'Fast, reliable shipping nationwide',
                'Extensive range of pet foods, toys, and accessories',
                'Customer support by passionate pet care experts'
              ]
  return (
    <FadeIn>
    <section className="py-5 px-3 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Images & Counter */}
          <div className="w-full lg:w-6/12 px-4 mb-12 lg:mb-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80" 
              alt="Happy pets products" 
              className="w-10/12 z-10 rounded-lg shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=80" 
              alt="Online pet shop" 
              className="absolute z-10 right-10 md:right-0  bottom-0 w-6/12 h-auto rounded-lg shadow-2xl transform translate-y-1/4 translate-x-1/4 sm:translate-x-1/3 md:translate-x-1/4 lg:translate-x-0"
            />
           
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-6/12 px-4 pt-12 lg:pt-0">
             <h5 className="inline-block bg-primary/20 text-primary text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-wide mb-1">
About Us
</h5>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Your Trusted Online Pet Store for Every Need
            </h2>
            <p className="text-gray-600 mb-6">
              We offer a vast selection of premium pet supplies delivered straight to your door. Our ecommerce platform makes it easy for pet lovers everywhere to find trusted products and expert advice in one convenient place.
            </p>
            <ul className="space-y-3 mb-8">
              {content.map((item, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <div className="mr-3 mt-1 text-pg-primary">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {
                location.pathname!=="/shop/about-us" &&
              <Link
                to="/shop/about-us" 
                className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-pg-primary/80 transition duration-300"
              >
                About Us <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
    </FadeIn>
  );
};


export default AboutSection