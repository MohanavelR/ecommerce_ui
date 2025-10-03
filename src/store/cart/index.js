// store/cart/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiAddToCart,
  apiGetCart,
  apiUpdateCart,
  apiDeleteCartItem,
} from "../../services/cart/service";

// ---------------- State ----------------
const initialState = {
  isLoading: false,
  cartItems: null,
  count:0
};

// ---------------- Thunks ----------------

// Add Item to Cart
export const useAddToCart = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    try {
      return await apiAddToCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useGetCart = createAsyncThunk(
  "cart/get",
  async (userId, thunkAPI) => {
    try {
      return await apiGetCart(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Cart Item
export const useUpdateCart = createAsyncThunk(
  "cart/update",
  async (data, thunkAPI) => {
    try {
      return await apiUpdateCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Cart Item or Clear Cart
export const useDeleteCartItem = createAsyncThunk(
  "cart/delete",
  async (data, thunkAPI) => {
    try {
      return await apiDeleteCartItem(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // optional local reducers if needed
    clearCartState: (state) => {
      state.cart = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Add to Cart
    builder
      .addCase(useAddToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useAddToCart.rejected, (state, action) => {
        state.isLoading = false;
        
      });

    // Get Cart
    builder
      .addCase(useGetCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data || null;
        
        state.count = action.payload?.count || 0;
      })
      .addCase(useGetCart.rejected, (state, action) => {
        state.isLoading = false;
        
      });

    // Update Cart
    builder
      .addCase(useUpdateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload?.data || state.cart;
      })
      .addCase(useUpdateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Delete Cart Item
    builder
      .addCase(useDeleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload?.data || state.cart;
      })
      .addCase(useDeleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
