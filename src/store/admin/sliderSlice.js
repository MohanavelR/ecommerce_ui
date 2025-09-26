import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { apiCreateSlider ,
  apiGetAllSliders,
  apiGetSliderById,
  apiUpdateSlider,
  apiDeleteSlider, } from "../../services/admin/slider/service";



export const useCreateSlider = createAsyncThunk(
  "/slider/create",
  async (formData, thunkAPI) => {
    try {
      return await apiCreateSlider(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const useGetAllSliders = createAsyncThunk(
  "/slider/getAll",
  async (_, thunkAPI) => {
    try {
      return await apiGetAllSliders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const useGetSingleSlider = createAsyncThunk(
  "/slider/getOne",
  async (id, thunkAPI) => {
    try {
      return await apiGetSliderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const useUpdateSlider = createAsyncThunk(
  "/slider/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await apiUpdateSlider(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const useDeleteSlider = createAsyncThunk(
  "/slider/delete",
  async (id, thunkAPI) => {
    try {
      return await apiDeleteSlider(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  sliders: [],
  currentSlider: null,
  isLoading: false,
 count:0
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    clearCurrentSlider: (state) => {
      state.currentSlider = null;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(useCreateSlider.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(useCreateSlider.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(useCreateSlider.rejected, (state, action) => {
        state.isLoading = false;
      
      });


    builder
      .addCase(useGetAllSliders.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(useGetAllSliders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = action.payload?.success ? action.payload.data : [];
        state.count = action.payload?.success ? action.payload.count : 0;
      })
      .addCase(useGetAllSliders.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    // builder
    //   .addCase(useGetSingleSlider.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(useGetSingleSlider.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.currentSlider = action.payload?.success ? action.payload.data : null;
    //   })
    //   .addCase(useGetSingleSlider.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload || "Failed to fetch slider";
    //   });


    builder
      .addCase(useUpdateSlider.pending, (state) => {
        state.isLoading = true;
     
      })
      .addCase(useUpdateSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useUpdateSlider.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    builder
      .addCase(useDeleteSlider.pending, (state) => {
        state.isLoading = true;
       
      })
      .addCase(useDeleteSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        
      })
      .addCase(useDeleteSlider.rejected, (state, action) => {
        state.isLoading = false;
       
      });
  },
});

export const { clearCurrentSlider } = sliderSlice.actions;
export default sliderSlice.reducer;