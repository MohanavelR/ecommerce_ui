import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { LogoutContext, MessageContext } from '../../context/context'
import { useLogout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    // Note: useContext(MessageContext) is called twice in the original, I removed the redundant one.
    const { messageContextState, setMessageContextState } = useContext(MessageContext);
    const { logoutContextState, setLogoutContextState } = useContext(LogoutContext);
    const dispatch = useDispatch();
    const nav=useNavigate()
    const [isLoggingOut, setIsLoggingOut] = React.useState(false); // State for loading

    async function handleLogout() {
        setIsLoggingOut(true); // Start loading
        dispatch(useLogout()).then(res => {
            if(res.payload?.success){
 setMessageContextState({ ...messageContextState, is_show: true, text:res.payload?.message, success: res.payload?.success});
setLogoutContextState(false);  
nav("/auth/login")          
}
            else{
setMessageContextState({ ...messageContextState, is_show: true, text:res.payload?.message, success: res.payload?.success});
setLogoutContextState(false);
            }
          
            
            
            
        }).catch(() => {
            // Handle network or other unexpected errors
            setMessageContextState({ ...messageContextState, is_show: true, text: "A network error occurred.", success: false });
            setLogoutContextState(false);
            setIsLoggingOut(false);
        });
    }

    return (
        // The modal overlay: fixed, dark background, centered content, z-index for top layer
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[2000] backdrop-blur-sm transition-opacity duration-300">
            {/* */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 ease-out duration-300">
                
                {/* */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center relative">
                    {/* Centered large icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 border-2 border-white/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-extrabold text-white">Sign Out Confirmation</h2>
                </div>
                
                {/* */}
                <div className="p-8">
                    <p className="text-gray-700 text-center mb-8">
                        Are you sure you want to end your session? You will need to sign in again.
                    </p>
                    
                    {/* */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Cancel Button */}
                        <button 
                            onClick={() => setLogoutContextState(false)} 
                            disabled={isLoggingOut}
                            className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition duration-200 shadow-sm disabled:cursor-not-allowed disabled:opacity-70">
                            Cancel
                        </button>

                        {/* Logout Button with Loader */}
                        <button 
                            onClick={handleLogout} 
                            disabled={isLoggingOut}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition duration-200 shadow-lg shadow-red-500/30 flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-70">
                            {isLoggingOut ? (
                                <>
                                    {/* Using a simple circular loader here - adjust with your 'Loader' component if available */}
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing Out...
                                </>
                            ) : (
                                "Sign Out"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Logout;