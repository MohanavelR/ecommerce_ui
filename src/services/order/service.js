import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/order",
  withCredentials: true,
});

// ----------------- Order APIs -----------------

// 1️⃣ Create Order
export const apiCreateOrder = async (data) => {
  try {
    const response = await api.post("/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 2️⃣ Delete Order
export const apiDeleteOrder = async (data) => {
  try {
    const response = await api.delete("/delete", { data }); // axios delete uses { data }
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 3️⃣ Get Orders by User
export const apiGetUserOrders = async (userId) => {
  try {
    const response = await api.get(`/get_user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 4️⃣ Get All Orders (Admin)
export const apiGetAllOrders = async () => {
  try {
    const response = await api.get("/get_all");
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 5️⃣ Get Single Order by ID
export const apiGetOrderById = async (orderId) => {
  try {
    const response = await api.get(`/get_by/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 6️⃣ Update Order Status
export const apiUpdateOrderStatus = async (data) => {
  try {
    const response = await api.put("/update", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

export const apiCancelledOrder = async (data) => {
  try {
    const response = await api.put("/cancel", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

