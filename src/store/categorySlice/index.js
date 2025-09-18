import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"

const initialState={
    isLoading:false,
    categoryList:null,
    subcategories:null
}

// ---------------- Thunks ----------------
// Create Category
export const useCreateCategory = createAsyncThunk(
  "/category/create",
  async (data, thunkAPI) => {
    try {
      return await apiOfCreateCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get All Categories
export const useGetAllCategory = createAsyncThunk(
  "/category/getAll",
  async (_, thunkAPI) => {
    try {
      return await apiOfGetAllCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get Subcategories by Category
export const useGetSubCategory = createAsyncThunk(
  "/category/getSubCategory",
  async (categoryName, thunkAPI) => {
    try {
      return await apiOfGetsubCategoryByCategory(categoryName);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Category
export const useUpdateCategory = createAsyncThunk(
  "/category/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await apiOfUpdateCategory(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Category
export const useDeleteCategory = createAsyncThunk(
  "/category/delete",
  async (id, thunkAPI) => {
    try {
      return await apiOfDeleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ---------------- Slice ----------------
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      // optional custom reducer
    },
  },
  extraReducers: (builder) => {
    // Create
    builder
      .addCase(useCreateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useCreateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useCreateCategory.rejected, (state) => {
        state.isLoading = false;
      });

    // Get All
    builder
      .addCase(useGetAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload?.success ?action.payload?.data:[];
      })
      .addCase(useGetAllCategory.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = null;
      });

    // Get Subcategories
    builder
      .addCase(useGetSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories = action.payload?.success ?action.payload?.data.subcategories:[];
      })
      .addCase(useGetSubCategory.rejected, (state) => {
        state.isLoading = false;
        state.subcategories = null;
      });

    // Update
    builder
      .addCase(useUpdateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useUpdateCategory.rejected, (state) => {
        state.isLoading = false;
      });

    // Delete
    builder
      .addCase(useDeleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useDeleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useDeleteCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;