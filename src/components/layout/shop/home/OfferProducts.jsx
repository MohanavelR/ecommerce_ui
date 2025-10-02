import React from 'react'
import HeadingHome from './HeadingHome'
import ProductCarousel from '../ProductCarousel';

const OfferProducts = ({productList,isLoading}) => {
  const offer_products=  (productList && productList.length > 0) ? productList.filter(product=>  product.variations.some(v=>v.offer > 0)):[];
  return (
    <div>
      {
        offer_products.length > 0 && <div>
          <HeadingHome heading={"Offer Products"}/>
          <ProductCarousel products={offer_products}/>
        </div>
      }
    </div>
  )
}

export default OfferProducts