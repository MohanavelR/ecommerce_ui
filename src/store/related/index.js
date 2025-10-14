import { apiOfGetGroupedProducts, apiOfGetRelatedProducts } from "../../services/related/service";

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
const initialState = {
 counts:[],
 isLoading:false,
 relatedProductCount:0,
  // 👇 new states
  featureProducts: [],
  offerProducts: [],
  trendingProducts: [],
  relatedProducts: [],
  relatedProductDetails:{
  page:1,
  currentCount:0,
  totalCount:0,
  totalPages:0,
  }
};
// Get Grouped Products (feature, offer, trending)
export const useGetGroupedProducts = createAsyncThunk(
  "/related/getGrouped",
  async (_, thunkAPI) => {
    try {
      return await apiOfGetGroupedProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Related Products by Category
export const useGetRelatedProducts = createAsyncThunk(
  "/related/getRelated",
  async ({ category, excludeSku = "" ,page=1,limit=10}, thunkAPI) => {
    try {
      return await apiOfGetRelatedProducts(category, excludeSku,page,limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const relatedSlice=createSlice({
    initialState,
    name:'related',
    extraReducers:(builder)=>{
        // ---------------- Grouped Products ----------------
builder
  .addCase(useGetGroupedProducts.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(useGetGroupedProducts.fulfilled, (state, action) => {
    state.isLoading = false;
    const data = action.payload;

    if (data?.success) {
      state.featureProducts = data.featureProducts || [];
      state.offerProducts = data.offerProducts || [];
      state.trendingProducts = data.trendingProducts || [];
      state.counts=data?.counts||[]
    }
  })
  .addCase(useGetGroupedProducts.rejected, (state) => {
    state.isLoading = false;

  });

// ---------------- Related Products ----------------
builder
  .addCase(useGetRelatedProducts.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(useGetRelatedProducts.fulfilled, (state, action) => {
    state.isLoading = false;
    console.log(action.payload)
    if (action.payload?.success) {
      state.relatedProducts = action.payload.data || [];
      state.relatedProductDetails.totalCount = action.payload?.totalCount;
      state.relatedProductDetails.currentCount=action.payload?.currentCount
      state.relatedProductDetails.page=action.payload?.page
      state.relatedProductDetails.totalPages=action.payload?.totalPages
    }
  })
  .addCase(useGetRelatedProducts.rejected, (state) => {
    state.isLoading = false;
    state.relatedProducts = [];
  });

    }
})

export default relatedSlice.reducer