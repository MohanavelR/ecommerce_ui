import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth, useVerifyAccount } from "../../store/authSlice";
import { MessageContext } from "../../context/context";
const VerifyAccount = () => {
    const {messageContextState,setMessageContextState}=useContext(MessageContext)
   const inputRef = useRef([]);
   const navigate = useNavigate();
   const [error, setError] = useState("");
   const dispatch=useDispatch()
   const {user}=useSelector(state=>state.auth)

   /* Collect OTP and submit */
   const handleVerifyAccount = (e) => {
     e.preventDefault();
     setError(""); 
     const arrayOtp = inputRef.current.map((el) => el?.value).filter(Boolean); // Use optional chaining and filter out null/undefined values
     const otpValue = arrayOtp.join("");
 
     if (otpValue.length !== 6) {
       setError("Please enter a 6-digit OTP.");
       return;
     }
     dispatch(useVerifyAccount({otp:otpValue,email:user.email})).then(res=>{
             if(res.payload?.success){
               console.log(res.payload)
               sessionStorage.removeItem("isSubmitted")
               setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
               dispatch(useAuth())
               navigate("/shop")
             }
             else{
               
               setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
             }
            })
     
   };
 
   /* Auto-focus next input */
   const handleInput = (e, index) => {
     // Trim the input value to handle any leading/trailing spaces
     const value = e.target.value.trim();
     if (value.length > 0 && index < inputRef.current.length - 1) {
       inputRef.current[index + 1]?.focus();
     }
   };
 
   /* Backspace focus previous input */
   const handleKeyDown = (e, index) => {
     if (e.key === "Backspace" && e.target.value === "" && index > 0) {
       inputRef.current[index - 1]?.focus();
     }
   };
;
   if(!sessionStorage.getItem('isSubmitted') || user.isVerified ){
      return <Navigate to="/shop"/>
   }
   return (
     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
       <form className="space-y-6" onSubmit={handleVerifyAccount}>
         {/* OTP Input Fields */}
         <div>
           <label className="form-label text-center block mb-4 text-gray-700 font-medium">
             Enter Verification Code
           </label>
           <div className="flex justify-center space-x-2">
             {Array(6)
               .fill(0)
               .map((_, index) => (
                 <input
                   key={index}
                   type="text"
                   maxLength="1"
                   ref={(el) => (inputRef.current[index] = el)}
                   onInput={(e) => handleInput(e, index)}
                   onKeyDown={(e) => handleKeyDown(e, index)}
                   className="w-12 h-12 text-center py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
                   autoComplete="off" // Disable autocomplete
                 />
               ))}
           </div>
           {error && <p className="text-xs font-medium text-red-700 text-center mt-3">{error}</p>}
         </div>
 
         
 
         {/* Submit Button */}
         <button
           type="submit"
           className="w-full btn-hero transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed"
         >
          Verify Account
         </button>
       </form>
     </div>
   );
 };
 

export default VerifyAccount