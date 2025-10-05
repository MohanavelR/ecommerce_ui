import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OTPbox from "../../common/OTPbox";
import { useSendResetOTP } from "../../../store/authSlice";
import { MessageContext } from "../../../context/context";
import { useDispatch } from "react-redux";

const ResetOTPVerify = ({ setOTP }) => {

  const [error, setError] = useState(false); 
  const dispatch=useDispatch()
  const { messageContextState, setMessageContextState } = useContext(MessageContext);

  const setOTPMethod = (e,otp) => {
    e.preventDefault();
    if (otp.length !== 6) { 
      setError(false);
      return;
    }
    setOTP(otp);
    setLoad(false); 
  };

  function resendOtp(e){
    e.preventDefault()

    const email= sessionStorage.getItem('resetEmail')
    if (email === '') {
          
        } else {
      
          dispatch(useSendResetOTP({ email }))
            .then((res) => {
              console.log(res);
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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <OTPbox error={error} resendOtp={resendOtp} onSubmit={setOTPMethod} />
       </div>
  );
};

export default ResetOTPVerify;