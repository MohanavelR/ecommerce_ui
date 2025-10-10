import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/details", // your router base
  withCredentials: true,
});

// ------------------------
// Update firstName & lastName
// ------------------------
export const apiChangeName = async (formData) => {
  try {
    const response = await api.post("/change-name", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ------------------------
// Request OTP for email change
// ------------------------
export const apiSendOtpForEmailChange = async (formData) => {

  try {
    const response = await api.post("/send-otp", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ------------------------
// Verify OTP & change email
// ------------------------
export const apiVerifyEmailChange = async (formData) => {
  try {
    const response = await api.post("/change-email", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};
