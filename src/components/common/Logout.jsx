import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { LogoutContext, MessageContext } from '../../context/context'
import { useLogout } from '../../store/authSlice'

const Logout=() => {
     const {  messageContextState,setMessageContextState}=useContext(MessageContext)
     const {logoutContextState,setLogoutContextState}=useContext(LogoutContext)
     useContext(MessageContext)
    const dispatch=useDispatch()
    async function handleLogout(){
        dispatch(useLogout()).then(res=>{
            if(res.payload?.success){
              setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
              setLogoutContextState(false)
            }
            else{
              
              setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
              setLogoutContextState(false)
            }
        })
    }
  return (
    <>
<div className="bg-gradient-to-br z-[2000] fixed  from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
    {/* <!-- Logout Confirmation Dialog --> */}
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            {/* <!-- Header --> */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Confirm Logout</h2>
            </div>
            
            {/* <!-- Content --> */}
            <div className="p-6">
                <p className="text-gray-700 text-center mb-6">
                    Are you sure you want to logout? You will need to sign in again to access your account.
                </p>
                
                {/* <!-- Action Buttons --> */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={()=>setLogoutContextState(!logoutContextState)} className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200">
                        Cancel
                    </button>
                    <button onClick={handleLogout} className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-4 rounded-lg font-medium hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
    

    </>
  )
}

export default Logout