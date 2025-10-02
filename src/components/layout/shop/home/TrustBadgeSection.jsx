import React from 'react';
import HeadingHome from './HeadingHome';

// --- Single Trust Badge Component ---
const TrustBadge = ({ iconClass, title, description }) => (
  <div className="flex flex-col items-center p-6 text-center">
    
    {/* Icon Container: Large size, accent color, distinct shape */}
    <div className="mb-4">
      {/* Icon size 'text-5xl' and color 'text-teal-500' for impact */}
      <i className={`${iconClass} text-5xl text-teal-500`}></i> 
    </div>
    
    {/* Text Content */}
    <div>
      {/* Title: Strong, authoritative font */}
      <h3 className="text-lg font-extrabold text-gray-900 mb-1">
        {title}
      </h3>
      {/* Description: Supportive text */}
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  </div>
);

// --- Main Trust Badges Component ---
const TrustBadgesSection = () => {
  return (
    // Section Container: Uses a light background to visually separate it from product grids
    <section className="w-full  mx-auto py-12 md:py-16 bg-white">
        
      {/* Optional: Section Title (Recommended) */}
     <HeadingHome heading="Choose Our Store?" primaryText="Why"/>

      {/* Grid Layout: Responsive 3-column layout */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        {/* Badge 1: Quality and Assurance */}
        <TrustBadge
          iconClass="fas fa-medal" 
          title="Certified Quality"
          description="Every product is rigorously inspected to meet the highest industry standards."
        />
        
        {/* Badge 2: Security and Trust */}
        <TrustBadge
          iconClass="fas fa-shield-alt"
          title="Safe & Secure"
          description="Your payment and personal data are protected by 256-bit encryption."
        />
        
        {/* Badge 3: Customer Service */}
        <TrustBadge
          iconClass="fas fa-handshake"
          title="Satisfaction Guaranteed"
          description="Dedicated 24/7 support and hassle-free returns within 30 days."
        />
        
      </div>
      
    </section>
  );
};

export default TrustBadgesSection;