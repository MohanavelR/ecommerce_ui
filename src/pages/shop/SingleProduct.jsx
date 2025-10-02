import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetProductDetails } from '../../store/shop'
import ProductDetailLoader from '../../components/common/Loaders/ProductDetailLoader'
import ProductDetailView from '../../components/layout/shop/ProductDetailView'

const SingleProduct = () => {
  const {productDetail,isLoading}=useSelector(state=>state.filterProducts)
  const {sku} =useParams()
  console.log(productDetail)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(useGetProductDetails(sku))
  },[])
  if(isLoading){
    return <ProductDetailLoader/>
  }
  return (
    <div>
      {
        isLoading?<ProductDetailLoader/>:<ProductDetailView isLoading={isLoading} product={productDetail} />
      }
    </div>
  )
}

export default SingleProduct
