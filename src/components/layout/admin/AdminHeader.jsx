import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../common/Logo'
import { LogoutContext, MessageContext } from '../../../context/context';


 const AdminHeader = ({sidebarOpen,setSidebarOpen}) => {
   const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  return (
       <>
      <header class="bg-white border-b z-[200] border-gray-200">
    <div class="flex items-center justify-between h-16 px-4">
      <div class="flex items-center space-x-4">
        {/* <!-- Mobile Menu Toggle --> */}
        <button onClick={()=>setSidebarOpen(!sidebarOpen)} class="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
          <i class="fas fa-bars w-5 h-5"></i>
        </button>

        {/* <!-- Logo --> */}
      <Logo/>
      </div>

      {/* <!-- Admin Actions --> */}
      <div class="flex items-center space-x-4">
     
        <button onClick={()=>setLogoutContextState(!logoutContextState)} class="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
          <i class="fas fa-sign-out-alt w-5 h-5"></i>
        </button>
      </div>
    </div>
  </header>
      
    </>
  )
}
export default AdminHeader