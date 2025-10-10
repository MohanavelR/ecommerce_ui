import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiOfCreateAddress,
  apiOfGetAddressesByUser,
  apiOfUpdateAddress,
  apiOfDeleteAddress,
} from "../../services/address/service";

// ---------------- State ----------------
const initialState = {
  isLoading: false,
  addressList: [],
  count: 0,
};

// ---------------- Thunks ----------------

// Create Address
export const useCreateAddress = createAsyncThunk(
  "/address/create",
  async (data, thunkAPI) => {
    try {
      return await apiOfCreateAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Addresses by User ID
export const useGetAddressesByUser = createAsyncThunk(
  "/address/getByUser",
  async (userId, thunkAPI) => {
    try {
      return await apiOfGetAddressesByUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Address
export const useUpdateAddress = createAsyncThunk(
  "/address/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await apiOfUpdateAddress(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Address
export const useDeleteAddress = createAsyncThunk(
  "/address/delete",
  async (id, thunkAPI) => {
    try {
      return await apiOfDeleteAddress(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(useCreateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useCreateAddress.rejected, (state) => {
        state.isLoading = false;
      });

    // Get by User ID
    builder
      .addCase(useGetAddressesByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAddressesByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload?.success ? action.payload?.data : [];
        state.count = action.payload?.success ? action.payload?.count : 0;
      })
      .addCase(useGetAddressesByUser.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });

    // Update
    builder
      .addCase(useUpdateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useUpdateAddress.rejected, (state) => {
        state.isLoading = false;
      });

    // Delete
    builder
      .addCase(useDeleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(useDeleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
