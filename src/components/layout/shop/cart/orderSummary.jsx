import React from 'react';

const OrderSummary = ({ subtotal, discount, totalItems, onCheckout, onClearCart }) => {
  const shippingCost = 0; // Assuming free shipping for simplicity
  const total = subtotal + shippingCost;
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
        <div className="flex justify-between text-xl font-extrabold text-gray-900 items-center">
            <span>Order Total</span>
            <span className="text-2xl text-indigo-700">{currency}{total.toFixed(2)}</span>
        </div>

        {/* Savings Message */}
        {discount > 0 && (
            <p className="text-sm text-green-600 mt-3 font-semibold">
                🎉 You saved {currency}{discount.toFixed(2)} on this order!
            </p>
        )}

        {/* Checkout Button (Primary Call-to-Action) */}
        <button 
            onClick={onCheckout}
            className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={total <= 0} // Disable if cart total is zero
        >
            Proceed to Checkout
        </button>

        {/* --- NEW: Clear Cart Button (Secondary Action) --- */}
        <button
            onClick={onClearCart}
            className="w-full mt-3 py-3 text-red-600 font-semibold text-lg border border-red-300 rounded-lg hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            disabled={totalItems === 0}
        >
            Clear All Items
        </button>
    </div>
  );
};

export default OrderSummary;