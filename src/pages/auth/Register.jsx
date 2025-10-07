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
   
        setIsLoading(false)
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
         nav("/auth/login")
      }
      else{
        setIsLoading(false)
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
        
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
    // IMPRESSIVE CARD: High contrast white background, prominent shadow, subtle hover lift (shadow-2xl, hover:shadow-primary/30).
    // Width increased to max-w-lg (512px)
    <div className="bg-white rounded-3xl shadow-2xl p-8  max-w-md w-full mx-auto border border-gray-100 transition-all duration-300 hover:shadow-primary/30 transform hover:-translate-y-1 my-8">
     <div className="text-center mb-10">
        {/* IMPRESSIVE HEADER: Gradient text for strong visual appeal */}
        <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 tracking-tight">
          Create Account
        </h2>
        <p className="text-gray-500 text-lg">Join EcoShop for a sustainable future</p>
      </div>

      <div className="sm:mx-auto sm:w-full">
        <form onSubmit={handlesubmit} className="space-y-6">
          
          {/* First Name / Last Name Group: Using flex-1 to distribute width equally */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstname"
                className="auth-form-label"
              >
                First Name<span className="text-red-500 ">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  value={formData.firstName}
                  onChange={(e)=>setFormData({...formData,firstName:e.target.value})}
                  autoComplete="given-name"
                  // IMPRESSIVE INPUTS: Clean design, strong primary focus ring/shadow, large padding
                  className="auth-form-input-with-icon"
                  placeholder="John"
                />
              </div>
              {
                fieldErrors.firstname.isRequired && 
              <p className="text-xs font-medium text-red-600 mt-1">First name is required</p>
              }
            </div>
            
            <div className="flex-1">
              <label
                htmlFor="lastname"
                className="auth-form-label"
              >
                Last Name
              </label>
               <div className="relative">
                <i className="fas fa-user-tag absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
                <input
                  id="lastname"
                  type="text"
                  value={formData.lastName}
                  name="lastname"
                  onChange={(e)=>setFormData({...formData,lastName:e.target.value})}
                  autoComplete="family-name"
                  // IMPRESSIVE INPUTS: Clean design, strong primary focus ring/shadow, large padding
                  className="auth-form-input-with-icon"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="auth-form-label"
            >
              Email address<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-1 relative">
               <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
                autoComplete="email"
                // IMPRESSIVE INPUTS
                className="auth-form-input-with-icon"
                placeholder="you@example.com"
              />
              {
                fieldErrors.email.isRequired && 
              <p className="text-xs font-medium text-red-600 mt-1">Email is required</p>
              }
            </div>
          </div>
          
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="auth-form-label"
            >
              Password<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-1 relative">
                <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
                autoComplete="new-password"
                // IMPRESSIVE INPUTS
                className="auth-form-input-with-icon"
                placeholder="••••••••"
              />
              {
                fieldErrors.password.isRequired && 
              <p className="text-xs font-medium text-red-600 mt-1">Password is required</p>
              }
              {
                fieldErrors.password.lengthError && 
              <p className="text-xs font-medium text-red-600 mt-1">Password must be at least 8 characters</p>
              }
            </div>
          </div>
          
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirm-password"
              className="auth-form-label"
            >
              Confirm Password<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-1 relative">
                <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
              <input
                id="confirm-password"
                type="password"
                value={confirm_password}
                name="confirm-password"
                onChange={(e)=>setconfirm_password(e.target.value)}
                autoComplete="new-password"
                // IMPRESSIVE INPUTS
                className="auth-form-input-with-icon"
                placeholder="••••••••"
              />
              {
              fieldErrors.re_password.matchError && 
              <p className="text-xs font-medium text-red-600 mt-1">Passwords do not match</p>
              }
            </div>
          </div>

          <div>
            {/* IMPRESSIVE BUTTON: Gradient background, large size, shadow/lift on hover */}
            <button
              onClick={handlesubmit}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-xl py-3.5 text-lg shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.01] flex justify-center items-center h-14 disabled:opacity-70 disabled:shadow-none"
            >
              {
                isLoading ?<Loader/>:"Create Account"
              }
              
            </button>
          </div>
        </form>

        {/* IMPRESSIVE FOOTER: Clear separation and bold link */}
        <div className="px-6 py-4 mt-8 border-t border-gray-200 text-center">
          <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link 
            to="/auth/login" 
            className="text-primary hover:text-green-700 transition-colors duration-200 font-bold ml-1"
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
