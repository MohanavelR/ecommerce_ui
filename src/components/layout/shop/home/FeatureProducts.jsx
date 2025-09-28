import React from 'react'
import ProductCarousel from '../ProductCarousel';
import { useSelector } from 'react-redux';

const FeatureProducts = () => {
    const {productList,isLoading} = useSelector(state => state.adminProducts);
   const feature_products = (productList && productList.length > 0)
  ? productList.filter(product => (product.offer === "0" || !product.offer) && !product.isTrending)
  : [];
  console.log(productList)
  return (
    <div>
<div className="flex items-center justify-center space-x-2 py-4">
    {/* Left Line - Thinner and lighter color */}
    <div className="flex-grow border-t border-gray-400 max-w-5 md:max-w-20"></div>
    
    {/* Text - Slightly smaller, less aggressive */}
    <div className="text-2xl font-semibold text-gray-700 whitespace-nowrap">
        <span className='font-light italic text-primary'>Our</span> Featured Products
    </div>
    
    {/* Right Line */}
    <div className="flex-grow border-t border-gray-400 max-w-5 md:max-w-20"></div>
</div>  

   <ProductCarousel products={feature_products}/>
    </div>
  )
}

export default FeatureProducts