import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice/index'
import categorySlice from './categorySlice/index'
import adminProductsSlice from './productSlice/index'
import bannerSlice from './admin/adbanner'
import comingSoonSlice from './admin/comingsoonSlice'
import sliderSlice from './admin/sliderSlice'
import userSlice from './admin/userSlice'
import shopProductSlice from './shop/index'
import searchProductSlice from './search/index'
import addressSlice from './address/index'
import cartSlice from './cart/index'
import orderSlice from "./order/index"
import reviewSlice  from "./review/index"
import detailsSlice  from "./details/index"

const store = configureStore({
    reducer:{
       auth:authSlice,
       category:categorySlice,
       adminProducts:adminProductsSlice,
       banner:bannerSlice,
       comingsoon:comingSoonSlice,
       slider:sliderSlice,
       users:userSlice,
       filterProducts:shopProductSlice,
       searchProducts:searchProductSlice,
       address:addressSlice,
       cart:cartSlice,
       order:orderSlice,
       review:reviewSlice,
       userDetail:detailsSlice
    }
})
export default store