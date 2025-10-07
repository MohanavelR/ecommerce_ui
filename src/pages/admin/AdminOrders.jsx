import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminOrderTable from '../../components/layout/admin/tables/AdminOrderTable'
import Loader from '../../components/common/Loader'
import AdminSingleOrder from '../../components/layout/admin/AdminSingleOrder'
import StateCard from '../../components/layout/admin/tables/StateCard'

const AdminOrders = () => {
  const {orderList,isLoading}=useSelector(state=>state.order)

  
  const [openOrderDetail,setOpenOrderDetail]=useState(false)
  const [orderId,setOrderId]=useState(null)
  const pendingOrders=(orderList && orderList.length > 0)? orderList.filter(order=>order?.orderStatus==="Pending").length:0
 const cancelledOrders=(orderList && orderList.length > 0)? orderList.filter(order=>order?.orderStatus==="Cancelled").length:0
 const deliveredOrders=(orderList && orderList.length > 0)? orderList.filter(order=>order?.orderStatus==="Delivered").length:0
  const shippedOrders=(orderList && orderList.length > 0)? orderList.filter(order=>order?.orderStatus==="Shipped").length:0 
 const statsConfig = [
    {
      title: 'Pending',
      count:pendingOrders,
      status: 'Pending',
      iconClass: 'fas fa-hourglass-half',
      colorClass: { 
        border: 'border-yellow-500', 
        bg: 'bg-white', 
        iconBg: 'bg-yellow-100', 
        iconText: 'text-yellow-600' 
      },
    },
    {
      title: 'Shipped',
      status: 'Shipped',
      count:shippedOrders,
      iconClass: 'fas fa-truck',
      colorClass: { 
        border: 'border-blue-500', 
        bg: 'bg-white', 
        iconBg: 'bg-blue-100', 
        iconText: 'text-blue-600' 
      },
    },
    {
      title: 'Delivered',
      status: 'Delivered',
      count:deliveredOrders,
      iconClass: 'fas fa-check-circle',
      colorClass: { 
        border: 'border-green-500', 
        bg: 'bg-white', 
        iconBg: 'bg-green-100', 
        iconText: 'text-green-600' 
      },
    },
    {
      title: 'Cancelled',
      status: 'Cancelled',
      count:cancelledOrders,
      iconClass: 'fas fa-times-circle',
      colorClass: { 
        border: 'border-red-500', 
        bg: 'bg-white', 
        iconBg: 'bg-red-100', 
        iconText: 'text-red-600' 
      },
    },
  ];
  
  function openOrderDetailMethod(id){
      setOrderId(id)
      setOpenOrderDetail(true)
  }
  function  closeOrderDetailMethod(){
    setOpenOrderDetail(false)
    setOrderId(null)

  }
  return (
    <div>
      {
        openOrderDetail && <AdminSingleOrder closeOrderDetailMethod={closeOrderDetailMethod} orderId={orderId}/>
      }
      {
        isLoading ?<Loader/>:
        <div>
          <div className="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div className="admin-header-box">
            <h1 className="admin-heading">Manage Orders</h1>
        </div>
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4' >
      {
        statsConfig.map((state)=><StateCard title={state.title} count={state.count} iconclassName={state.iconClass} colorclassName={state.colorClass}  />)
      }
    </div>
  <AdminOrderTable openOrderDetailMethod={openOrderDetailMethod} orders={orderList} isLoading={isLoading} />
        </div>
      }
    </div>
  )
}

export default AdminOrders