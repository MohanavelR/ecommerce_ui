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
     
     // IMPORTANT: The email should only be pulled from the user object if it exists.
     const userEmail = user?.email;
     if (!userEmail) {
         setError("User email not found. Please log in again.");
         return;
     }

     dispatch(useVerifyAccount({otp:otpValue, email: userEmail})).then(res=>{
             if(res.payload?.success){
               console.log(res.payload)
               sessionStorage.removeItem("isSubmitted")
               setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
               dispatch(useAuth())
               navigate("/shop/home")
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
 
   // Redirect if not necessary to verify
   if(!sessionStorage.getItem('isSubmitted') || user?.isVerified ){
      return <Navigate to="/shop"/>
   }
   
   return (
     // IMPRESSIVE CARD: Consistent with Register component
     <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-auto border border-gray-100 transition-all duration-300 hover:shadow-green-500/30 transform hover:-translate-y-1 my-8">
       
        <div className="text-center mb-10">
           {/* IMPRESSIVE HEADER: Gradient text for strong visual appeal */}
           <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 tracking-tight">
             Verify Account
           </h2>
           <p className="text-gray-500 text-lg">A 6-digit code has been sent to your email.</p>
        </div>

       <form className="space-y-8" onSubmit={handleVerifyAccount}>
         {/* OTP Input Fields */}
         <div>
           <label className="form-label text-center block mb-6 text-gray-700 font-semibold text-lg">
             Enter Verification Code
           </label>
           <div className="flex justify-center space-x-3">
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
                   // IMPRESSIVE INPUT STYLES: Larger, rounded, focused green ring
                   className="w-12 h-14 text-2xl font-semibold text-center py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 bg-gray-50 text-gray-800 transition-all duration-200 shadow-sm"
                   autoComplete="off" // Disable autocomplete
                 />
               ))}
           </div>
           {error && <p className="text-sm font-medium text-red-600 text-center mt-4">{error}</p>}
         </div>
 
         {/* Submit Button */}
         <button
           type="submit"
           // IMPRESSIVE BUTTON: Gradient background, large size, shadow/lift on hover
           className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-xl py-3.5 text-lg shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.01] flex justify-center items-center h-14 disabled:opacity-70 disabled:shadow-none"
         >
          Verify Account
         </button>
       </form>
     </div>
   );
 };
 

export default VerifyAccount;
