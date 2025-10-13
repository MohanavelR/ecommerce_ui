import React, { useState } from 'react';
import Loader from '../../../common/Loader';

const CartItemCard = ({ item, productName, addCartIndex,setAddCartIndex,onUpdateQuantity,index, onDelete,isLoading }) => {
  const uniqueKey = item.productId + item.variationKey;
  console.log(addCartIndex)
  const currentPrice = item.price.current;
  const originalPrice = item.price.original;
  const currency = item.price.currency || '₹';
  const stock = item.stock || 10;
  const totalItemPrice = currentPrice * item.quantity;
  const [actionType,setActionType]=useState(null)
  const handleQuantityChange = (quantity,action,index) => {

     const newQuantity=item.quantity-1
     setActionType(action)
      setAddCartIndex(index)
     if (newQuantity>0 && action==="decrement" ) {
      onUpdateQuantity(item.productId._id, item.variationKey, quantity,action);
    }
    else{
      onUpdateQuantity(item.productId._id, item.variationKey, quantity,action);
    }
  };

  return (
    // Impressive Card Design: Soft shadow, hover effect, white background, responsive flex
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-4 mb-4 flex flex-col sm:flex-row">
        
        {/* Product Image */}
        <img 
            src={item.image || '/default-product.jpg'} 
            alt={productName} 
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg mr-4 flex-shrink-0" 
        />
        
        {/* Details Column (Grows to fill space) */}
        <div className="flex-grow pt-2 sm:pt-0">
            {/* Product Name (Bold and clear) */}
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{productName}</h3>
            
            {/* Variations */}
            <p className="text-sm text-gray-500 mt-1">
                <span className="capitalize">{item.type || 'Variant'}:</span> <span className="font-medium text-gray-700">{item.value}</span>
            </p>

            {/* Quantity Input (Interactive controls) - NEW PILL DESIGN */}
            <div className="flex items-center mt-4 sm:mt-3 bg-gray-100 rounded-full p-0.5 w-max shadow-sm">
                
                {/* Decrease Button */}
                <button 
                  onClick={() => handleQuantityChange(1,"decrement",index)} 
                  disabled={item.quantity <= 1 || isLoading}

                  className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:hover:bg-white transition duration-200 shadow-inner flex items-center justify-center"
                  title="Decrease Quantity"
                >
                  {
                    isLoading && actionType==="decrement" && addCartIndex===index ?<Loader size='sm'/>:"-" 
                  }
                </button>
                
                {/* Quantity Display */}
                <span className="w-8 text-center font-bold text-gray-800 text-sm mx-1">
                  {item.quantity}
                </span>
                
                {/* Increase Button */}
                <button 
                  onClick={() => handleQuantityChange(1,"increment",index)} 
                  disabled={item.quantity >= stock || isLoading}
                  // New pill button style
                  className="w-8 h-8 rounded-full bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 disabled:hover:bg-white transition duration-200 shadow-inner flex items-center justify-center"
                  title="Increase Quantity"
                >
                  {
                    isLoading && actionType==="increment" && addCartIndex===index ?<Loader size='sm'/>:"+"
                  }
                  
                </button>
            </div>

            {/* Availability Status */}
            <p className={`text-xs font-medium mt-2 ${stock > 5 ? 'text-green-600' : stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                {stock > 0 ? (stock <= 5 ? 'Low Stock' : 'In Stock') : 'Out of Stock'}
            </p>
        </div>

        {/* Pricing and Actions Column (Now focused only on Price and Actions) */}
        <div className="flex flex-col items-start sm:items-end justify-between mt-4 sm:mt-0 sm:ml-4 flex-shrink-0 w-full sm:w-auto">
            
            {/* PRICE DISPLAY */}
            <div className="text-right w-full">
                
                {/* 1. SINGLE ITEM PRICE */}
                <p className="text-sm font-medium text-gray-500">
                    {currency}{currentPrice.toFixed(2)} / item
                </p>

                {/* 2. TOTAL ITEM PRICE */}
                <p className="text-xl font-extrabold text-indigo-600">
                    {currency}{totalItemPrice.toFixed(2)}
                </p>
                
                {/* 3. ORIGINAL TOTAL PRICE (if discounted) */}
                {originalPrice > currentPrice && (
                    <p className="text-sm text-gray-400 line-through">
                        {currency}{(originalPrice * item.quantity).toFixed(2)}
                    </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4 text-sm">
                <button 
                  onClick={() => onDelete(item.productId, item.variationKey)}
                  className="text-red-500 hover:text-red-700 font-medium transition"
                >
                    Remove
                </button>
                {/* <span className="text-gray-300">|</span>
                <button className="text-indigo-500 hover:text-indigo-700 font-medium transition">
                    Wishlist
                </button> */}
            </div>
        </div>
    </div>
  );
};

export default CartItemCard;