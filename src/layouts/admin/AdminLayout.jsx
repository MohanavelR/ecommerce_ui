import React, { useState } from 'react'

import {Outlet} from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminSidebar from '../../components/layout/admin/AdminSidebar'
import AdminHeader from '../../components/layout/admin/AdminHeader'


 const AdminLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false)
   const dispatch=useDispatch()


  return (
    <>
  <div className="flex h-screen">
       <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />    
      <div className="flex-1 flex flex-col">
       <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />  
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
    <Outlet/>
    </main>
    </div>  
    </div>  
    </>
  )
}
export default AdminLayout
