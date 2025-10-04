import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAddressesByUser } from '../../store/address';
import AddressSection from '../../components/layout/shop/checkout/AddressSection';
import AddressContainer from '../../components/layout/shop/profile/AddressContainer';
import CartItemsContainer from '../../components/layout/shop/cart/CartItemsContainer';
import OrderSummary from '../../components/layout/shop/cart/orderSummary';
import { useCreateOrder } from '../../store/order';
import { MessageContext } from '../../context/context';

// --- Structural Component ---
const Checkout = () => {
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

 
    const dispatch=useDispatch()
    const {user}=useSelector(state=>state.auth)
    const {cartItems}=useSelector(state=>state.cart)
    const [addressId,setAddressId]=useState(null)
    const cartItemsList=cartItems?.items || []
    const { subtotal, discount, totalItems } = calculateTotals(cartItemsList);
    const shippingCost=0
    const total = subtotal + shippingCost;
    const {messageContextState,setMessageContextState}=useContext(MessageContext)
    
useEffect(()=>{
    dispatch(useGetAddressesByUser(user.id))
},[])

function handleCheckOut(){
    if(addressId){
        const data={
            userId:user.id, cartId:cartItems._id, addressId, paymentMethods:"Paypal", paymentId:null, payerId:null 
        }
        dispatch(useCreateOrder(data)).then(res=>{
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
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
            
           

            <div className="max-w-7xl mx-auto">
                
                {/* Page Title */}
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                    Checkout 🛒
                </h1>
                
                {/* Main Content Area (Address & Cart Items) */}
                <div className="space-y-8">

                    {/* -------------------- 1. Address Selection Section -------------------- */}
                   <AddressContainer isSeletedMode={true} setIdOfAddress={setAddressId} />

                    {/* -------------------- 2. Cart Items Review Section -------------------- */}
                    <section className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">2. Review Items</h2>
                        <CartItemsContainer cartItems={cartItems} />
                    </section>
                </div>
                
                {/* -------------------- 3. Order Summary (Moved to Bottom) -------------------- */}
               <div className="mt-8">
                     <OrderSummary 
              subtotal={subtotal}
              discount={discount}
              totalItems={totalItems}
              total={total}
              onCheckout={handleCheckOut}
            //   onClearCart={handleClearAllItems}
            />
            <button 
            onClick={handleCheckOut}
            
            className="w-full mt-6 py-3 disabled:cursor-not-allowed bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={total <= 0 || !addressId} // Disable if cart total is zero
        >
            Proceed to Checkout
        </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;