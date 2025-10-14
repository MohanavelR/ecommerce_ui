import React from 'react'
import HomeShopCard from '../HomeShopCard'

const RelatedProductsView = ({products,totalCount}) => {
  return (
    <div>
        {
            products.length > 0 &&
        // Changed the main container's styling for better spacing and maximum width
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            
            {/* Improved the heading's typography and spacing */}
            <h2 className='md:text-3xl text-lg  font-extrabold text-gray-900 tracking-tight mb-8 border-b border-accent pb-2 inline-block'>
                Related Products  ({totalCount})
            </h2>
            
            {/* Enhanced the grid for more columns on larger screens and better spacing between cards */}
            <div className="grid grid-cols-1 justify-items-center sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
                {
                    products.map(product => (
                        // Added a key for better React performance and stability
                        <HomeShopCard key={product.id} product={product} /> 
                    ))
                }
            </div>

        </div>
        }
    </div>
  )
}

export default RelatedProductsView