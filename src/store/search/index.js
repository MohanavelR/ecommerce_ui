import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { apiGetSearchProducts } from '../../services/search/service';



const initialState={
    searchProductList:[],
    isLoading:false,
    page:1,
    currentCount:0,
    totalCount:0,
    totalPages:0,
}

// Get All Products
export const useGetAllSearchProducts = createAsyncThunk(
  'search/products',
  async ({keyword,page=1,limit=12}, thunkAPI) => {
    
    try {
      return await apiGetSearchProducts(keyword,page,limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchProductSlice=createSlice({
    initialState,
    name:"searchProducts",
    reducers:{
      resetSearchProducts:(state)=>{
        state.searchProductList=[]
        state.totalCount = 0;
        state.currentCount=0
        state.page=1
        state.totalPages=0
      }
    },
    extraReducers:(builder)=>{
        builder 
        // Get All Products
              .addCase(useGetAllSearchProducts.pending, (state) => {
                state.isLoading = true;
                
              })
              .addCase(useGetAllSearchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.success) {
      state.searchProductList =action.payload.success? action?.payload?.data:[];
      state.totalCount = action.payload?.totalCount;
      state.currentCount=action.payload?.currentCount
      state.page=action.payload?.page
      state.totalPages=action.payload?.totalPages
    }
               
              })
              .addCase(useGetAllSearchProducts.rejected, (state) => {
                state.isLoading = false;
                state.searchProductList =[]

              })
        
    }
})
export const {resetSearchProducts}=searchProductSlice.actions
export default searchProductSlice.reducer