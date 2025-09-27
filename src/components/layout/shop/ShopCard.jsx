import React from 'react';

// --- Example Product Data for Testing ---
const exampleProduct = {
  productName: "Premium Wireless Headphones",
  sku: "ELE-AUD-001",
  price: {
    current: 12999,
    original: 19999
  },
  currency: "₹",
  category: "Electronics",
  subCategory: "Audio",
  brand: "Sony",
  offer: "35% OFF",
  description: "Experience premium sound quality with adaptive noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers.",
  images: [
    "https://picsum.photos/seed/headphones1/500/400.jpg",
  ],
  isTrending: true,
  stock: 15,
  // Setting creation date to 3 days ago to show the "NEW" badge
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), 
};
// ------------------------------------------

const ShopCard = ({ product = exampleProduct }) => {
  
  const mainImage = product.images[0] || "https://via.placeholder.com/300x220";
  
  // --- NEW BADGE LOGIC ---
  const NEW_ARRIVAL_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000;
  const productCreatedTime = new Date(product.createdAt).getTime();
  const isNewArrival = (Date.now() - productCreatedTime) < NEW_ARRIVAL_THRESHOLD_MS;
  // -----------------------

  const handleAddToCart = () => {
      if (product.stock > 0) {
          alert(`Added ${product.productName} to cart!`);
      }
  };

  const handleWishlist = () => {
      alert(`Added ${product.productName} to wishlist!`);
  };

  return (
    <div className="max-w-xs  bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
      
      {/* --- Image and Badges --- */}
      <div className="relative">
        <img 
          src={mainImage} 
          alt={product.productName} 
          className="w-full h-55 object-cover" 
        />
        
        {/* Top-Left Badges Container (NEW) */}
        <div className="absolute top-3 left-3 z-10">
            {isNewArrival && (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center shadow-md transform -rotate-1">
                    <i className="fas fa-star text-[0.6rem] mr-1"></i>
                    NEW
                </span>
            )}
        </div>
        
        {/* Top-Right Badges Container (TRENDING) */}
        <div className="absolute top-3 right-3 z-10">
            {product.isTrending && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center shadow-md">
                    <i className="fas fa-fire text-[0.6rem] mr-1"></i>
                    Trending
                </span>
            )}
        </div>
        
        {/* Stock Indicator */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold flex items-center shadow-md ${
            product.stock > 0 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <i className={`fas ${product.stock > 0 ? 'fa-check-circle' : 'fa-times-circle'} mr-1`}></i>
            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
          </span>
        </div>
      </div>
      
      {/* --- Product Details --- */}
      <div className="p-4"> 
        
        {/* Category & Subcategory (Left) and Brand (Right) - New Structure */}
        <div className="flex justify-between items-center mb-2">
            
            {/* Category & Subcategory (LEFT) */}
            <div className="flex items-center text-xs text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-2">
                    {product.category}
                </span>
                <span className="text-gray-500 font-medium">
                    {product.subCategory}
                </span>
            </div>
            
            {/* Brand (RIGHT) */}
            <div className="flex items-center">
                <i className="fas fa-tag text-gray-400 text-xs mr-1"></i>
                <span className="text-xs text-gray-600 font-semibold">{product.brand}</span>
            </div>
        </div>
        
        {/* Product Name */}
        <div className="mb-3"> 
          <h3 className="text-sm font-extrabold text-gray-900 line-clamp-2">{product.productName}</h3>
        </div>
        
        {/* Price & Offer */}
        <div className="flex items-center justify-between mb-3 border-t border-gray-100 pt-3">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">
              {product.currency}{product.price.current.toLocaleString()}
            </span>
            {product.price.original && (
              <span className="text-xs text-gray-500 line-through ml-2">
                {product.currency}{product.price.original.toLocaleString()}
              </span>
            )}
          </div>
          {product.offer && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
              {product.offer}
            </span>
          )}
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2"> 
          <button 
            onClick={handleAddToCart}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center shadow-md ${
              product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={product.stock === 0}
          >
            <i className="fas fa-shopping-cart text-sm mr-2"></i>
            Add
          </button>
          <button 
            onClick={handleWishlist}
            className="p-2 text-gray-400 hover:text-red-500 border border-gray-300 rounded-lg transition-colors duration-300"
          >
            <i className="far fa-heart text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;