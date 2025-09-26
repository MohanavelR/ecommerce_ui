import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { apiCreateComingSoon,apiGetAllComingSoon,
  apiGetComingSoonById,
  apiUpdateComingSoon,
  apiDeleteComingSoon, } from "../../services/admin/comingsoon/service";



// Create product
export const useCreateComingSoon = createAsyncThunk(
  "/comingsoon/create",
  async (formData, thunkAPI) => {
    try {
      return await apiCreateComingSoon(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get all comingsoon
export const useGetAllComingSoon = createAsyncThunk(
  "/comingsoon/getAll",
  async (_, thunkAPI) => {
    try {
      return await apiGetAllComingSoon();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get single product
export const useGetComingSoonById = createAsyncThunk(
  "/comingsoon/getOne",
  async (id, thunkAPI) => {
    try {
      return await apiGetComingSoonById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Update product
export const useUpdateComingSoon = createAsyncThunk(
  "/comingsoon/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await apiUpdateComingSoon(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Delete product
export const useDeleteComingSoon = createAsyncThunk(
  "/comingsoon/delete",
  async (id, thunkAPI) => {
    try {
      return await apiDeleteComingSoon(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const initialState = {
  comingsoon: [],
  currentProduct: null,
  count: 0,
  isLoading: false,
};

const comingSoonSlice = createSlice({
  name: "comingSoon",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(useCreateComingSoon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateComingSoon.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useCreateComingSoon.rejected, (state) => {
        state.isLoading = false;
      });

    // ✅ Get all comingsoon
    builder
      .addCase(useGetAllComingSoon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAllComingSoon.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.comingsoon = action.payload.data;
          state.count = action.payload.count;
        }
      })
      .addCase(useGetAllComingSoon.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(useGetComingSoonById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetComingSoonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProduct = action.payload?.success ? action.payload.data : null;
      })
      .addCase(useGetComingSoonById.rejected, (state) => {
        state.isLoading = false;
      });


    builder
      .addCase(useUpdateComingSoon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateComingSoon.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useUpdateComingSoon.rejected, (state) => {
        state.isLoading = false;
      });

    // ✅ Delete product
    builder
      .addCase(useDeleteComingSoon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteComingSoon.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useDeleteComingSoon.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCurrentProduct } = comingSoonSlice.actions;
export default comingSoonSlice.reducer;