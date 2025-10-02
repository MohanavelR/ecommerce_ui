import React from 'react';

// Using a professional deep blue to simulate your custom 'bg-pr-primary'
const PRIMARY_COLOR = "bg-sky-700"; 
const PRIMARY_LIGHT_ACCENT = "text-sky-200";

const BreadcrumbBanner = ({ pageTitle = "About Us", currentPage = "About Us" }) => {
  return (
    // 1. Outer Container: Establishes context for absolute children.
    <div 
      // Set a fixed height (h-80 is 20rem; h-90 is a custom value, sticking to h-80/h-96 for Tailwind utility)
      className={`w-full h-80 relative overflow-hidden`}
    >
      
      {/* BACKGROUND IMAGE: Layer 1 (z-0) - The lowest layer */}
      <img 
        src="" 
        alt="Decorative Background" 
        // z-0 ensures it's at the very back
        className="absolute inset-0 z-0 object-cover w-full h-full" 
      />

      {/* OVERLAY (Dark Film): Layer 2 (z-10) - Sits on top of the image */}
      {/* This is necessary to make the white text readable on any image */}
      <div className="absolute inset-0 z-10 bg-black/60"></div>


      {/* CONTENT CONTAINER: Layer 3 (z-20) - Sits on top of the overlay and image */}
      <div className="relative z-20 h-full flex items-center justify-center text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          
          {/* Hero Headline - Page Title (e.g., About Us) */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
            {pageTitle}
          </h1>

          {/* Breadcrumb Path - Mimics the 'Home > Page' structure */}
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol role="list" className="flex items-center justify-center text-lg">
              
              {/* 1. Home Link */}
              <li>
                <a 
                  href="index.html"
                  className={`font-medium ${PRIMARY_LIGHT_ACCENT} hover:text-white transition duration-200`}
                >
                  Home
                </a>
              </li>
              
              {/* 2. Separator */}
              <li aria-hidden="true" className="flex items-center">
                {/* Note: Ensure you have FontAwesome (fa-solid) installed or use a plain text '>' */}
                <i className={`fa-solid fa-angle-right mx-3 text-base ${PRIMARY_LIGHT_ACCENT}`}></i>
              </li>

              {/* 3. Active Page (Current Page) */}
              <li>
                <span 
                  className="font-medium text-white"
                  aria-current="page"
                >
                  {currentPage}
                </span>
              </li>
            </ol>
          </nav>
          
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbBanner;