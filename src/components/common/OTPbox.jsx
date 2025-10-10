import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const OTPbox = ({ onSubmit, error, resendOtp, isLoading = false }) => {
  const inputRef = useRef([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendOn, setIsResendOn] = useState(false);
  const handleInput = (e, index) => {
    const value = e.target.value.trim();
    if (value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendOn(true);
    }
  }, [timeLeft]);
  function handleOTPForm(e) {
    const arrayOtp = inputRef.current.map((el) => el?.value).filter(Boolean); // Use optional chaining and filter out null/undefined values
    const otpValue = arrayOtp.join("");
    onSubmit(e, otpValue);
  }
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };
  return (
    <>
      <form className="space-y-8" onSubmit={handleOTPForm}>
        <div>
          <label className="form-label text-center block mb-6 text-gray-700 font-semibold text-lg">
            Enter OTP Code
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
                  className="w-12 h-14 text-2xl font-medium text-center py-3 border-1 border-gray-300 rounded-xl outline-none focus:border-primary  bg-gray-50 text-gray-800 transition-all duration-200 shadow-sm"
                  autoComplete="off"
                />
              ))}
          </div>
          {error && (
            <p className="text-sm font-medium text-red-600 text-center mt-4">
              Please Enter Your Otp
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-btn"
        >
          {isLoading ? <Loader /> : " Submit"}
        </button>
        <button
          onClick={resendOtp}
          disabled={!isResendOn}
          className="w-full text-center  font-medium transition-colors duration-200 
         text-blue-600 hover:text-blue-800 cursor-pointer 
         disabled:text-gray-400 disabled:cursor-default 
         disabled:hover:text-gray-400"
        >
          Resend OTP {timeLeft > 0 ? timeLeft : ""}
        </button>
      </form>
    </>
  );
};

export default OTPbox;
