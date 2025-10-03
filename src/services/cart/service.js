// services/cartService.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/cart",
  withCredentials: true,
});

// ----------------- Cart APIs -----------------

// Add Item to Cart
export const apiAddToCart = async (data) => {
  try {
    const response = await api.post("/add", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get Cart by User ID
export const apiGetCart = async (userId) => {
  try {
    const response = await api.get(`/get/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Update Cart Item (increment, decrement, set quantity, remove)
export const apiUpdateCart = async (data) => {
  try {
    const response = await api.patch("/update", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Delete Cart Item or Clear Cart
export const apiDeleteCartItem = async (data) => {
  try {
    const response = await api.delete("/delete", { data }); // axios delete needs `data` option
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};
