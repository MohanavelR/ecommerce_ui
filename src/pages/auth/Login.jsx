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
    // Using loginErrorObj for local error checking, not registerError
    const localError=deepcopyObj(loginErrorObj) 
    
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
    // 1. IMPRESSIVE CARD: High contrast white background, prominent shadow, subtle hover lift (shadow-2xl, hover:shadow-primary/30).
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-auto border border-gray-100 transition-all duration-300 hover:shadow-primary/30 transform hover:-translate-y-1">
      <div className="text-center mb-10">
        {/* 2. IMPRESSIVE HEADER: Gradient text for strong visual appeal */}
        <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-lg">Sign in to your EcoShop account</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlesubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="auth-form-label"
            >
              Email address<span className="text-red-500 text-lg">*</span>
            </label>
            <div className="mt-1 relative">
               {/* Icon placement adjusted */}
               <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
              <input
              id="email"
              type="email"
              required
              // 3. IMPRESSIVE INPUTS: Clean design, strong primary focus ring/shadow, large padding
              className="auth-form-input-with-icon"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />
              {
                fieldErrors.email.isRequired && 
              <p className="text-xs font-medium text-red-600 mt-1">Email is required</p>
              }
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="auth-form-label"
            >
              Password<span className="text-red-500 text-lg">*</span>
            
            </label>
            <div className="mt-1 relative">
         {/* Icon placement adjusted */}
         <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5"></i>
             <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              // 3. IMPRESSIVE INPUTS: Clean design, strong primary focus ring/shadow, large padding
              className="auth-form-input-with-icon"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary p-1 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={showPassword ? "fas fa-eye-slash w-5 h-5" : "fas fa-eye w-5 h-5"}></i>
            </button>
              {
                fieldErrors.password.isRequired && 
              <p className="text-xs  font-medium text-red-600 mt-1">Password is required</p>
              }
          
            </div>
             <div className="flex mt-3 items-center justify-end">
      
          {/* 4. LINKS: Clear and uses primary color */}
          <Link 
            to="/auth/forget-password" 
            className="text-sm font-medium text-primary hover:text-green-700 transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>

          </div>
         

          <div>
            {/* 4. IMPRESSIVE BUTTON: Gradient background, large size, shadow/lift on hover */}
            <button
              type="submit"
              onClick={handlesubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-green-600 text-white font-bold rounded-xl py-3.5 text-lg shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.01] flex justify-center items-center h-14 disabled:opacity-70 disabled:shadow-none"
            >
              {
                isLoading ?<Loader/>:"Sign in"
              }
            </button>
          </div>
        </form>

      {/* 5. IMPRESSIVE FOOTER: Clear separation and bold link */}
      <div className="px-6 py-4 mt-8 border-t border-gray-200 text-center">
             <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link 
            to="/auth/register" 
            className="text-primary hover:text-green-700 transition-colors duration-200 font-bold ml-1"
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
