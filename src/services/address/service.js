import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/address",
  withCredentials: true,
});

// ----------------- Address APIs -----------------

// Create Address
export const apiOfCreateAddress = async (data) => {
  try {
    const response = await api.post("/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get All Addresses
export const apiOfGetAllAddresses = async () => {
  try {
    const response = await api.get("/get");
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get Address By ID
export const apiOfGetAddressById = async (id) => {
  try {
    const response = await api.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Get Addresses By User ID
export const apiOfGetAddressesByUser = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Update Address
export const apiOfUpdateAddress = async (id, data) => {
  try {
    const response = await api.put(`/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// Delete Address
export const apiOfDeleteAddress = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};
