import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../common/Logo'
import { LogoutContext, MessageContext } from '../../../context/context';


 const AdminHeader = ({sidebarOpen,setSidebarOpen}) => {
   const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  return (
       <>
      <header class="bg-white border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-4">
      <div class="flex items-center space-x-4">
        {/* <!-- Mobile Menu Toggle --> */}
        <button class="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
          <i class="fas fa-bars w-5 h-5"></i>
        </button>

        {/* <!-- Logo --> */}
        <a href="/admin" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">E</span>
          </div>
          <h1 class="text-xl font-bold text-blue-600">EcoShop Admin</h1>
        </a>
      </div>

      {/* <!-- Admin Actions --> */}
      <div class="flex items-center space-x-4">
        <a href="/" class="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">View Store</a>
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