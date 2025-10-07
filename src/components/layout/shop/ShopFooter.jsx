import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
const ShopFooter = () => {
  const quickLinks = [
    { name: "Home", href: "/shop/home" },
    { name: "Shop", href: "/shop/products" },
    { name: "About Us", href: "/shop/about-us" },
    { name: "Contact Us", href: "/shop/contact-us" },
     { name: "FAQ", href: "/shop/faq" },
   
  ];
    const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  // NOTE: This array is now long again (21 items for testing the dynamic split)
const {categoryList,isLoading}=useSelector(state=>state.category)
const PER_COLUMN_LIST = 8;
const totalSizeOfCategory =(categoryList && categoryList.length)  || 0;

// This calculates the minimum number of columns needed.
const countOfColumns = Math.ceil(totalSizeOfCategory / PER_COLUMN_LIST);


  return (
    <footer className="bg-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5">
          
          {/* Brand Section ... (no change) */}
          <div className="space-y-4 col-span-2">
            {/* ... (Brand content) ... */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">EcoShop</h3>
                <p className="text-sm text-indigo-200">Green Shopping Experience</p> 
              </div>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Your trusted partner for sustainable and eco-friendly products. 
              We're committed to providing high-quality items while protecting our environment.
            </p>
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                <i className="fa-brands fa-facebook-f w-4 h-4 text-white"></i> 
              </a>
              {/* ... (Other Social Icons) ... */}
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                <i className="fa-brands fa-twitter w-4 h-4 text-white"></i>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                <i className="fa-brands fa-instagram w-4 h-4 text-white"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                <i className="fa-brands fa-linkedin-in w-4 h-4 text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links ... (no change) */}
          <div className="space-y-4 ">
            {/* <h4 className="text-lg font-semibold text-white">Quick Links</h4> */}
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-indigo-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - DYNAMIC SPLIT APPLIED HERE */}
          <div className={`space-y-4 ${countOfColumns>1?countOfColumns>2?"col-span-4":"col-span-3":"col-span-2"}`}>
            <h4 className="text-lg font-semibold text-white">Categories</h4>
            
            <div 
              // Dynamically set the grid columns based on the calculated number
              className={`grid grid-cols-2 md:grid-cols-${countOfColumns} gap-x-6`}
            >
              {
                // Create an array representing the number of columns (e.g., [0, 1, 2])
                Array.from({ length: countOfColumns }).map((_, colIndex) => {
                  
                  // Calculate the start index for the slice
                  const startIndex = colIndex * PER_COLUMN_LIST;
                  
                  // Slice the categories array to get the items for this column
                  const columnCategories = categoryList.slice(
                    startIndex,
                    startIndex + PER_COLUMN_LIST
                  );

                  return (
                    <ul key={colIndex} className="space-y-2">
                      {columnCategories.map((link) => (
                        <li key={link.categoryName}>
                          <Link 
                            to={`/shop/category/${link.categorySKU}`} 
                            className="text-indigo-100 hover:text-white transition-colors duration-200 text-sm"
                          >
                            {link.categoryName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  );
                })
              }
            </div>
          </div>

          {/* Contact Info ... (no change) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fa-solid fa-map-marker-alt w-5 h-5 text-white mt-0.5 flex-shrink-0"></i>
                <p className="text-indigo-100 text-sm">
                  123 Green Street, Eco City, EC 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-phone w-5 h-5 text-white flex-shrink-0"></i>
                <p className="text-indigo-100 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fa-solid fa-envelope w-5 h-5 text-white flex-shrink-0"></i>
                <p className="text-indigo-100 text-sm">support@ecoshop.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section ... (no change) */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-indigo-200 text-sm text-center sm:text-left">
            © 2024 EcoShop. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {legalLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                className="text-indigo-200 hover:text-white transition-colors duration-200 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;