import React, { useEffect, useState } from 'react';
import ShopOrderListTable from '../../components/layout/shop/order/ShopOrderListTable';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserOrders } from '../../store/order';
import SingleOrder from '../../components/layout/shop/order/SingleOrder';


const ShopOrder = () => {
  const { ordersByUser, isLoading } = useSelector(state => state.order);
  const { user,isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [openOrderDetail,setOpenOrderDetail]=useState(false)
  const [orderId,setOrderId]=useState(null)
  useEffect(() => {
    if (user && user.id)
      dispatch(useGetUserOrders(user.id));
  }, [dispatch, user,isAuthenticated]);
  
  function openOrderDetailMethod(id){
      setOrderId(id)
      setOpenOrderDetail(true)
  }
  function  closeOrderDetailMethod(){
    setOpenOrderDetail(false)
    setOrderId(null)

  }
  return (
    <>
  {
      openOrderDetail && <SingleOrder closeOrderDetailMethod={closeOrderDetailMethod} orderId={orderId} />
  }
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 lg:p-12">
      <div className="max-w-9xl mx-auto">
        
        {/* --- Page Heading --- */}
        <header className="pb-6 border-b-2 border-gray-300">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Transaction History 🧾
          </h1>
          <p className='mt-1 text-lg text-gray-500'>
            A complete overview of all your placed orders.
          </p>
        </header>
        
        {/* --- Order List Table Component (Now using the modern style) --- */}
        
        <ShopOrderListTable openOrderDetailMethod={openOrderDetailMethod} isLoading={isLoading} orders={ordersByUser} />
        {/* Replace the above with: <ShopOrderListTable isLoading={isLoading} orders={ordersByUser} /> 
            once you've applied these styles to your original table component. */}

      </div>
    </div>
    </>
  );
};

export default ShopOrder;