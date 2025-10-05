import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetProductDetails } from '../../store/shop'
import ProductDetailLoader from '../../components/common/Loaders/ProductDetailLoader'
import ProductDetailView from '../../components/layout/shop/ProductDetailView'
import { useAddToCart, useGetCart } from '../../store/cart'
import { MessageContext } from '../../context/context'

const SingleProduct = () => {
  const {productDetail,isLoading}=useSelector(state=>state.filterProducts)
  const {user}=useSelector(state=>state.auth)
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const {sku} =useParams()
  const dispatch=useDispatch()
  async function handleAddToCart(productId,variation,quantity=1) {
    if(user.isVerified){
      dispatch(useAddToCart({userId:user.id,productId,variation,quantity})).then(res=>{
       if(res.payload?.success){
          setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
          dispatch(useGetCart(user.id))
         }
       else{
   setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
       }
      })
    }
    else{
        setMessageContextState({...messageContextState,is_show:true,text:"Please Verify Your Account",success:false
        
        })
    }
  }
  useEffect(()=>{
    dispatch(useGetProductDetails(sku))
  },[])
  if(isLoading){
    return <ProductDetailLoader/>
  }
  return (
    <div>
      {
        isLoading?<ProductDetailLoader/>:<ProductDetailView handleAddToCart={handleAddToCart} isLoading={isLoading} product={productDetail} />
      }
    </div>
  )
}

export default SingleProduct
