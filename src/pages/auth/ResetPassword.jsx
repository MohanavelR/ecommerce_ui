import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MessageContext } from '../../context/context'
import { useSendResetOTP } from '../../store/authSlice'
import ResetOTPVerify from '../../components/layout/auth/ResetOTPVerify'
import ChangeNewPassword from '../../components/layout/auth/ChangeNewPassword'

const ResetPassword = () => {
  const [email, setEmail]=useState("")
  const [otp,setOTP]=useState("")
    const [error,setError]=useState(false)
    const dispatch=useDispatch()
    

   const {  messageContextState,setMessageContextState}=useContext(MessageContext)
async function sendOtpForReset(){
    if(email===""){
        setError(true)
    }
    else{
      setError(false)
         dispatch(useSendResetOTP({email})).then(res=>{
            console.log(res)
            if(res.payload?.success){
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                sessionStorage.setItem("resetEmail",email)
                setEmail("")
              }
            else{
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
            }
        }).catch(err=>{
            setMessageContextState({...messageContextState,is_show:true,text:err?.message,success:false})
        })
     }
}
  return (
    <>
{
 !sessionStorage.getItem("resetEmail") ?
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
              value={email}
              onChange={(e)=>setEmail(e.target.value.trim())}
            />
              {
                error && 
              <p className="text-xs font-medium text-red-700">Email is required</p>
              }
            </div>
            <button onClick={sendOtpForReset} className='w-full mt-2 btn-hero'>Send OTP</button>
          </div>:(

      
        sessionStorage.getItem("resetEmail") &&
        (otp!==""?<ChangeNewPassword otp={otp}  />:<ResetOTPVerify otp={otp} setOTP={setOTP} />)
    )
}


        {/* Submit Button */}
    </>
  )
}

export default ResetPassword