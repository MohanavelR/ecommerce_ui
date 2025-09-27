import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../common/Logo'
import { LogoutContext, MessageContext } from '../../../context/context';


 const AdminHeader = ({sidebarOpen,setSidebarOpen}) => {
   const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  return (
       <>
      {/* Set the header to sticky/fixed for better navigation experience if needed, 
          but keeping the original classes for consistency. */}
      <header className="bg-white border-b z-[200] border-gray-200 sticky top-0">
        <div className="flex items-center justify-between h-16 px-4">
          
          {/* */}
          <div className="flex items-center space-x-4">
            <Logo/>
            {/* <span className="text-lg font-semibold text-gray-800 hidden md:block">Admin Panel</span> */}
          </div>

          {/* */}
          <div className="flex items-center space-x-4">
            
            {/* */}
            {/* The Logout logic is kept as is, using the context to toggle the state */}
            <button 
                onClick={()=>setLogoutContextState(!logoutContextState)} 
                className="p-2 text-gray-700 hover:text-red-600 transition-colors duration-200 focus:outline-none"
                aria-label="Logout"
            >
              <i className="fas fa-sign-out-alt w-5 h-5"></i>
            </button>
            
            {/* */}
            <button 
                onClick={()=>setSidebarOpen(!sidebarOpen)} 
                className="lg:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 focus:outline-none"
                aria-label="Toggle Menu"
            >
              <i className="fas fa-bars w-5 h-5"></i>
            </button>
            
          </div>
        </div>
      </header>
      
    </>
  )
}
export default AdminHeader