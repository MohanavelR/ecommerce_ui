import React, { useRef, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth, useSendverifyOTP, useVerifyAccount } from "../../store/authSlice";
import { MessageContext } from "../../context/context";
import OTPbox from "../../components/common/OTPbox";

const VerifyAccount = () => {
   const {messageContextState,setMessageContextState}=useContext(MessageContext)
   const navigate = useNavigate();
   const [error, setError] = useState(false);
   const dispatch=useDispatch()
   const [isLoading,setIsLoading]=useState(false)
   const {user}=useSelector(state=>state.auth)
function resendOtp(e){
    e.preventDefault()
    if (user?.email === '') {
        } else {
          dispatch(useSendverifyOTP({ email:user?.email }))
            .then((res) => {
              if (res.payload?.success) {
                setMessageContextState({ ...messageContextState, is_show: true, text: res.payload?.message, success: true });
                sessionStorage.setItem('resetEmail', email);
                
              } else {
                setMessageContextState({ ...messageContextState, is_show: true, text: res.payload?.message, success: false });
              }
            })
            .catch((err) => {
              setMessageContextState({ ...messageContextState, is_show: true, text: err?.message, success: false });
            });
        }
  }

   const handleVerifyAccount = (e,otp) => {
     e.preventDefault(); 
     setIsLoading(true)
     if (otp.length !== 6) {
       setError(true);
       return;
     }
     
     const userEmail = user?.email;
     if (!userEmail) {
         setMessageContextState({...messageContextState,is_show:true,text:"User email not found. Please log in again.",success:false});
         return;
     }

     dispatch(useVerifyAccount({otp, email: userEmail})).then(res=>{
             if(res.payload?.success){
               console.log(res.payload)
               sessionStorage.removeItem("isSubmitted")
               setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                setIsLoading(false)
               dispatch(useAuth())
               navigate("/shop/home")
             }
             else{
                setIsLoading(false)
               setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
             }
            })
     
   };
 
   if(!sessionStorage.getItem('isSubmitted') || user?.isVerified ){
      return <Navigate to="/shop"/>
   }
   
   return (
     <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full mx-auto border border-gray-100 transition-all duration-300 hover:shadow-green-500/30 transform hover:-translate-y-1 my-8">
       
        <div className="text-center mb-10">
           {/* IMPRESSIVE HEADER: Gradient text for strong visual appeal */}
           <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 tracking-tight">
             Verify Account
           </h2>
           <p className="text-gray-500 text-lg">A 6-digit code has been sent to your email.</p>
        </div>

       <OTPbox resendOtp={resendOtp} isLoading={isLoading} onSubmit={handleVerifyAccount} error={error}  />
     </div>
   );
 };
 

export default VerifyAccount;
