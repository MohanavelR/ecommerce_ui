import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice/index'
import categorySlice from './categorySlice/index'
import adminProductsSlice from './productSlice/index'
import bannerSlice from './admin/adbanner'
import comingSoonSlice from './admin/comingsoonSlice'
import sliderSlice from './admin/sliderSlice'
import userSlice from './admin/userSlice'
const store = configureStore({
    reducer:{
       auth:authSlice,
       category:categorySlice,
       adminProducts:adminProductsSlice,
       banner:bannerSlice,
       comingsoon:comingSoonSlice,
       slider:sliderSlice,
       users:userSlice

       
    }
})
export default store