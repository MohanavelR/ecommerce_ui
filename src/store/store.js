import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice/index'
import categorySlice from './categorySlice/index'
import adminProductsSlice from './productSlice/index'
const store = configureStore({
    reducer:{
       auth:authSlice,
       category:categorySlice,
       adminProducts:adminProductsSlice
    }
})
export default store