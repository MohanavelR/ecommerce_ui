import React from 'react';

// --- Reusable Feature Item Component ---
const ImpressiveFeatureItem = ({ iconClass, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]">
    
    {/* Icon Container: Large size, strong accent color, subtle circle background */}
    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50/50">
      <i className={`${iconClass} text-3xl text-primary`}></i>
    </div>
    
    {/* Text Content */}
    <div>
      {/* Title: Dark, slightly larger font */}
      <h3 className="text-lg font-extrabold text-gray-900 mb-1">
        {title}
      </h3>
      {/* Description: High contrast, slightly darker gray */}
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  </div>
);

// --- Main Service Bar Component ---
const ServicePromiseBar = () => {
  return (
    // Main container: No internal borders, relying on card shadows
    <div className="w-full max-w-7xl mx-auto my-12 md:my-16">
      
      {/* Grid Layout: 
        - Clean grid with gap-8
        - Stacks vertically on small screens
        - 3 columns on medium/large screens (based on your component logic)
      */}
      <div className="grid grid-cols-1 mx-auto gap-8 md:grid-cols-3">
        
        <ImpressiveFeatureItem
          iconclassName="fas fa-shipping-fast" 
          title="Fast & Free Shipping"
          description="Free shipping on all US orders above $50. No hidden fees."
        />
        
        <ImpressiveFeatureItem
          iconclassName="fas fa-headset"
          title="Premium Support"
          description="Contact our expert team 24 hours a day, 7 days a week."
        />
        
        {/* Re-introducing the third item to match the 3-column grid structure */}
        <ImpressiveFeatureItem
          iconclassName="fas fa-shield-alt"
          title="100% Secure Payment"
          description="We ensure your payment details are always encrypted and safe."
        />
        
      </div>
    </div>
  );
};

export default ServicePromiseBar;