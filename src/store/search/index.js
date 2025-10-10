import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { apiGetSearchProducts } from '../../services/search/service';



const initialState={
    searchProductList:[],
    isLoading:false,
    count:0,
}

// Get All Products
export const useGetAllSearchProducts = createAsyncThunk(
  'search/products',
  async (keyword, thunkAPI) => {
    
    try {
      return await apiGetSearchProducts(keyword);
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
        state.count=0
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
                state.searchProductList =action.payload.success? action?.payload?.data:[];
              
                 state.count =action.payload.success? action?.payload?.count:0
              })
              .addCase(useGetAllSearchProducts.rejected, (state) => {
                state.isLoading = false;
                state.searchProductList =[]

              })
        
    }
})
export const {resetSearchProducts}=searchProductSlice.actions
export default searchProductSlice.reducer