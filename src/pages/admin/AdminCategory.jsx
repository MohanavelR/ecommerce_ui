import React, { useState,useContext } from 'react'
import CategoryTable from '../../components/layout/admin/tables/CategoryTable'
import { useDispatch, useSelector } from 'react-redux'
import AddCategory from '../../components/layout/admin/forms/AddCategory'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { categoryFormData } from '../../utils/formDataObj'
import { categoryError } from '../../utils/errorObj'
import { useCreateCategory, useDeleteCategory, useGetAllCategory, useUpdateCategory } from '../../store/categorySlice'
import { MessageContext } from '../../context/context'

const AdminCategory = () => {
  const {categoryList}=useSelector(state=>state.category)
  const [formData,setFormData]=useState(deepcopyObj(categoryFormData))
  const [openCategoryForm,setOpenCategoryForm]=useState(false)
  const [isEditMode,setIsEditMode]=useState(false)
const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const [fielderrors,setFieldErrors]=useState(deepcopyObj(categoryError))
  const dispatch = useDispatch()
  function openCategoryFormMethod(){
    setOpenCategoryForm(!openCategoryForm)
  }
  function closeCategoryFormMethod(){
    setOpenCategoryForm(!openCategoryForm)
    setFormData(deepcopyObj(categoryFormData))
    setIsEditMode(false)
  }

  function setIsEditModeMethod(data){
    setFormData(data)
    setIsEditMode(true)
    setOpenCategoryForm(!openCategoryForm)
  }

  async function handleCategoryMethod(e){
    e.preventDefault()
    let hasError=false
    const localError=deepcopyObj(categoryError)
    if(formData.categoryName===""){
      localError.categoryName=true
      hasError=true

    }
    if(formData.subcategories.length===0){
      hasError=true
      localError.subCategory=true
    }
    setFieldErrors(deepcopyObj(localError))
    if(!hasError){
      console.log(formData)
      dispatch(isEditMode?useUpdateCategory({id:formData._id,formData}):useCreateCategory(formData)).then(res=>{
if(res.payload?.success){
        closeCategoryFormMethod()
        dispatch(useGetAllCategory())
        setFormData(deepcopyObj(categoryFormData));
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
      })
    }
    else{
      setTimeout(()=>{
        setFieldErrors(deepcopyObj(categoryError))
      },3000)
    }
  }

  async function handleDeleteCategory(id){
    if(confirm("Are sure to Delete?")){
      dispatch(useDeleteCategory(id)).then(res=>{
       if(res.payload?.success){  
        dispatch(useGetAllCategory())
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }      })
    }
  }

  return (
    <>
  {
    openCategoryForm &&
    <AddCategory handleCategoryMethod={handleCategoryMethod} fielderrors={fielderrors}  closeCategoryFormMethod={closeCategoryFormMethod} formData={formData} setFormData={setFormData} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
  }

    <div class="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 class="text-3xl font-bold text-gray-900">Manage Category</h1>
            
            {/* <!-- Add Category Button --> */}
            <button onClick={openCategoryFormMethod}  class="admin-add-btn">
                <i class="fas fa-plus mr-2"></i>
                Add Category
            </button>
        </div>
    </div>
    <CategoryTable handleDeleteCategory={handleDeleteCategory} setIsEditModeMethod={setIsEditModeMethod} categoryList={categoryList} />
    </>
  )
}

export default AdminCategory
