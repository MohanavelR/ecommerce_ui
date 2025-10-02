import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Ensure your ShopCard is correctly imported here
import ShopCard from '../../components/layout/shop/products/ShopCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { resetSearchProducts, useGetAllSearchProducts } from '../../store/search';
import Loader from '../../components/common/Loader';
import NotFound from '../../components/common/NotFound';
import NotSearch from '../../components/layout/shop/search/NotSearch';
import HomeShopCard from '../../components/layout/shop/HomeShopCard';


// --- MAIN SEARCH LAYOUT COMPONENT ---
const Search = () => {
    const [searchTerm, setSearchTerm] = useState();
    const dispatch=useDispatch()
    const {searchProductList,count,isLoading}=useSelector(state=>state.searchProducts)
    
function handleSearch(keyword){
    setSearchTerm(keyword)
    if(keyword.trim().length >= 3){
    setTimeout(()=>{
        dispatch(useGetAllSearchProducts (keyword.trim())).then(res=>{
            console.log("res",res)
        })
    },1000)
}
else{
     setSearchTerm(keyword)
    dispatch(resetSearchProducts())
}
}

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 1. New Search Bar Design (Integrated & Bordered) */}
                <div
                    
                    className="flex items-center w-full max-w-5xl mx-auto mb-10 p-1.5 bg-white border border-gray-300 rounded-lg shadow-md focus-within:border-primary focus-within:shadow-indigo-200/50 transition-all duration-300"
                >
                    <div className="relative flex-1">
                        <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="search"
                            
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search products, brands, or categories..."
                            className="w-full text-lg py-3 pl-12 pr-4 outline-none focus:ring-0 border-none bg-transparent placeholder:text-gray-400 text-gray-800"
                        />
                    </div>
                    
                    {/* Search Button (Solid, but not pill-shaped anymore) */}
                    <button
                        type="submit"
                        className="flex-shrink-0 btn-hero  text-white text-base font- py-3 px-6 rounded-md ml-2 
                                    transition-colors duration-200 active:scale-95"
                        aria-label="Execute Search"
                    >
                        Search
                    </button>
                </div>

                {
                    isLoading?<Loader/>:
               <div>
                <header className="mb-8 border-b border-accent pb-4">
                    <p className="text-2xl font-semibold text-gray-800">
                        Search Results
                    </p>
                    <p className="text-md text-gray-600 mt-1">
                        Showing <span className="font-bold text-indigo-600">{count}</span> results for "<span className="font-medium text-gray-900">{searchTerm}</span>"
                    </p>
                </header>
                
                <div className="grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 sm:gap-x-2 lg:gap-x-4 md:grid-cols-4 lg: 2xl:grid-cols-5">
                    {(searchProductList && searchProductList.length > 0) ? (
                        searchProductList.map(product => (
                            <HomeShopCard key={product._id} product={product} />
                        ))
                    ) : <NotSearch/>}
                </div>
               </div>     
                }
            </div>
        </div>
    );
};

export default Search;