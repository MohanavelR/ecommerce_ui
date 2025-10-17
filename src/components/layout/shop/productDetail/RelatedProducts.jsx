import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetRelatedProducts } from '../../../../store/related'
import Loader from '../../../common/Loader'
import RelatedProductsView from './RelatedProductsView'
import Pagination from '../../../common/Pagination'
import { useNavigate } from 'react-router-dom'

const RelatedProducts = ({productDetail}) => {
  const navigate=useNavigate()
  const {relatedProducts,isLoading,relatedProductDetails}=useSelector(state=>state.related)
  const [currentPage,setCurrentPage]=useState(relatedProductDetails.page)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(productDetail?.sku){
        dispatch(useGetRelatedProducts({category:productDetail?.category, excludeSku:productDetail.sku,page:currentPage,limit:10}))
    }
    const searchParams = new URLSearchParams(location.search);
    if(currentPage > 1){
      searchParams.set("page", currentPage); // set current page
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
    else{
    searchParams.delete("page")
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  },[productDetail,dispatch,currentPage])
  useEffect(()=>{
    setCurrentPage(1)
  },[productDetail])
  return (
    <div>
      {
        isLoading?<Loader/>:<RelatedProductsView totalCount={relatedProductDetails.totalCount} products={relatedProducts} />
      }
      <Pagination currentPage={currentPage} totalPages={relatedProductDetails.totalPages} onPageChange={setCurrentPage}/>
    </div>
  )
}

export default RelatedProducts
