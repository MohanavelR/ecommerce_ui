
import axios from 'axios'
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/comingsoon",
    withCredentials:true
})

export const apiCreateComingSoon = async (formData) => {
  try {
    const res = await api.post("/create", formData);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiGetAllComingSoon = async () => {
  try {
    const res = await api.get("/get_all");
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiGetComingSoonById = async (id) => {
  try {
    const res = await api.get(`/get/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiUpdateComingSoon = async (id, formData) => {
  try {
    const res = await api.put(`/update/${id}`, formData);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const apiDeleteComingSoon = async (id) => {
  try {
    const res = await api.delete(`/delete/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};
