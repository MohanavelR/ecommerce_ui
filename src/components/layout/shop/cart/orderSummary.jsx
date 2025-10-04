import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ subtotal, discount,total, totalItems }) => {
  const shippingCost = 0
  const currency = '₹';
 
 
  return (
    // Order Summary Box: Sticky on desktop with a strong shadow for prominence
    <div className="bg-white p-6 rounded-xl shadow-2xl   w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-accent pb-3">Order Summary</h2>
        {/* Price Breakdown */}
        <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-gray-800">{currency}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
                <span>Discount (Savings)</span>
                <span className="font-bold">- {currency}{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span>Shipping & Handling</span>
                {/* Free Shipping Highlight */}
                <span className="font-medium text-green-600">{shippingCost === 0 ? 'FREE' : `${currency}${shippingCost.toFixed(2)}`}</span>
            </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>
        
        {/* Final Total (Largest and boldest text) */}
        <div className="flex justify-between text-xl  text-gray-900 items-center">
            <span className='font-extrabold'>Order Total</span>
            <span className="text-2xl font-bold text-indigo-700">{currency}{total.toFixed(2)}</span>
        </div>

        {/* Savings Message */}
        {discount > 0 && (
            <p className="text-sm text-green-600 mt-3 font-semibold">
                🎉 You saved {currency}{discount.toFixed(2)} on this order!
            </p>
        )}

       
      
    </div>
  );
};

export default OrderSummary;