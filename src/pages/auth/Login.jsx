
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
    const [showPassword, setShowPassword] = useState(false);
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
    <div className="card-feature">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your EcoShop account</p>
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
            <div className="mt-2 relative">
               <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"></i>
              <input
              id="email"
              type="email"
              
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value.trim()})}
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
            <div className="mt-2 relative">
         <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"></i>
             <input
              id="password"
              type={showPassword ? "text" : "password"}
              
              className="w-full pl-10 pr-12 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <i className={showPassword ? "fas fa-eye-slash w-5 h-5" : "fas fa-eye w-5 h-5"}></i>
            </button>
              {
                fieldErrors.password.isRequired && 
              <p className="text-xs  font-medium text-red-700">password is required</p>
              }
          
            </div>
             <div className="flex mt-3 items-center justify-between">
      
          <Link 
            to="/auth/forget-password" 
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Forgot password?
          </Link>
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
                isLoading ?<Loader/>:"Sign in"
              }
              
            </button>
          </div>
        </form>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
             <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link 
            to="/auth/register" 
            className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
          >
            Sign up
          </Link>
        </p>
        </div>
    
  </div>
</div>

  )
}

export default Login