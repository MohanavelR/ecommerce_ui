import axios from 'axios'
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/users",
    withCredentials:true
})


export const apiGetAllUsers = async () => {
  try {
    const response = await api.get("/get_all");
    return response.data;
  } catch (error) {
    return error;
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
