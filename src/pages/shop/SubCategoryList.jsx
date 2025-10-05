import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 

import ShopCard from '../../components/layout/shop/products/ShopCard';

import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner';
import { useGetCategorySubProducts } from '../../store/shop';
import HomeShopCard from '../../components/layout/shop/HomeShopCard';

const GridLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {[...Array(10)].map((_, i) => (
      <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg shadow-lg"></div>
    ))}
  </div>
);

const SubCategoryList = () => {
  const { categoryName, subCategoryName } = useParams();
  const dispatch = useDispatch();
  const category=categoryName.replaceAll("-"," ")
  const subCategory=categoryName.replaceAll("-"," ")

  const { isLoading, subcategoryByProducts } = useSelector(state => state.filterProducts);

  

  // Calculate the product count for display
  const productCount = subcategoryByProducts ? subcategoryByProducts.length : 0;
  
  // Create the main heading title
  const pageTitle = subCategoryName ? `${category} → ${subCategory}` : category;

  useEffect(() => {
    if (subCategoryName) {
      dispatch(useGetCategorySubProducts({ categoryName, subCategoryName }));
    } 
  }, [dispatch, categoryName, subCategoryName]); // Added 'category' to dependency array

  // Loader
  if (isLoading) {
    return (
      <div className="py-8">
        <h1 className="text-3xl capitalize font-bold mb-6 text-gray-800">
          {pageTitle}
        </h1>
        <GridLoader />
      </div>
    );
  }

  return (
    <>
      <BreadcrumbBanner 
        pageTitle={subCategory} 
        currentPage={subCategory} 
      />
      {
        (!subcategoryByProducts || subcategoryByProducts.length === 0) ? (
          <div className="text-center py-20">
            <h1 className="text-3xl  font-bold mb-4 text-gray-800">
              No products found in "{subCategory }"
            </h1>
            <p className="text-gray-500">Please check back later or try a different {subCategory ? "subcategory" : "category"}.</p>
          </div>
        ) : (
          <div className="py-5">
            {/* Updated Heading with Product Count */}
            <h1 className="text-3xl capitalize font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8 border-b border-accent pb-2">
              {pageTitle} 
              <span className="text-xl font-medium text-gray-600"> Products ({productCount})</span>
            </h1>

            <div className="grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 sm:gap-x-2 lg:gap-x-4 md:grid-cols-4 lg: 2xl:grid-cols-5">
              {subcategoryByProducts.map(product => (
                <HomeShopCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )
      }
    </>
  );
};

export default SubCategoryList;