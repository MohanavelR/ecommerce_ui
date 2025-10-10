import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/shop`,
});


export const getFilterProducts = async ({filterParams,sortParams,page}) => {

  try {
    const query=new URLSearchParams({
      ...filterParams,sortBy:sortParams,page
    })
    const response = await api.get(`/products?${query}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
export const getProductDetail = async (sku) => {
  try {
    
    const response = await api.get(`/products/${sku}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};



// 1️⃣ Fetch products by category
export const getProductsByCategory = async (category) => {

  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data; // { success, message, data }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 2️⃣ Fetch products by category and subcategory
export const getProductsByCategoryAndSubcategory = async (category, subCategory) => {
  try {
    const response = await api.get(`/products/sub-category/${category}/${subCategory}`);
    return response.data; // { success, message, data }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

