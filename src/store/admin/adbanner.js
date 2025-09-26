import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { apiCreateBanner, apiDeleteBanner, apiGetAllBanners, apiGetBannerById, apiUpdateBanner } from "../../services/admin/adBanner/services";


const initialState = {
  banners: [],
  currentBanner: null,
  isLoading: false,
  count:0
};



// Create Banner
export const useCreateBanner = createAsyncThunk(
  "/banner/create",
  async (formData, thunkAPI) => {
    try {
      return await apiCreateBanner(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get All Banners
export const useGetAllBanners = createAsyncThunk(
  "/banner/getAll",
  async (_, thunkAPI) => {
    try {
      return await apiGetAllBanners();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Get single banner
export const useGetBannerById = createAsyncThunk(
  "/banner/getOne",
  async (id, thunkAPI) => {
    try {
      return await apiGetBannerById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Update Banner
export const useUpdateBanner = createAsyncThunk(
  "/banner/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await apiUpdateBanner(id, formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Delete Banner
export const useDeleteBanner = createAsyncThunk(
  "/banner/delete",
  async (id, thunkAPI) => {
    try {
      return await apiDeleteBanner(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearCurrentBanner: (state) => {
      state.currentBanner = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(useCreateBanner.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(useCreateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useCreateBanner.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    builder
      .addCase(useGetAllBanners.pending, (state) => {
        state.isLoading = true;
        ;
      })
      .addCase(useGetAllBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.banners = action.payload?.success ? action.payload.data : [];
        state.count = action.payload?.success ? action.payload.count : 0;
      })
      .addCase(useGetAllBanners.rejected, (state, action) => {
        state.isLoading = false;
        
      });


    builder
      .addCase(useGetBannerById.pending, (state) => {
        state.isLoading = true;
    
      })
      .addCase(useGetBannerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBanner = action.payload?.success ? action.payload.data : null;
      })
      .addCase(useGetBannerById.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    builder
      .addCase(useUpdateBanner.pending, (state) => {
        state.isLoading = true;
     
      })
      .addCase(useUpdateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useUpdateBanner.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    builder
      .addCase(useDeleteBanner.pending, (state) => {
        state.isLoading = true;
       
      })
      .addCase(useDeleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(useDeleteBanner.rejected, (state, action) => {
        state.isLoading = false;
       
      });
  },
});

export const { clearCurrentBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
