import axios from 'axios'

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL+"/category",
    withCredentials:true
})

export const apiOfCreateCategory =async(data)=>{
try {
    const response =await api.post("/create",data)
    return  response.data
} catch (error) {
    return error
}
}
export const apiOfGetAllCategory = async()=>{
    try {
        const response=await api.get("get_all")
         return  response.data
    } catch (error) {
         return error
    }
}
export const apiOfGetsubCategoryByCategory = async(categoryName)=>{
    try {
        console.log(categoryName)
        const response=await api.get(`get_subcategory/${categoryName}`)
         return  response.data
    } catch (error) {
         return error
    }
}
export const apiOfUpdateCategory = async(id,data)=>{
    console.log(data)
    try {
        const response=await api.put(`update/${id}`,data)
         return  response.data
    } catch (error) {
         return error
    }
}
export const apiOfDeleteCategory = async(id,data)=>{
    try {
        const response=await api.delete(`delete/${id}`)
         return  response.data
    } catch (error) {
         return error
    }
}
