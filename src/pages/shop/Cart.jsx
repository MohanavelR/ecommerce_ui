import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import CartItemCard from '../../components/layout/shop/cart/CartCard';
import OrderSummary from '../../components/layout/shop/cart/orderSummary';
import { useDeleteCartItem, useGetCart, useUpdateCart } from '../../store/cart';
import { MessageContext } from '../../context/context';
import CartItemsContainer from '../../components/layout/shop/cart/CartItemsContainer';
import { useNavigate } from 'react-router-dom';

// Utility function to calculate totals (as provided)
const calculateTotals = (items) => {
  if (!items || items.length === 0) {
     return { subtotal: 0, discount: 0, totalItems: 0 };
  }
  const subtotal = 
  items.reduce((acc, item) => acc + (item.price.current * item.quantity),
   0
  );
  const originalTotal = items.reduce((acc, item) => acc + (item.price.original || item.price.current) * item.quantity, 0);
  const discount = originalTotal - subtotal;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return { subtotal, discount, totalItems };
};

const Cart = () => {
  const { cartItems, isLoading } = useSelector(state => state.cart);
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const {user}=useSelector(state=>state.auth)
  const cartItemsList = cartItems?.items || [];
  const dispatch=useDispatch()
   const nav=useNavigate()


  
  // --- EMPTY CART CHECK ---
  if (!cartItemsList || cartItemsList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 text-center min-h-[50vh]">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty 🛒</h1>
        <p className="text-gray-600">Start shopping to fill it up!</p>
        {/* Link/Button to Shopping Page */}
      </div>
    );
  }

  // Calculations
  const { subtotal, discount, totalItems } = calculateTotals(cartItemsList);
  const shippingCost=0
  const total = subtotal + shippingCost;

  

  
  const handleClearAllItems=()=>{
    if(confirm("Are Sure To Clear Items with out Checkout ?")){
    dispatch(useDeleteCartItem({userId:user.id,clearAll:true})).then(res=>{
       if(res.payload?.success){
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                dispatch(useGetCart(user.id))
               }
             else{
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
       }
      })
    }
  } 
  return (
    // NEW WRAPPER: Centers the content in a max-width container with clean background
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white rounded-lg">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Your Bag is Ready <span className="text-indigo-600">({totalItems} Items)</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8">
            Review your items and proceed to checkout.
        </p>
        
        {/* --- MAIN CONTENT COLUMN --- */}
        <div className="space-y-6">
          
          {/* 1. CART ITEMS LIST */}
          <CartItemsContainer cartItems={cartItems} />          

          {/* 2. OPTIONAL: Divider before Summary */}

          {/* 3. ORDER SUMMARY (Now placed at the bottom, full width) */}
          <div className="w-full">
            <OrderSummary 
              subtotal={subtotal}
              discount={discount}
              totalItems={totalItems} 
              total={total}
            />
              <button 
            onClick={()=>nav("/shop/checkout")}
            className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={total <= 0} // Disable if cart total is zero
        >
            Proceed to Checkout
        </button>

        {/* --- NEW: Clear Cart Button (Secondary Action) --- */}
        <button
            onClick={handleClearAllItems}
            className="w-full mt-3 py-3 text-red-600 font-semibold text-lg border border-red-300 rounded-lg hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            disabled={totalItems === 0}
        >
            Clear All Items
        </button>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Cart;