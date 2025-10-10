import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useGetOrderById } from '../../../../store/order'
import OrderDetail from './OrderDetail'

const SingleOrder = ({orderId,closeOrderDetailMethod}) => {
  const dispatch=useDispatch()
 useEffect(()=>{
  dispatch(useGetOrderById(orderId))
 },[])

  return (
   <div className="fixed inset-0 bg-black/60 z-[4000] overflow-y-auto p-4">
      <div className="container mx-auto max-w-5xl ">
      <OrderDetail closeOrderDetailMethod={closeOrderDetailMethod} />
    </div>
    </div>
  )
}

export default SingleOrder