import React from 'react'
import ProductCarousel from '../ProductCarousel';
import { useSelector } from 'react-redux';
import HeadingHome from './HeadingHome';

const FeatureProducts = ({productList,isLoading}) => {
   const feature_products = (productList && productList.length > 0) ? productList.filter(product=> !product.isTrending && product.variations.every(v=>v.offer < 0)):[];
  
  return (
    <div>
      {
        feature_products.length >0 && <div>

          <HeadingHome heading={"Feature Products"}/>
          <ProductCarousel products={feature_products}/>
        </div>
      }
    </div>
  )
}

export default FeatureProducts