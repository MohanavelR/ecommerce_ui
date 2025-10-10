import axios from 'axios'
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/users",
    withCredentials:true
})


export const apiGetAllUsers = async (search = "") => {
  try {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    const response = await api.get(`/get_all${query}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      message: "Error fetching users",
      error: error.message,
    };
  }
};



export const apiUpdateUserRole = async (id, role) => {
  try {
    const response = await api.put(`/update/${id}`, { role });
    return response.data;
  } catch (error) {
    return error;
  }
};
