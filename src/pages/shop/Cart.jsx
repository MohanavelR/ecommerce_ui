import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import CartItemCard from '../../components/layout/shop/cart/CartCard';
import OrderSummary from '../../components/layout/shop/cart/orderSummary';
import { useDeleteCartItem, useGetCart, useUpdateCart } from '../../store/cart';
import { MessageContext } from '../../context/context';

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
  
  // Assuming Redux state includes 'error' for robust handling
  const { cartItems, isLoading } = useSelector(state => state.cart);
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const {user}=useSelector(state=>state.auth)
  const cartItemsList = cartItems?.items || [];
  const dispatch=useDispatch()
  


  
  // --- EMPTY CART CHECK ---
  if (cartItemsList.length === 0) {
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
  
  // Handler functions
  const handleUpdateQuantity = (productId, variationKey,quantity,action) => {
    dispatch(useUpdateCart({productId,variationKey,quantity,action,userId:user.id})).then(res=>{
      console.log(res.payload)
      if(res.payload?.success){
        dispatch(useGetCart(user.id))
      }
    })
  };

  const handleDeleteItem = (productId, variationKey) => {
    if(confirm("Are Sure Delete This item?")){
      dispatch(useDeleteCartItem({userId:user.id,variationKey,clearAll:false})).then(res=>{
       if(res.payload?.success){
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                dispatch(useGetCart(user.id))
               }
             else{
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
       }
      })
    }
  };
  
  const handleProceedToCheckout = () => {
    console.log('Proceeding to Checkout...');
  };
  
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
        
        {/*
          --- UPDATED HEADING ---
          - Changed to text-4xl for prominence
          - Added tracking-tight for a modern look
          - Removed the border-b and pb-4 for cleaner spacing
        */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Your Bag is Ready <span className="text-indigo-600">({totalItems} Items)</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8">
            Review your items and proceed to checkout.
        </p>
        
        {/* --- MAIN CONTENT COLUMN --- */}
        <div className="space-y-6">
          
          {/* 1. CART ITEMS LIST */}
          <div className="space-y-4">
            {cartItemsList.map((item) => (
              <CartItemCard 
                // Ensure the key is fully unique
                key={item.productId + '-' + item.variationKey}
                item={item} 
                onUpdateQuantity={handleUpdateQuantity}
                onDelete={handleDeleteItem}
                // Using optional chaining more safely
                productName={item?.productId?.productName || 'Product Name Missing'} 
              />
            ))}
          </div>

          {/* 2. OPTIONAL: Divider before Summary */}

          {/* 3. ORDER SUMMARY (Now placed at the bottom, full width) */}
          <div className="w-full">
            <OrderSummary 
              subtotal={subtotal}
              discount={discount}
              totalItems={totalItems}
              onCheckout={handleProceedToCheckout}
              onClearCart={handleClearAllItems}
            />
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Cart;