import React, { useState } from 'react'

import {Outlet} from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminSidebar from '../../components/layout/admin/AdminSidebar'
import AdminHeader from '../../components/layout/admin/AdminHeader'
import { useGetAllProducts } from '../../store/productSlice'
import { useGetAllCategory } from '../../store/categorySlice'
import { useGetAllBanners } from '../../store/admin/adbanner'
import { useGetAllUsers } from '../../store/admin/userSlice'
import { useGetAllSliders } from '../../store/admin/sliderSlice'
import { useGetAllComingSoon } from '../../store/admin/comingsoonSlice'
import Loader from '../../components/common/Loader'
import PageLoader from '../../components/common/PageLoader'
import { useGetAllOrders } from '../../store/order'


 const AdminLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false)
  
   const dispatch=useDispatch()
   useEffect(()=>{
    dispatch(useGetAllProducts())
    dispatch(useGetAllCategory())
    dispatch(useGetAllBanners())
    dispatch(useGetAllUsers())
    dispatch(useGetAllSliders())
    dispatch(useGetAllComingSoon())
    dispatch(useGetAllOrders())
   },[])



  return (
    <>{

    }
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
