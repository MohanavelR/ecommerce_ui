
import axios from 'axios'
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/adbanner",
    withCredentials:true
})

export const apiCreateBanner = async (formData) => {
  try {
    const res = await api.post("/create", formData);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiGetAllBanners = async () => {
  try {
    const res = await api.get("/get_all");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiGetBannerById = async (id) => {
  try {
    const res = await api.get(`/get/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiUpdateBanner = async (id, formData) => {
  try {
    const res = await api.put(`/update/${id}`, formData);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiDeleteBanner = async (id) => {
  try {
    const res = await api.delete(`/delete/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};
