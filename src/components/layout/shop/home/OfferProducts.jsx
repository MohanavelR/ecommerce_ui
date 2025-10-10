import React from 'react'
import HeadingHome from './HeadingHome'
import ProductCarousel from '../ProductCarousel';

const OfferProducts = ({products,isLoading}) => {
 
    return (
    <div>
      {
        products.length > 0 && <div>
          <HeadingHome heading={"Offer Products"}/>
          <ProductCarousel products={products}/>
        </div>
      }
    </div>
  )
}

export default OfferProducts