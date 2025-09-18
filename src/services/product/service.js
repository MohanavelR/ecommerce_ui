import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/products",
  withCredentials: true,
});

// ----------------- Product APIs -----------------

// Create Product
export const apiOfCreateProduct = async (data) => {
  try {
    const response = await api.post("/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Products
export const apiOfGetAllProducts = async () => {
  try {
    const response = await api.get("/get_all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Product By ID
export const apiOfGetProductById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Products By Subcategory
export const apiOfGetProductsBySubcategory = async (subCategory) => {
  try {
    const response = await api.get(`/get_subcategory/${subCategory}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update Product
export const apiOfUpdateProduct = async (id, data) => {
  try {
    const response = await api.put(`/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete Product
export const apiOfDeleteProduct = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
