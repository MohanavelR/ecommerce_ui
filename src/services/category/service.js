import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/category",
    withCredentials:true
})

const apiOfCreateCategory =async(data)=>{
try {
    const response =await api.post("/create",data)
    return  response.data
} catch (error) {
    return error
}
}
const apiOfGetAllCategory = async()=>{
    try {
        const response=await api.get("get_all")
         return  response.data
    } catch (error) {
         return error
    }
}
const apiOfGetsubCategoryByCategory = async(categotyName)=>{
    try {
        const response=await api.get(`get_all/${categotyName}`)
         return  response.data
    } catch (error) {
         return error
    }
}
const apiOfUpdateCategory = async(id,data)=>{
    try {
        const response=await api.put(`update/${id}`,data)
         return  response.data
    } catch (error) {
         return error
    }
}
const apiOfDeleteCategory = async(id,data)=>{
    try {
        const response=await api.delete(`delete/${id}`)
         return  response.data
    } catch (error) {
         return error
    }
}