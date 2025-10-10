import React from 'react'
import ShopCarousel from '../../layouts/shop/ShopCarousel'
import { useSelector } from 'react-redux'
import HomeCategory from '../../components/layout/shop/home/HomeCategory'
import FeatureProducts from '../../components/layout/shop/home/FeatureProducts'
import OfferProducts from '../../components/layout/shop/home/OfferProducts'
import TrendingProducts from '../../components/layout/shop/home/TrendingProducts'
import ServicePromiseBar from '../../components/layout/shop/home/ServicePromiseBar'
import TrustBadgesSection from '../../components/layout/shop/home/TrustBadgeSection'
import TestimonialsCarousel from '../../components/layout/shop/home/TestimonialsCarousel'
import HeadingHome from '../../components/layout/shop/home/HeadingHome'
import AboutSection from '../../components/layout/shop/about/AboutSection'
const Home = () => {
  const {categoryList,isLoading}=useSelector(state=>state.category)
    const {featureProducts,offerProducts,trendingProducts,isLoading:productLoading}=useSelector(state=>state.related)

  
  return (
    <div >
   <ShopCarousel/>
   <ServicePromiseBar/>
   <HomeCategory categories={categoryList}/>
   <OfferProducts products={offerProducts} isLoading={productLoading}  />
   <TrendingProducts products={trendingProducts} isLoading={productLoading}  />
   <FeatureProducts products={featureProducts} isLoading={productLoading}  />
   <AboutSection/>
   
   <TestimonialsCarousel/>
    </div>
  )
}

export default Home
