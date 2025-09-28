import React from 'react'
import ShopCarousel from '../../layouts/shop/ShopCarousel'
import ShopBannerCarousel from '../../components/layout/shop/ShopBannerCarousel'
import { useSelector } from 'react-redux'
import HomeCategory from '../../components/layout/shop/home/HomeCategory'
import FeatureProducts from '../../components/layout/shop/home/FeatureProducts'
const Home = () => {
  const {categoryList}=useSelector(state=>state.category)

  return (
    <div >
   <ShopCarousel  />
   <ShopBannerCarousel/>
   <HomeCategory categories={categoryList}/>
   <FeatureProducts />
{/* <ShopCard/>  */}
{/* <LoadingCircle/> */}
{/* <ProductDetailLoader/> */}
{/* <ProductDetailView/> */}
{/* <ProductCarouselStrip/>
<ProductCarouselStrip/>
<ProductCarouselStrip/> */}
{/* <div className="flex">

<ProductFilterSidebar/>

</div> */}
    </div>
  )
}

export default Home
