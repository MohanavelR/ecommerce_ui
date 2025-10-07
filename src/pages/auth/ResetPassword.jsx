import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MessageContext } from '../../context/context';
import { useSendResetOTP } from '../../store/authSlice';
import ResetOTPVerify from '../../components/layout/auth/ResetOTPVerify';
import ChangeNewPassword from '../../components/layout/auth/ChangeNewPassword';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const { messageContextState, setMessageContextState } = useContext(MessageContext);

  async function sendOtpForReset() {
    if (email === '') {
      setError(true);
    } else {
      setError(false);
      dispatch(useSendResetOTP({ email }))
        .then((res) => {
          
          if (res.payload?.success) {
            setMessageContextState({ ...messageContextState, is_show: true, text: res.payload?.message, success: true });
            sessionStorage.setItem('resetEmail', email);
            setEmail('');
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
    // Outer container for centering and background
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        
        <h2 className="admin-heading text-center mb-6">
          Reset Password
        </h2>

        {
          !sessionStorage.getItem('resetEmail') ? (
            // Email Input Form
            <div>
              <p className="text-sm text-center text-gray-600 mb-6">
                Enter your email address to receive an OTP for password reset.
              </p>
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email address<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-1 relative">
                  <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                  <input
                    id="email"
                    type="email"
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary-500 bg-gray-50 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out ${
                      error ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                  />
                  {error && (
                    <p className="mt-1 text-sm font-medium text-red-600">Email is required</p>
                  )}
                </div>
              </div>

              {/* Send OTP Button - Styled with bg-primary */}
              <button
                onClick={sendOtpForReset}
                className="w-full mt-6 px-4 py-3 text-lg font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition duration-300 ease-in-out disabled:opacity-50"
              >
                Send OTP
              </button>
            </div>
          ) : (
            // OTP Verification or Change Password Components
            sessionStorage.getItem('resetEmail') &&
            (otp !== '' ? (
              <ChangeNewPassword otp={otp} />
            ) : (
              <ResetOTPVerify otp={otp} setOTP={setOTP} />
            ))
          )
        }
      </div>
    </div>
  );
};

export default ResetPassword;