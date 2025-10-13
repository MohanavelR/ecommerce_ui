import React, { useContext, useState } from 'react'
import CartItemCard from './CartCard'
import { useDeleteCartItem, useGetCart, useUpdateCart } from '../../../../store/cart';
import { useDispatch, useSelector } from 'react-redux';
import { MessageContext } from '../../../../context/context';

const CartItemsContainer = ({cartItems}) => {
   const {isLoading } = useSelector(state => state.cart);
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const {user}=useSelector(state=>state.auth)
  const cartItemsList = cartItems?.items || [];
  const [addCartIndex,setAddCartIndex]=useState(null)
  const dispatch=useDispatch()
  // Handler functions
  const handleUpdateQuantity = (productId, variationKey,quantity,action) => {
    dispatch(useUpdateCart({productId,variationKey,quantity,action,userId:user.id})).then(res=>{
  
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
  return (
    <div>
        <div className="space-y-4">
                    {cartItemsList.map((item,index) => (
                      <CartItemCard 
                        // Ensure the key is fully unique
                        key={item.productId + '-' + item.variationKey}
                        item={item} 
                        index={index}
                        isLoading={isLoading}
                        onUpdateQuantity={handleUpdateQuantity}
                        onDelete={handleDeleteItem}
                        addCartIndex={addCartIndex}
                        setAddCartIndex={setAddCartIndex}
                        // Using optional chaining more safely
                        productName={item?.productId?.productName || 'Product Name Missing'} 
                      />
                    ))}
                  </div>
    </div>
  )
}

export default CartItemsContainer