import { Link } from "react-router-dom";
// NOTE: Lucide/FontAwesome React imports are removed as we are using CSS classes.

const ShopFooter = () => { // Component name changed to ShopFooter
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Info", href: "/faq#shipping" },
    { name: "Returns", href: "/faq#returns" },
  ];

  const categories = [
    { name: "Electronics", href: "/shop?category=electronics" },
    { name: "Clothing", href: "/shop?category=clothing" },
    { name: "Home & Garden", href: "/shop?category=home-garden" },
    { name: "Sports", href: "/shop?category=sports" },
    { name: "Books", href: "/shop?category=books" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    // Applied a dark background color (indigo-900) and text color for contrast
    <footer className="bg-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo Background and Text */}
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">EcoShop</h3>
                {/* Changed primary-foreground/80 to indigo-200 */}
                <p className="text-sm text-indigo-200">Green Shopping Experience</p> 
              </div>
            </div>
            {/* Changed primary-foreground/90 to indigo-100 */}
            <p className="text-indigo-100 text-sm leading-relaxed">
              Your trusted partner for sustainable and eco-friendly products. 
              We're committed to providing high-quality items while protecting our environment.
            </p>
            
            {/* Social Icons - NOW FONT AWESOME using <i> */}
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                {/* Font Awesome Social Icon: Facebook (fa-brands fa-facebook-f) */}
                <i className="fa-brands fa-facebook-f w-4 h-4 text-white"></i> 
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                {/* Font Awesome Social Icon: Twitter (fa-brands fa-twitter) */}
                <i className="fa-brands fa-twitter w-4 h-4 text-white"></i>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                {/* Font Awesome Social Icon: Instagram (fa-brands fa-instagram) */}
                <i className="fa-brands fa-instagram w-4 h-4 text-white"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-indigo-400 transition-colors duration-200">
                {/* Font Awesome Social Icon: LinkedIn (fa-brands fa-linkedin-in) */}
                <i className="fa-brands fa-linkedin-in w-4 h-4 text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    // Changed primary-foreground/90 to indigo-100
                    className="text-indigo-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.href} 
                    // Changed primary-foreground/90 to indigo-100
                    className="text-indigo-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - NOW FONT AWESOME using <i> */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              {/* Map Pin Icon - NOW FONT AWESOME */}
              <div className="flex items-start space-x-3">
                {/* Font Awesome Solid Icon: Map Marker (fa-solid fa-map-marker-alt) */}
                <i className="fa-solid fa-map-marker-alt w-5 h-5 text-white mt-0.5 flex-shrink-0"></i>
                {/* Changed primary-foreground/90 to indigo-100 */}
                <p className="text-indigo-100 text-sm">
                  123 Green Street, Eco City, EC 12345
                </p>
              </div>
              {/* Phone Icon - NOW FONT AWESOME */}
              <div className="flex items-center space-x-3">
                {/* Font Awesome Solid Icon: Phone (fa-solid fa-phone) */}
                <i className="fa-solid fa-phone w-5 h-5 text-white flex-shrink-0"></i>
                {/* Changed primary-foreground/90 to indigo-100 */}
                <p className="text-indigo-100 text-sm">+1 (555) 123-4567</p>
              </div>
              {/* Mail Icon - NOW FONT AWESOME */}
              <div className="flex items-center space-x-3">
                {/* Font Awesome Solid Icon: Envelope (fa-solid fa-envelope) */}
                <i className="fa-solid fa-envelope w-5 h-5 text-white flex-shrink-0"></i>
                {/* Changed primary-foreground/90 to indigo-100 */}
                <p className="text-indigo-100 text-sm">support@ecoshop.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Changed primary-foreground/80 to indigo-200 */}
          <p className="text-indigo-200 text-sm text-center sm:text-left">
            © 2024 EcoShop. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {legalLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                // Changed primary-foreground/80 to indigo-200
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