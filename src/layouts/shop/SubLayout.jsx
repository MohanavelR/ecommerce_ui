import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopComingSoonPoster from './ShopComingSoonPoster'
import ShopHeader from '../../components/layout/shop/ShopHeader'
import ShopFooter from '../../components/layout/shop/ShopFooter'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import ShopPageLayoutLoader from '../../components/common/Loaders/ ShopPageLayoutLoader'
import ShopBannerCarousel from '../../components/layout/shop/ShopBannerCarousel'

const SubLayout = () => {
 // SubLayout.jsx

// 1. Select the specific slice of state directly.
const category = useSelector(state => state.category);
const adminProducts = useSelector(state => state.adminProducts);
const banner = useSelector(state => state.banner);
const comingsoon = useSelector(state => state.comingsoon);
const slider = useSelector(state => state.slider);
const users = useSelector(state => state.users);
// 2. Destructure and rename the isLoading property from each slice.
const { isLoading: categoryLoader } = category;
const { isLoading: adminProductsLoader } = adminProducts;
const { isLoading: bannerLoader } = banner;
const { isLoading: comingSoonLoader } = comingsoon;
const { isLoading: sliderLoader } = slider;
const { isLoading: usersLoader } = users;

 const combinedLoader =
    categoryLoader ||
    adminProductsLoader ||
    bannerLoader ||
    comingSoonLoader ||
    sliderLoader ||
    usersLoader;

 if(combinedLoader){
  return <ShopPageLayoutLoader/>
 }

  return (
    <>
       <ShopComingSoonPoster/>
      <div className="min-h-screen flex flex-col">
        <ShopHeader />
        <main className="flex-grow py-5 px-1 sm:px-3 lg:px-4">
          <Outlet />
        </main>
        <ShopFooter />
      </div> 
    </>
  )
}

export default SubLayout
