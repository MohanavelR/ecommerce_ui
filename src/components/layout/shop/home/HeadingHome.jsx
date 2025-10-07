import React from 'react';

const HeadingHome = ({ heading, primaryText = "Our" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
      {/* Main heading */}
      <h2 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-snug">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 font-bold">
          {primaryText}
        </span>{" "}
        {heading}

        {/* Animated underline */}
        <span className="block mx-auto mt-2 h-[3px] w-0 bg-gradient-to-r from-primary to-primary/60 rounded-full animate-underline"></span>
      </h2>

      {/* Decorative horizontal lines */}
      <div className="flex items-center justify-center w-full mt-6 space-x-3">
        <div className="flex-grow max-w-[80px] sm:max-w-[120px] md:max-w-[160px] border-t border-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-pulse"></div>
        <div className="flex-grow max-w-[80px] sm:max-w-[120px] md:max-w-[160px] border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default HeadingHome;
