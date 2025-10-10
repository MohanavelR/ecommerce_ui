import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/related", 
  withCredentials: true,
});

// ----------------- Grouped Products -----------------
export const apiOfGetGroupedProducts = async () => {
  try {
    const response = await api.get("/grouped");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ----------------- Related Products -----------------
export const apiOfGetRelatedProducts = async (category, excludeSku = "") => {
  try {
    const response = await api.get(`/related`, {
      params: { category, excludeSku },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
