import React from 'react'
import HeadingHome from './HeadingHome'
import ProductCarousel from '../ProductCarousel';

const TrendingProducts = ({products,isLoading}) => {


  return (
    <div>
      {
        products.length > 0 && <div>
          <HeadingHome heading={"Trending Products"}/>
          <ProductCarousel products={products} />
        </div>
      }
    </div>
  )
}

export default TrendingProducts