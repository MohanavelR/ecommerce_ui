
import {Link} from "react-router-dom" 

import { deepcopyObj } from "../../utils/deepCopyObj";
import { loginErrorObj, registerError } from "../../utils/errorObj";
import Loader from "../../components/common/Loader";
import { useDispatch } from "react-redux"
import {  useLogin } from "../../store/authSlice";
import { useContext, useState } from "react";
import { MessageContext } from '../../context/context'
const Login = () => {
   const {  messageContextState,setMessageContextState}=useContext(MessageContext)
 const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [isLoading,setIsLoading]=useState(false)
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(loginErrorObj))
  const dispatch=useDispatch()
  async function handlesubmit(e){
    setIsLoading(true)
    e.preventDefault()
    let hasError=false;
    const localError=deepcopyObj(registerError)
    
    if(formData.email===""){
      hasError=true
       localError.email.isRequired=true
    }
    if(formData.password===""){
      hasError=true
       localError.password.isRequired=true
    }
    setFieldErrors({...localError})
    if(!hasError){
     dispatch(useLogin(formData)).then(res=>{
      if(res.payload?.success){
        console.log(res.payload)
        setIsLoading(false)
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
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
        setFieldErrors(deepcopyObj(loginErrorObj))
      },3000)
    }
    
  }
   
  return (
    <div className="flex min-h-full flex-col justify-center px-6 mt-2">
      <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in Your Account 
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form   className="space-y-6">
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
          
            </div>
          </div>
         

          <div>
            <button
              onClick={handlesubmit}
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center disabled:cursor-progress  bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {
                isLoading ?<Loader/>:"Sign in"
              }
              
            </button>
          </div>
        </form>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
                Don't have an account? 
                <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
            </p>
        </div>
    
  </div>
</div>

  )
}

export default Login