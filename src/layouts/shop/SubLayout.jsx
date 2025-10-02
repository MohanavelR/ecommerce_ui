import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopComingSoonPoster from './ShopComingSoonPoster'
import ShopHeader from '../../components/layout/shop/ShopHeader'
import ShopFooter from '../../components/layout/shop/ShopFooter'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import ShopPageLayoutLoader from '../../components/common/Loaders/ ShopPageLayoutLoader'
import ShopBannerCarousel from '../../components/layout/shop/ShopBannerCarousel'
import store from "../../store/store"
const SubLayout = () => {
 // SubLayout.jsx
console.log("sublayout",store.getState().searchProducts.searchProducts)
// 1. Select the specific slice of state directly.
const category = useSelector(state => state.category);
const auth = useSelector(state => state.auth);
const adminProducts = useSelector(state => state.adminProducts);
const banner = useSelector(state => state.banner);
const comingsoon = useSelector(state => state.comingsoon);
const slider = useSelector(state => state.slider);
const users = useSelector(state => state.users);
// const filterProducts = useSelector(state => state.filterProducts);
// 2. Destructure and rename the isLoading property from each slice.
const { isLoading: categoryLoader } = category;
const { isLoading: adminProductsLoader } = adminProducts;
const { isLoading: bannerLoader } = banner;
const { isLoading: comingSoonLoader } = comingsoon;
const { isLoading: sliderLoader } = slider;
const { isLoading: usersLoader } = users;
const { isLoading: authLoader } =auth;
 const combinedLoader =
    categoryLoader ||
    adminProductsLoader ||
    bannerLoader ||
    comingSoonLoader ||
    sliderLoader ||
    usersLoader|| authLoader 

 if(combinedLoader){
  return <ShopPageLayoutLoader/>
 }

  return (
 <>
  <div >
  <ShopComingSoonPoster />
  
  <div className="min-h-screen overflow-hidden flex flex-col">
    <ShopHeader />
    
    {/* This <main> element takes up ALL remaining vertical space */}
    <main className="flex-grow py-5 px-1 sm:px-3 lg:px-4">
      
      {/* This wrapper is the crucial fix: 
        It forces the content area (where <Outlet /> renders) 
        to stretch and fill the entire height of the <main> element.
      */}
      <div className="flex flex-col flex-grow">
        <Outlet />
      </div>
      
    </main>
    
    {/* The Footer */}
    <ShopFooter />
  </div>
</div>
</>
  )
}

export default SubLayout
