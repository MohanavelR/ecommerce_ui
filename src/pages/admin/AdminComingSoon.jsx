import React, { useContext, useState } from 'react'
import Loader from '../../components/common/Loader'
import { MessageContext } from '../../context/context'
import { useDispatch, useSelector } from 'react-redux'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { comingSoonFormData } from '../../utils/formDataObj'
import { comingError } from '../../utils/errorObj'
import AddComingSoonPoster from '../../components/layout/admin/forms/AddComingSoonPoster'
import { useCreateComingSoon, useDeleteComingSoon, useGetAllComingSoon, useUpdateComingSoon } from '../../store/admin/comingsoonSlice'
import ComingSoonPosterTable from '../../components/layout/admin/tables/ComingSoonPosterTable'

const AdminComingSoon = () => {
const {posters,isLoading}=useSelector(state=>state.comingsoon)
  const [formData,setFormData]=useState(deepcopyObj(comingSoonFormData))
  const [openForm,setOpenForm]=useState(false)
  const [isEditMode,setIsEditMode]=useState(false)
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const [fielderrors,setFieldErrors]=useState(deepcopyObj(comingError))
  const dispatch = useDispatch()
  function openFormMethod(){
    setOpenForm(!openForm)
  }
  function closeFormMethod(){
    setOpenForm(!openForm)
    setFormData(deepcopyObj(comingSoonFormData))
    setIsEditMode(false)
  }

  function setIsEditModeMethod(data){
    setFormData(data)
    setIsEditMode(true)
    setOpenForm(!openForm)
  }

  async function handleFormMethod(e){
    e.preventDefault()
    let hasError=false
    const localError=deepcopyObj(comingError)
    if(formData.title===""){
      localError.title=true
      hasError=true

    }
    if(formData.image===""){
      hasError=true

      localError.image=true
    }
    setFieldErrors(deepcopyObj(localError))
    if(!hasError){
      console.log(formData)
      dispatch(isEditMode?useUpdateComingSoon({id:formData._id,formData}):useCreateComingSoon(formData)).then(res=>{
if(res.payload?.success){
        closeFormMethod()
        dispatch(useGetAllComingSoon())
        setFormData(deepcopyObj(comingSoonFormData));
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
      })
    }
    else{
      setTimeout(()=>{
        setFieldErrors(deepcopyObj(comingError))
      },3000)
    }
  }

  async function handleDeletePoster(id){
    if(confirm("Are sure to Delete?")){
      dispatch(useDeleteComingSoon(id)).then(res=>{
       if(res.payload?.success){  
        dispatch(useGetAllComingSoon())
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }      })
    }
  }

  return (
    <div>
      {
        openForm && <AddComingSoonPoster isEditMode={isEditMode} setFormData={setFormData} closeFormMethod={closeFormMethod} handleFormMethod={handleFormMethod} fielderrors={fielderrors} formData={formData}  />
      }
      {
        isLoading ?<Loader/>:
        <div>
          <div class="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 class="text-3xl font-bold text-gray-900">Manage Coming soon Poster</h1>
            
            {/* <!-- Add Category Button --> */}
            <button onClick={openFormMethod} class="admin-add-btn">
                <i class="fas fa-plus mr-2"></i>
                Add Poster
            </button>
        </div>
    </div>
<ComingSoonPosterTable comingsoon={posters} handleDeletePoster={handleDeletePoster} setIsEditModeMethod={setIsEditModeMethod} />
        </div>
      }
    </div>
  )
}

export default AdminComingSoon