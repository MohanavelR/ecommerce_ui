import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAllUsers, apiUpdateUserRole } from "../../services/admin/user/service";
// import { apiGetAllUsers, apiUpdateUserRole } from ""

const initialState = {
  isLoading: false,
  users: [],
  count:0
};

export const useGetAllUsers = createAsyncThunk("/users/getAll", async (_, thunkAPI) => {
  try {
    return await apiGetAllUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const useUpdateUserRole = createAsyncThunk("/users/updateRole", async ({ id, role }, thunkAPI) => {
  try {
    return await apiUpdateUserRole(id, role);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Users
    builder
      .addCase(useGetAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useGetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action?.payload?.success ? action?.payload?.data : [];
        state.count = action?.payload?.success ? action?.payload?.count : 0;
      })
      .addCase(useGetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
       
      });


    builder
      .addCase(useUpdateUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(useUpdateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(useUpdateUserRole.rejected, (state, action) => {
        state.isLoading = false;
      
      });
  },
});

export default userSlice.reducer;
