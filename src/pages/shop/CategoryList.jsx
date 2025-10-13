import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 



import { useGetCategoryProducts } from '../../store/shop';
import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner';
import HomeShopCard from '../../components/layout/shop/HomeShopCard';
import Loader from '../../components/common/Loader';


const GridLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg shadow-lg"></div>
    ))}
  </div>
);

const CategoryList = () => {
 
  const { categorySKU } = useParams();
  const dispatch = useDispatch();


  const {isLoading,categoryByProducts} = useSelector(state => state.filterProducts);


  // Calculate the product count for display
  const productCount = categoryByProducts ? categoryByProducts.length : 0;
 const category=categorySKU.replaceAll("-"," ")
  useEffect(() => {
    if (categorySKU) {
      dispatch(useGetCategoryProducts(categorySKU));
    }
  }, [dispatch, categorySKU]);

  // --- Rendering Logic ---

  if (isLoading) {
    return (
      <div className="py-8">
  <Loader/>
        <GridLoader />
      </div>
    );
  }


  // if  {
  //   return (
  //    
  //   );
  // }

  return (
    <>
    <BreadcrumbBanner pageTitle={category} currentPage={category}/>
{
(!categoryByProducts|| categoryByProducts.length === 0) ?
   
 <div className="text-center py-20">
      <h1 className="text-3xl capitalize font-bold mb-4 text-gray-800">
          No products found in "{category}"
       </h1>
       <p className="text-gray-500">Please check back later or try a different category.</p>
      </div>
    :
    (
       <div className="py-5">
      <div>
      {/* Updated Category Heading with Product Count */}
      <h1 className="text-3xl font-extrabold capitalize tracking-tight text-gray-900 sm:text-4xl mb-8 border-b border-accent  pb-2">
        {category} <span className="text-xl font-medium text-gray-600">Products ({productCount})</span>
      </h1>

      </div>
      {/* Category Heading */}

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-x-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2 lg:gap-x-4 md:grid-cols-3 lg: lg:grid-cols-4">
        
        {categoryByProducts.map(product => (
          <HomeShopCard 
            key={product._id} 
            product={product} 
          />
        ))}

      </div>
    </div>
    )
}
    </>
  );
};

export default CategoryList;