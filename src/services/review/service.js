import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/review",
  withCredentials: true,
});

// ----------------- Review APIs -----------------

// 1️⃣ Create Review
export const apiCreateReview = async (data) => {
  try {
    const response = await api.post("/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 2️⃣ Get All Reviews for a Product
export const apiGetProductReviews = async (productId) => {

  try {
    const response = await api.get(`/get/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 3️⃣ Update Review
export const apiUpdateReview = async (data) => {
  try {
    const response = await api.put("/update", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};

// 4️⃣ Delete Review
export const apiDeleteReview = async (data) => {
  try {
    const response = await api.delete("/delete", { data }); // DELETE uses { data }
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: error.message };
  }
};
