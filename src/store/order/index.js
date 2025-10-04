import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCreateOrder,
  apiDeleteOrder,
  apiGetUserOrders,
  apiGetAllOrders,
  apiGetOrderById,
  apiUpdateOrderStatus,
  apiCancelledOrder,
} from "../../services/order/service";

// ---------------- State ----------------
const initialState = {
  isLoading: false,
  orderList: [],      // ✅ all orders (admin)
  ordersByUser: [],   // ✅ orders of specific user
  orderDetails: null, // ✅ single order
  count:0
};

// ---------------- Thunks ----------------

// Create Order
export const useCreateOrder = createAsyncThunk(
  "order/create",
  async (data, thunkAPI) => {
    try {
      return await apiCreateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Order
export const useDeleteOrder = createAsyncThunk(
  "order/delete",
  async (data, thunkAPI) => {
    try {
      return await apiDeleteOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get User Orders
export const useGetUserOrders = createAsyncThunk(
  "order/get_user",
  async (userId, thunkAPI) => {
    try {
      return await apiGetUserOrders(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get All Orders (Admin)
export const useGetAllOrders = createAsyncThunk(
  "order/get_all",
  async (_, thunkAPI) => {
    try {
      return await apiGetAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Order by ID
export const useGetOrderById = createAsyncThunk(
  "order/get_by",
  async (orderId, thunkAPI) => {
    try {
      return await apiGetOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Order Status
export const useUpdateOrderStatus = createAsyncThunk(
  "order/update",
  async (data, thunkAPI) => {
    try {
      return await apiUpdateOrderStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const useCancelOrder = createAsyncThunk(
  "order/cancel",
  async (data, thunkAPI) => {
    try {
      return await apiCancelledOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orderList = [];
      state.ordersByUser = [];
      state.orderDetails = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(useCreateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useCreateOrder.rejected, (state, action) => {
        state.isLoading = false;
       
      });

    // Delete Order
    builder
      .addCase(useDeleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useDeleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        
      });

    // Get User Orders
    builder
      .addCase(useGetUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersByUser = action.payload?.data || [];
      })
      .addCase(useGetUserOrders.rejected, (state, action) => {
        state.isLoading = false;
      });

    // Get All Orders
    builder
      .addCase(useGetAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data || [];
        state.count = action.payload?.count || 0;
      })
      .addCase(useGetAllOrders.rejected, (state, action) => {
        state.isLoading = false;
       
      });

    // Get Order By ID
    builder
      .addCase(useGetOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data || null;
      })
      .addCase(useGetOrderById.rejected, (state, action) => {
        state.isLoading = false;
        
      });

    // Update Order Status
    builder
      .addCase(useUpdateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(useUpdateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
       
      });

      builder
      .addCase(useCancelOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(useCancelOrder.rejected, (state, action) => {
        state.isLoading = false;
       
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
