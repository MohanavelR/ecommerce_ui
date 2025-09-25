import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/auth",
    withCredentials:true
})

export const apiOfCreateUser = async(formData)=>{
  try {
    const response = await api.post('/create_user',formData,{
        withCredentials:true
    })
    return response.data
  } catch (error) {
    return error
  }
}
export const apiOfLogin= async(formData)=>{
    try {   
        const response = await api.post('/login',formData,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        return error
    }
}
export const apiOfGetCurrentUser= async () => {
    try {
        const response = await api.get(`/is_auth`,{
         withCredentials:true
    });
        return response.data;
    } catch (error) {
        return error
    }
}
export const apiOfLogout=async()=>{
     try {
        const response = await api.get(`/logout`,{
         withCredentials:true
    });
        return response.data;
    } catch (error) {
        return error
    }
} 
export const apiOfSendOtpForResetPassword=async(formData)=>{
    try {
        const response = await api.post('/send_otp_for_reset_password',formData)
        return response.data
    } catch (error) {
        return error
    } 
}
export const apiOfResetPassword=async(formData)=>{
    try {
        const response = await api.post('/reset_password',formData)
        return response.data
    } catch (error) {
        return error
    } 
}
export const apiOfSendOtpForVerifyAccount=async(formData)=>{
    try {
        const response = await api.post('/send_otp_for_verify_account',formData)
        return response.data
    } catch (error) {
        return error
    } 
}
export const apiOfVerifyAccount=async(formData)=>{
    try {
        const response = await api.post('/verify_account',formData)
        return response.data
    } catch (error) {
        return error
    } 
}