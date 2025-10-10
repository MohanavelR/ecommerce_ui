import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiChangeName,
  apiSendOtpForEmailChange,
  apiVerifyEmailChange,
} from "../../services/details/service";

const initialState = {
  isLoading: false,
};

// ------------------------
// Thunks
// ------------------------

// Update Name
export const useChangeName = createAsyncThunk(
  "details/changeName",
  async (formData, thunkAPI) => {
    try {
      return await apiChangeName(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Request OTP for Email Change
export const useSendOtpForEmailChange = createAsyncThunk(
  "details/sendOtpEmailChange",
  async (formData, thunkAPI) => {
    try {
      return await apiSendOtpForEmailChange(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Verify OTP and Change Email
export const useVerifyEmailChange = createAsyncThunk(
  "details/verifyEmailChange",
  async (formData, thunkAPI) => {
    try {
      return await apiVerifyEmailChange(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ------------------------
// Slice
// ------------------------
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Change Name
    builder
      .addCase(useChangeName.pending, (state) => {
        state.isLoading = true;
  
      })
      .addCase(useChangeName.fulfilled, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(useChangeName.rejected, (state, action) => {
        state.isLoading = false;
    
      });
    builder
      .addCase(useSendOtpForEmailChange.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(useSendOtpForEmailChange.fulfilled, (state, action) => {
        state.isLoading = false;
       
      })
      .addCase(useSendOtpForEmailChange.rejected, (state, action) => {
        state.isLoading = false;
      
      });

    // Verify Email Change
    builder
      .addCase(useVerifyEmailChange.pending, (state) => {
        state.isLoading = true;
       
      })
      .addCase(useVerifyEmailChange.fulfilled, (state, action) => {
        state.isLoading = false;

      })
      .addCase(useVerifyEmailChange.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
