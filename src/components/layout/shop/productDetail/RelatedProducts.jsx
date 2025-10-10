import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetRelatedProducts } from '../../../../store/related'
import Loader from '../../../common/Loader'
import RelatedProductsView from './RelatedProductsView'

const RelatedProducts = ({productDetail}) => {
  const {relatedProducts,isLoading}=useSelector(state=>state.related)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(productDetail?.sku){
        dispatch(useGetRelatedProducts({category:productDetail?.category, excludeSku:productDetail.sku}))
    }
  },[productDetail,dispatch])
  return (
    <div>
      {
        isLoading?<Loader/>:<RelatedProductsView products={relatedProducts} />
      }
    </div>
  )
}

export default RelatedProducts
