import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { apiOfCreateUser, apiOfGetCurrentUser, apiOfLogin, apiOfLogout } from '../../services/auth/service';


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
    console.log("working thunk")
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
    }
})

export const  {setUser} =authSlice.actions
export default authSlice.reducer

