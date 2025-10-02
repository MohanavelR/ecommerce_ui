import React from 'react'
import HeadingHome from './HeadingHome'
import ProductCarousel from '../ProductCarousel';

const TrendingProducts = ({productList,isLoading}) => {
    const trending_products=(productList && productList.length > 0)
  ? productList.filter(product => (product.isTrending))
  : [];
  return (
    <div>
      {
        trending_products && <div>
          <HeadingHome heading={"Trending Products"}/>
          <ProductCarousel products={trending_products} />
        </div>
      }
    </div>
  )
}

export default TrendingProducts