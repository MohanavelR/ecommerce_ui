import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useChangeName, useSendOtpForEmailChange, useVerifyEmailChange } from '../../../../store/details'
import { useContext } from 'react'
import { MessageContext } from '../../../../context/context'
import { useAuth } from '../../../../store/authSlice'
import Loader from '../../../common/Loader'
import OTPbox from '../../../common/OTPbox'
const UserConatiner = () => {
  const {  messageContextState,setMessageContextState}=useContext(MessageContext)
  const {isLoading}=useSelector(state=>state.userDetail)
  const {user}=useSelector(state=>state.auth)
  const [email,setEmail]=useState(null)
  const [otpError,setOtpError]=useState(false)
  const dispatch=useDispatch()  
  const [error,setError]=useState({
    firstName:false,
    lastName:false,
    email:false
  })
  const [formDataName,setformDataName]=useState(
    {firstName:user?.firstName || null
    ,lastName:user?.lastName || null
    })
  function handleChangeName(e){
    e.preventDefault()
 
   let hasError=false
    if(formDataName.firstName.trim()===""){
      setError({...error,firstName:true})
      hasError=true
   }
   if(!hasError){
    dispatch(useChangeName({...formDataName,userId:user.id})).then(res=>{
      if(res.payload?.success){
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         dispatch(useAuth())
        }
      else{
  setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
    })
   }
  }

  function handleChangeEmailOTP(e){
    e.preventDefault()
      dispatch(useSendOtpForEmailChange({newEmail:email,userId:user.id})).then(res=>{
      if(res.payload?.success){
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         sessionStorage.setItem("newEmail",email)
         setEmail("")
        }
      else{
  setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
    })
  }
  function handleResendOtp(e){
    e.preventDefault()
     const newEmail=sessionStorage.getItem("newEmail")
    if(newEmail){
      dispatch(useSendOtpForEmailChange({newEmail,userId:user.id})).then(res=>{
      if(res.payload?.success){
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         sessionStorage.setItem("newEmail",newEmail)
        }
      else{
  setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
    })
    }
  }
   function handleChangeEmail(e,otp){
     e.preventDefault()
     const newEmail=sessionStorage.getItem("newEmail")
     if(otp.length < 6){
       setOtpError(true)
      return 
     }
    if(newEmail){
      dispatch(useVerifyEmailChange({newEmail,userId:user.id,otp})).then(res=>{
      if(res.payload?.success){
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         sessionStorage.removeItem("newEmail")
         dispatch(useAuth())
        }
      else{
  setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
    })
    }
  }


  return (
    <div>
            <div className="bg-white rounded-xl shadow p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Personal Information</h2>
      
      <form  className="space-y-6">
        
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input onChange={(e)=>setformDataName({...formDataName,firstName:e.target.value})} type="text" value={formDataName?.firstName} name="firstName" id="firstName"   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" required />
          {
                error.firstName && 
              <p className="text-xs font-medium text-red-600 mt-1">First Name is required</p>
              }
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" onChange={(e)=>setformDataName({...formDataName,lastName:e.target.value})} value={formDataName.lastName} name="lastName" id="lastName"   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
            <div className="pt-4 border-t border-gray-100 ">
          <button type="submit" onClick={handleChangeName} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150">
            Save Changes
          </button>
        </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" placeholder='Enter New Email' />
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" onClick={handleChangeEmailOTP} disabled={!email || isLoading } className="bg-indigo-600 disabled:bg-blue-200 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150">
           {
            isLoading ? <Loader/>:"send OTP"
           }
          </button>
        </div>
      </form>
      {
        sessionStorage.getItem("newEmail") &&
      <OTPbox onSubmit={handleChangeEmail} error={otpError} isLoading={isLoading} resendOtp={handleResendOtp}/>
      }
    </div>
    </div>
  )
}

export default UserConatiner