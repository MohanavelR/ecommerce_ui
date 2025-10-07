import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});


export const apiGetSearchProducts = async (keyword) => {

  try {
    const response = await api.get(`/search/${keyword}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};