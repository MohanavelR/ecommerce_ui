import React from 'react'
import ProductCarousel from '../ProductCarousel';
import { useSelector } from 'react-redux';
import HeadingHome from './HeadingHome';

const FeatureProducts = ({products,isLoading}) => {
    return (
    <div>
      {
        products.length >0 && <div>

          <HeadingHome heading={"Feature Products"}/>
          <ProductCarousel products={products}/>
        </div>
      }
    </div>
  )
}

export default FeatureProducts