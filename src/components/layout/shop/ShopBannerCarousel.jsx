import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const ShopBannerCarousel = ({banner,index}) => {

  return (
   
    <div className="relative w-full overflow-hidden">
      <div className=" rounded-2xl"> 
        <img 
          key={index}
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out opacity-100"
        /> 
        {/* Simple text overlay to demonstrate content */}
        {/* <div className="absolute inset-0  bg-black/50 bg-opacity-30 flex items-center justify-center">
            <h2 className="text-red-600 text-sm font-semibold">{banner.title}</h2>
        </div> */}
      </div>
    </div>
  
  );
};

export default ShopBannerCarousel;