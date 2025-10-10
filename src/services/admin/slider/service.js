import axios from 'axios'
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/sliders",
    withCredentials:true
})

export const apiCreateSlider = async (formData) => {
  try {
    const response = await api.post("/create", formData);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const apiGetAllSliders = async () => {
  try {
    const response = await api.get("/get_all");
    return response.data;
  } catch (error) {
    return error;
  }
};


export const apiGetSliderById = async (id) => {
  try {
    const response = await api.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const apiUpdateSlider = async (id, formData) => {
  try {
    const response = await api.put(`/update/${id}`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const apiDeleteSlider = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
