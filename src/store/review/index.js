import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiCreateReview,
  apiGetProductReviews,
  apiUpdateReview,
  apiDeleteReview,
} from "../../services/review/service";

// ---------------- Initial State ----------------
const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

// ---------------- Thunks ----------------

// 1️⃣ Create Review
export const useCreateReview = createAsyncThunk(
  "review/create",
  async (data, thunkAPI) => {
    try {
      return await apiCreateReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 2️⃣ Get Product Reviews
export const useGetProductReviews = createAsyncThunk(
  "review/get",
  async (productId, thunkAPI) => {
    try {
      return await apiGetProductReviews(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 3️⃣ Update Review
export const useUpdateReview = createAsyncThunk(
  "review/update",
  async (data, thunkAPI) => {
    try {
      return await apiUpdateReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 4️⃣ Delete Review
export const useDeleteReview = createAsyncThunk(
  "review/delete",
  async (data, thunkAPI) => {
    try {
      return await apiDeleteReview(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.isLoading = false;
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ✅ Create Review
    builder
      .addCase(useCreateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // add the new review to top of list
       
      })
      .addCase(useCreateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ✅ Get Product Reviews
    builder
      .addCase(useGetProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload?.data || [];
      })
      .addCase(useGetProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ✅ Update Review
    builder
      .addCase(useUpdateReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        
      
      })
      .addCase(useUpdateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ✅ Delete Review
    builder
      .addCase(useDeleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.meta?.arg?.reviewId;
        if (deletedId) {
          state.reviews = state.reviews.filter((r) => r._id !== deletedId);
        }
      })
      .addCase(useDeleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
