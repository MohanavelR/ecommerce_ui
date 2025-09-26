import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import SliderTable from '../../components/layout/admin/tables/SliderTable'
import AddSliderForm from '../../components/layout/admin/forms/AddSliderForm'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { SliderData } from '../../utils/formDataObj'
import { SliderErrors } from '../../utils/errorObj'
import { MessageContext } from '../../context/context'
import { useCreateSlider, useDeleteSlider, useGetAllSliders, useUpdateSlider } from '../../store/admin/sliderSlice'

const AdminSlider = () => {
  const {sliders,isLoading}=useSelector(state=>state.slider)
  console.log(sliders)
  const [openForm,setOpenForm]=useState(false)
  const [formData,setFormData]=useState(deepcopyObj(SliderData))
  const [fielderrors,setFieldErrors]=useState(deepcopyObj(deepcopyObj(SliderErrors)))
  const [isEditMode,setIsEditMode]=useState(false)
  const dispatch=useDispatch()
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  
  function openFormMethod(){
      setOpenForm(!openForm)
    }
    function closeFormMethod(){
      setOpenForm(!openForm)
      setFormData(deepcopyObj(SliderData))
      setIsEditMode(false)
      setFieldErrors(deepcopyObj(SliderErrors))
    }
  
    function setIsEditModeMethod(data){
      setFormData(data)
      setIsEditMode(true)
      setOpenForm(!openForm)
    }
  async  function onSubmitMethod(e){
    e.preventDefault()
    let hasError=false
    const localError=deepcopyObj(SliderErrors)
    if(formData.title===""){
       localError.title=true
       hasError=true
    }
    if(formData.description===""){
       localError.description=true
         hasError=true
    }
    if(formData.image===""){
      localError.image=true
        hasError=true
    }
    setFieldErrors(deepcopyObj(localError))
        if(!hasError){
          console.log(formData)
          dispatch(isEditMode?useUpdateSlider({id:formData._id,formData}):useCreateSlider(formData)).then(res=>{
            console.log(res.payload)
    if(res.payload?.success){
            closeFormMethod()
            dispatch(useGetAllSliders())
            setFormData(deepcopyObj(SliderData));
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
          }
          else{
           
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
          }
          })
        }}

  async function handleDeleteSlider(id){
    if(confirm("Are sure to Delete?")){
      dispatch(useDeleteSlider(id)).then(res=>{
       if(res.payload?.success){  
        dispatch(useGetAllSliders())
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
        openForm && <AddSliderForm onSubmitMethod={onSubmitMethod} closeFormMethod={closeFormMethod} isEditMode={isEditMode} fielderrors={fielderrors} setFieldErrors={setFieldErrors} formData={formData} setFormData={setFormData} />
      }
      {
        isLoading ?<Loader/>:
        <div>
          <div class="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 class="text-3xl font-bold text-gray-900">Manage Sliders</h1>
            
            {/* <!-- Add Category Button --> */}
            <button onClick={openFormMethod} class="admin-add-btn">
                <i class="fas fa-plus mr-2"></i>
                Add Slider
            </button>
        </div>
    </div>
    <SliderTable sliders={sliders} handleDeleteSlider={handleDeleteSlider} setIsEditModeMethod={setIsEditModeMethod} />
{/* <ComingSoonPosterTable comingsoon={comingsoon} handleDeletePoster={handleDeletePoster} setIsEditModeMethod={setIsEditModeMethod} /> */}
        </div>
      }
    </>
  )
}

export default AdminSlider