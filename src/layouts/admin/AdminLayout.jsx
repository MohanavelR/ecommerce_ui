import React, { useState } from 'react'

import {Outlet} from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminSidebar from '../../components/layout/admin/AdminSidebar'
import AdminHeader from '../../components/layout/admin/AdminHeader'
import { useGetAllProducts } from '../../store/productSlice'


 const AdminLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false)
   const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(useGetAllProducts())
   },[])

  return (
    <>
  <div className="min-h-screen bg-gray-50">
       <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       <div className="flex">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <main className="flex-1 max-h-[90vh] overflow-auto lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
       </div>
    </div>  
    </>
  )
}
export default AdminLayout
