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
  async ({ category, excludeSku = "" }, thunkAPI) => {
    try {
      return await apiOfGetRelatedProducts(category, excludeSku);
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
      state.relatedProducts = action.payload.relatedProducts || [];
      state.relatedProductCount=action.payload.count|| 0
    }
  })
  .addCase(useGetRelatedProducts.rejected, (state) => {
    state.isLoading = false;
    state.relatedProducts = [];
  });

    }
})

export default relatedSlice.reducer