import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilterProducts, getProductDetail, getProductsByCategory, getProductsByCategoryAndSubcategory } from '../../services/shop/service';

const initialState = {
  filterProducts: [],
  isLoading: false,
  count: 0,
  productDetail: null,
  categoryByProducts: [],
  subcategoryByProducts: [],
  isError: false
};

// Existing Thunks
export const useGetFilterProducts = createAsyncThunk(
  'products/getfilter',
  async ({ filterParams, sortParams }, thunkAPI) => {
    try {
      return await getFilterProducts({ filterParams, sortParams });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const useGetProductDetails = createAsyncThunk(
  'products/getproductDetails',
  async (sku, thunkAPI) => {
    try {
      return await getProductDetail(sku);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 🔹 New Thunks for Category
export const useGetCategoryProducts = createAsyncThunk(
  'products/getCategoryProducts',
  async (category, thunkAPI) => {
    try {
      return await getProductsByCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const useGetCategorySubProducts = createAsyncThunk(
  'products/getCategorySubProducts',
  async ({ category, subCategory }, thunkAPI) => {
    try {
      return await getProductsByCategoryAndSubcategory(category, subCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Slice
const shopProductSlice = createSlice({
  name: 'shopProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(useGetFilterProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetFilterProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.filterProducts = action.payload?.success ? action.payload?.data : [];
        state.count = action.payload?.success ? action.payload?.count : 0;
      })
      .addCase(useGetFilterProducts.rejected, (state) => {
        state.isLoading = false;
        state.filterProducts = [];
      })

      // Get Product Details
      .addCase(useGetProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetail = action.payload?.product || null;
      })
      .addCase(useGetProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetail = null;
      })

      // Get Category Products
      .addCase(useGetCategoryProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetCategoryProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryByProducts = action.payload?.success ? action.payload?.data : [];
      })
      .addCase(useGetCategoryProducts.rejected, (state) => {
        state.isLoading = false;
        state.categoryByProducts = [];
      })


      .addCase(useGetCategorySubProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetCategorySubProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategoryByProducts = action.payload?.success ? action.payload?.data : [];
      })
      .addCase(useGetCategorySubProducts.rejected, (state) => {
        state.isLoading = false;
        state.subcategoryByProducts = [];
      });
  }
});

export default shopProductSlice.reducer;
