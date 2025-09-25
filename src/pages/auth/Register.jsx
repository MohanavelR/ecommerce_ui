import React, { useContext, useState } from "react";
import { deepcopyObj } from "../../utils/deepCopyObj";
import { registerError } from "../../utils/errorObj";
import Loader from "../../components/common/Loader";
import { useDispatch } from "react-redux"
import { useCreateUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { MessageContext } from '../../context/context'
const Register = () => {
    const {  messageContextState,setMessageContextState}=useContext(MessageContext)
  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const [isLoading,setIsLoading]=useState(false)
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(registerError))
  const [confirm_password,setconfirm_password]=useState("")
  const dispatch=useDispatch()
  const nav = useNavigate()
  async function handlesubmit(e){
    setIsLoading(true)
    e.preventDefault()
    let hasError=false;
    const localError=deepcopyObj(registerError)
    if(formData.firstName===""){
      hasError=true
      localError.firstname.isRequired=true
    }
    if(formData.email===""){
      hasError=true
       localError.email.isRequired=true
    }
    if(formData.password===""){
      hasError=true
       localError.password.isRequired=true
    }
    if(formData.password.length < 8 && !(localError.password.isRequired)){
      hasError=true
      localError.password.lengthError=true
    }
    if(!(localError.password.lengthError) && formData.password!==confirm_password ){
         hasError=true
        localError.re_password.matchError=true
    }
    setFieldErrors({...localError})
    if(!hasError){
     dispatch(useCreateUser(formData)).then(res=>{
      if(res.payload?.success){
        console.log(res.payload)
        setIsLoading(false)
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         nav("/auth/login")
      }
      else{
        setIsLoading(false)
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
        console.log(res.payload)
      }
     })
    }
    else{
      setIsLoading(false)
      setTimeout(()=>{
        setFieldErrors(deepcopyObj(registerError))
      },3000)
    }
    
  }
   
  return (
    <div className="flex min-h-full flex-col justify-center px-6 mt-2">
     <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join EcoShop for a sustainable future</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form   className="space-y-6">
          <div className="flex space-x-4">
            <div className="mt-2">
              <label
                for="firstname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                <span>
                First Name<span className="text-red-500 text-lg">*</span>
                </span>
              </label>
              <input
                id="firstname"
                type="firstname"
                name="firstname"
                value={formData.firstName}
                onChange={(e)=>setFormData({...formData,firstName:e.target.value.trim()})}
                autocomplete="firstname"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {
                fieldErrors.firstname.isRequired && 
              <p className="text-xs font-medium text-red-700">Name is required</p>
              }
            </div>
            <div className="mt-2">
              <label
                for="lastname"
                
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="lastname"
                value={formData.lastName}
                name="lastname"
                onChange={(e)=>setFormData({...formData,lastName:e.target.value.trim()})}
                autocomplete="lastname"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              
            </div>
          </div>
          <div></div>
          <div>
            <label
              for="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value.trim()})}
                autocomplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {
                fieldErrors.email.isRequired && 
              <p className="text-xs font-medium text-red-700">Email is required</p>
              }
            </div>
          </div>
          <div>
            <label
              for="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value.trim()})}
                autocomplete="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {
                fieldErrors.password.isRequired && 
              <p className="text-xs font-medium text-red-700">password is required</p>
              }
              {
                fieldErrors.password.lengthError && 
              <p className="text-xs font-medium text-red-700">Password must be 8 charators</p>
              }
            </div>
          </div>
          <div>
            <label
              for="confirm-passowrd"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                type="confirm-password"
                value={confirm_password}
                name="confirm-password"
                onChange={(e)=>setconfirm_password(e.target.value.trim())}
                autocomplete="confirm-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {
              fieldErrors.re_password.matchError && 
              <p className="text-xs font-medium text-red-700">passwords are not match</p>
              }
            </div>
          </div>

          <div>
            <button
              onClick={handlesubmit}
              type="submit"
              disabled={isLoading}
              className="w-full btn-hero"
            >
              {
                isLoading ?<Loader/>:"Create Account"
              }
              
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link 
            to="/auth/login" 
            className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
          >
            Sign in
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
