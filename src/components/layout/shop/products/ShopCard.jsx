import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShopCard = ({ product }) => {
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const variation = product.variations[0];
  const NEW_ARRIVAL_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;
  const productCreatedTime = new Date(product.createdAt).getTime();
  const isNewArrival =Date.now() - productCreatedTime < NEW_ARRIVAL_THRESHOLD_MS;
  const totalStock = product.variations?.length
    ? product.variations.reduce((sum, v) => sum + (v.stock || 0), 0)
    : product.stock;
  const isOffer=product.variations?.length
    ? product.variations.some((v) => v.offer > 0)
    : false;
  const isStock=totalStock > 0  
    const isSoldOut = product?.stock === 0;   
    const validImages = product?.images?.filter(img => img);
    const totalImages = validImages.length;
    useEffect(() => {
        if (totalImages < 2) return; 
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => 
                (prevIndex + 1) % totalImages
            );
        }, 5000)
        return () => clearInterval(interval);
    }, [totalImages]); 
    const getStockStatus = () => {
        if (totalStock > 10) return { label: `In Stock `, class: 'bg-green-600 text-white' };
        if (totalStock > 0) return { label: `Low Stock `, class: 'bg-yellow-500 text-white' };
        return { label: `Sold Out`, class: 'bg-red-600 text-white' };
    };
    const stockStatus = getStockStatus();


    const handleAddToCart = (e) => {
        e.preventDefault(); 
        if (isStock) {
             console.log(`Adding ${product?.productName} to cart.`);
        }
    };

   

    return (

        <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 group transform hover:scale-[1.01] hover:shadow-indigo-500/20 relative flex flex-col">
            
            <Link to={`/shop/products/${product?.sku}`} className="relative aspect-[4/3] overflow-hidden block">
                
                {/* Image Slider Wrapper (No change) */}
                <div 
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {validImages.map((imageSrc, idx) => (
                        <img 
                            key={idx}
                            src={imageSrc} 
                            alt={`${product?.productName} ${idx + 1}`} 
                            className="flex-shrink-0 w-full h-full object-cover  transition-transform duration-700 ease-in-out"
                        />
                    ))}
                </div>

                {/* --- Sold Out / Not Available Image Overlay --- (Reduced padding/font size) */}
                {!isStock && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center z-10 backdrop-blur-sm">
                        <span className="text-white text-xl font-black tracking-widest uppercase p-2 border-2 border-white transform rotate-[-5deg]">
                            SOLD OUT
                        </span>
                    </div>
                )}
               
                {/* Badge Container: Reduced padding */}
                <div className="absolute top-0 left-0 w-full p-2 flex justify-between items-start pointer-events-none z-20"> 
                    
                    {/* --- Stock/Offer Badge Group (Left) --- */}
                    <div className="flex flex-col gap-1 items-start">
                        {/* Stock Status Badge (Smaller px/py, text size, and font weight) */}
                        <div className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md pointer-events-auto ${stockStatus.class}`}>
                            {stockStatus.label}
                        </div>

                        {/* Offer Badge (Smaller px/py, text size, and font weight) */}
                        {
                            isOffer &&
                            <div className="bg-indigo-600 -skew-y-6 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-md pointer-events-auto mt-0.5">
                                Offer
                            </div>
                        }
                    </div>

                    {/* --- Trending Badge (Right) --- */}
                    <div className="flex flex-col gap-1 items-end">
                        {/* Trending Badge (Smaller px/py, text size, and font weight) */}
                        {
                            product?.isTrending &&
                            <div className="bg-pink-600 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow-md pointer-events-auto">
                                TRENDING
                            </div>
                        }
                    </div>
                </div>
            </Link>
            
            {/* Product Details Block (Reduced px/py) */}
            <div className="px-3 py-2 flex flex-col flex-grow"> 
                
                {/* Brand & Name (Reduced margins/font size) */}
                <div className='mb-1'>
                    <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest ">{product?.brand}</p>
                    <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 line-clamp-2">
                        {product?.productName}
                    </h3>
                </div>
                
                {/* Category Tags (Removed secondary category tag, reduced text size/padding) */}
                <div className="flex flex-wrap items-center justify-start gap-1 mb-1">
                    {/* Kept category, removed subCategory for space */}
                    <span className="bg-gray-100 text-gray-700 text-[10px] px-1 py-0.5 rounded font-semibold">{product?.category}</span>
                    <span className="bg-gray-100 text-gray-700 text-[10px] px-1 py-0.5 rounded font-semibold">{product?.subCategory}</span>
                </div>

                {/* Description Section (Removed completely for maximum size reduction) */}
                
                {/* Price Section (Reduced margins/font size) */}
                <div className="flex items-center justify-between mt-1">
                    <div className="flex justify-between w-full  space-x-1">
                        <div>
                        {/* Current Price (Reduced font size) */}
                        <span className="text-xl font-extrabold text-slate-900">
                            {variation?.price?.currency}{variation?.price?.current}
                        </span>
                        
                        {/* Original Price (Reduced font size) */}
                        {variation?.price.original > variation?.price.current && (
                            <span className="text-base font-medium text-gray-400 line-through">
                                {variation?.price?.currency}{variation?.price.original}
                            </span>
                        )}
                        </div>
                         {isOffer && (
            <span className="bg-red-500 -skew-y-6 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
             Offer
            </span>
          )}
                    </div>
                </div>
            </div>

            {/* --- Customer Action Bar (Add to Cart) --- (Reduced padding, removed Wishlist) */}
            <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-end">
                {/* Add to Cart Button (Reduced padding/font size, full width now) */}
                {
                   (product?.variations &&product?.variations.length > 1)?<Link to={`/shop/products/${product?.sku}`} 
                   
                    className={`flex-1 p-2 flex bg-primary text-accent items-center justify-center gap-1 text-sm font-bold transition-all duration-300 rounded-md shadow-md transform hover:scale-[1.01]`}
                >
                    
                   Read More
                </Link>:
                <button 
                    onClick={handleAddToCart} 
                    disabled={!isStock}
                    title={!isStock ? "Out of Stock" : "Add to Cart"}
                    className={`flex-1 p-2 flex items-center justify-center gap-1 text-sm font-bold transition-all duration-300 rounded-md shadow-md transform hover:scale-[1.01] ${
                        !isStock
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {!isStock ? 'SOLD OUT' : 'ADD TO CART'}
                </button>
                }
                
            </div>
        </div>
    );
}

export default ShopCard;