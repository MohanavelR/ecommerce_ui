import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { apiOfCreateUser, apiOfGetCurrentUser, apiOfLogin, apiOfLogout, apiOfResetPassword, apiOfSendOtpForResetPassword, apiOfSendOtpForVerifyAccount, apiOfVerifyAccount } from '../../services/auth/service';


const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null
}
// Register main Method
export const useCreateUser = createAsyncThunk('/auth/register', async (formData, thunkAPI) => {
  try {
    return await apiOfCreateUser(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Login main Method
export const useLogin = createAsyncThunk('/auth/login', async (formData, thunkAPI) => {
  try {
    return await apiOfLogin(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Check Auth and Get Data main Method
export const useAuth = createAsyncThunk('/auth/checkauth', async (_, thunkAPI) => {
  try {

    return await apiOfGetCurrentUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Logout Main Method
export const useLogout =createAsyncThunk('/auth/logout',async(_,thunkAPI)=>{
  try{
  return await apiOfLogout()
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
export const useSendResetOTP =createAsyncThunk('/auth/forget-paasowrd',async(formData,thunkAPI)=>{
  try{
  return await apiOfSendOtpForResetPassword(formData)
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
export const useResetPassword =createAsyncThunk('/auth/reset-password',async(formData,thunkAPI)=>{
  try{
  return await apiOfResetPassword(formData)
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
export const useSendverifyOTP =createAsyncThunk('/auth/verify-otp',async(formData,thunkAPI)=>{
  try{
  return await apiOfSendOtpForVerifyAccount(formData)
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
export const useVerifyAccount =createAsyncThunk('/auth/verify-account',async(formData,thunkAPI)=>{
  try{
  return await apiOfVerifyAccount(formData)
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
// Create slice for Authentication
const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
        }
    },
    extraReducers:(builder)=>{
      // Register
        builder.addCase(useCreateUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(useCreateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
        }).addCase(useCreateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
            // Login
        }).addCase(useLogin.pending,(state)=>{
            state.isLoading=true
        }).addCase(useLogin.fulfilled,(state,action)=>{
            state.isLoading=false         
            state.user=(action?.payload?.success)?action?.payload?.data:null
            state.isAuthenticated=action?.payload?.success
        }).addCase(useLogin.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
            // Check Auth
        }).addCase(useAuth.pending,(state)=>{
            state.isLoading=true
        }).addCase(useAuth.fulfilled,(state,action)=>{
            state.isLoading=false   
            state.user=(action?.payload?.success)?action?.payload?.data:null
            state.isAuthenticated=action?.payload?.success
        }).addCase(useAuth.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
            // logout
        }).addCase(useLogout.pending,(state)=>{
            state.isLoading=true
             
        }).addCase(useLogout.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=!(action?.payload?.success)?action?.payload?.user:null
            state.isAuthenticated=!(action?.payload?.success)     
        }).addCase(useLogout.rejected,(state,action)=>{
            state.isLoading=true
            state.user=null
            state.isAuthenticated=false 
        })
        .addCase(useSendResetOTP.pending,(state)=>{
            state.isLoading=true
        }).addCase(useSendResetOTP.fulfilled,(state,action)=>{
       state.isLoading=false
        }).addCase(useSendResetOTP.rejected,(state,action)=>{
          state.isLoading=false
        }).addCase(useResetPassword.pending,(state,action)=>{
          state.isLoading=true
        }).addCase(useResetPassword.fulfilled,(state,action)=>{
          state.isLoading=false
        }).addCase(useResetPassword.rejected,(state,action)=>{
          state.isLoading=false
        }) .addCase(useSendverifyOTP.pending,(state)=>{
            state.isLoading=true
        }).addCase(useSendverifyOTP.fulfilled,(state,action)=>{
       state.isLoading=false
        }).addCase(useSendverifyOTP.rejected,(state,action)=>{
          state.isLoading=false
        }).addCase(useVerifyAccount.pending,(state,action)=>{
          state.isLoading=true
        }).addCase(useVerifyAccount.fulfilled,(state,action)=>{
          state.isLoading=false
        }).addCase(useVerifyAccount.rejected,(state,action)=>{
          state.isLoading=false
        })
    }
})

export const  {setUser} =authSlice.actions
export default authSlice.reducer

