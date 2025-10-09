import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiOfCreateProduct,
  apiOfGetAllProducts,
  apiOfGetProductById,
  apiOfGetProductsBySubcategory,
  apiOfUpdateProduct,
  apiOfDeleteProduct,
} from "../../services/product/service";

// ---------------- State ----------------
const initialState = {
  isLoading: false,
  productList: null,
  productDetails: null,
  currentCount:0,
  totalCount:0,
  totalPages:0,
  page:1
};

// ---------------- Thunks ----------------
// Create Product
export const useCreateProduct = createAsyncThunk(
  "/product/create",
  async (data, thunkAPI) => {
    try {
      return await apiOfCreateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get All Products
export const useGetAllProducts = createAsyncThunk(
  "/product/getAll",
  async ({page,limit,keyword=""}, thunkAPI) => {
    try {
      return await apiOfGetAllProducts(page,limit,keyword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Product by ID
export const useGetProductById = createAsyncThunk(
  "/product/getById",
  async (id, thunkAPI) => {
    try {
      return await apiOfGetProductById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Products by Subcategory
export const useGetProductsBySubcategory = createAsyncThunk(
  "/product/getBySubcategory",
  async (subCategory, thunkAPI) => {
    try {
      return await apiOfGetProductsBySubcategory(subCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Product
export const useUpdateProduct = createAsyncThunk(
  "/product/update",
  async ({id,data}, thunkAPI) => {
    try {
      return await apiOfUpdateProduct(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Product
export const useDeleteProduct = createAsyncThunk(
  "/product/delete",
  async (id, thunkAPI) => {
    try {
      return await apiOfDeleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.productDetails = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(useCreateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useCreateProduct.rejected, (state) => {
        state.isLoading = false;
      });

    // Get All
    builder
      .addCase(useGetAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        if(action.payload?.success){

          state.productList = action.payload?.data ;
          state.totalCount = action.payload?.totalCount;
          state.currentCount=action.payload?.currentCount
          state.page=action.payload?.page
          state.totalPages=action.payload?.totalPages
        }

      })
      .addCase(useGetAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = null;
      });

    // Get by ID
    builder
      .addCase(useGetProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload?.success
          ? action.payload?.data
          : null;
      })
      .addCase(useGetProductById.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });

    // Get by Subcategory
    builder
      .addCase(useGetProductsBySubcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetProductsBySubcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.success ? action.payload?.data : [];
      })
      .addCase(useGetProductsBySubcategory.rejected, (state) => {
        state.isLoading = false;
        state.productList = null;
      });

    // Update
    builder
      .addCase(useUpdateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useUpdateProduct.rejected, (state) => {
        state.isLoading = false;
      });

    // Delete
    builder
      .addCase(useDeleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useDeleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
