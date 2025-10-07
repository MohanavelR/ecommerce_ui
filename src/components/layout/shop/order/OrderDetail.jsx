import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import { OrderStatusBadge } from './ShopOrderListTable';
import OrderSummary from '../cart/orderSummary';
import { MessageContext } from '../../../../context/context';
import { useCancelOrder, useGetUserOrders } from '../../../../store/order';

// Helper line component
const DetailLine = ({ label, value, highlight = false, large = false }) => (
  <div className="flex justify-between items-center text-gray-700">
    <dt className={`font-medium ${large ? 'text-lg text-gray-900' : 'text-sm'}`}>{label}</dt>
    <dd
      className={`${
        highlight
          ? 'text-indigo-700 font-bold'
          : 'text-gray-900 font-semibold'
      } ${large ? 'text-lg' : 'text-sm'}`}
    >
      {value}
    </dd>
  </div>
);

// Product Row
const OrderItemRow = ({ item }) => {

  const qty = item.quantity || 1;

  if (!item) {
    return (
      <li className="flex py-4 text-gray-500 italic">
        Product data missing (ID: {item.productId?._id || 'N/A'})
      </li>
    );
  }

  return (
    <li className="flex py-5 items-start border-b border-gray-100 last:border-b-0">
      {/* Image */}
      <div className="h-20 w-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="ml-4 flex flex-grow justify-between">
        <div>
          <p className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition">
            {item.title}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Qty: <span className="font-medium">{qty}</span>
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            Unit Price: ₹{item.price.toLocaleString('en-IN')}
            
          </p>
           <p className="text-xs   text-gray-400">
            Original Price: <span className='line-through'>₹{(item.sale_price).toLocaleString('en-IN')}</span> 
          </p>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-700">
            ₹{(item.price * qty).toLocaleString('en-IN')}
          </p>
            <p className="text-sm line-through  text-gray-400">
            ₹{(item.sale_price * qty).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </li>
  );
};

const OrderDetail = ({closeOrderDetailMethod}) => {
  const { isLoading, orderDetails } = useSelector((state) => state.order);
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  const {setMessageContextState,messageContextState}=useContext(MessageContext)
 
  if (isLoading) return <Loader />;
  if (!orderDetails)
    return <p className="text-center py-10 text-gray-500">Order not found.</p>;

  const {
    _id,
    createdAt,
    orderStatus,
    totalAmount,
    paymentMethods,
    paymentStatus,
    addressId,
    cartItems,
    paymentId,
  } = orderDetails;

  const items = cartItems || [];
 const calculateTotals = (items) => {
  if (!items || items.length === 0) {
     return { subtotal: 0, discount: 0, totalItems: 0 };
  }
  const subtotal = 
  items.reduce((acc, item) => acc + (item.price * item.quantity),
   0
  );
  const originalTotal = items.reduce((acc, item) => acc + (item.sale_price) * item.quantity, 0);
  const discount = originalTotal - subtotal;
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return { subtotal, discount, totalItems };
};

  const { subtotal, discount, totalItems } = calculateTotals(cartItems);
  const shippingCost=0
  
  const total = subtotal + shippingCost;
function cancelorder(id){
  
  if(confirm("Are sure to Cancel Order?")){
    dispatch(useCancelOrder({orderId:id})).then(res=>{
      if(res.payload?.success){
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
        dispatch(useGetUserOrders(user.id))
        closeOrderDetailMethod()
      }
      else{
         setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
    })
  }
}
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="bg-white shadow rounded-xl px-6 py-5 flex flex-col sm:flex-row justify-between sm:items-center border border-gray-200">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Order #{_id.slice(-8).toUpperCase()}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {new Date(createdAt).toLocaleDateString('en-GB')}
            </p>
          </div>
          <OrderStatusBadge status={orderStatus} />
        </header>

        {/* Shipping + Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-accent pb-2">
              Shipping Details
            </h2>
            <p className="font-semibold text-gray-900">{addressId.title}</p>
            <address className="not-italic text-gray-600 text-sm space-y-1 mt-1">
              <p>
                {addressId.address}, {addressId.city} - {addressId.pincode}
              </p>
              <p>Phone: {addressId.phone}</p>
            </address>
          </div>

          {/* Payment */}
          <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-accent border-b pb-2">
              Payment
            </h2>
            <DetailLine label="Method" value={paymentMethods} />
            <DetailLine label="Payment ID" value={paymentId || 'N/A'} />
            <div className="mt-3">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  paymentStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 border-accent mb-4 border-b pb-2">
            Products ({totalItems})
          </h2>
          <ul className="divide-y divide-gray-200">
            {items.map((item, i) => (
              <OrderItemRow key={i} item={item} />
            ))}
          </ul>
        </div>

        {/* Summary */}

        <OrderSummary
              subtotal={subtotal}
              discount={discount}
              totalItems={totalItems} 
              total={total}
            />
      </div>
      {
       orderStatus !=="cancelled" &&
          <button  className='mt-3 w-full py-3 bg-red-500 text-white hover:bg-red-800 ' onClick={()=>cancelorder(orderDetails._id)}>Cancel order</button>
      }
    
      <button  className='mt-3 w-full py-3 bg-blue-700 text-white hover:bg-blue-900 ' onClick={closeOrderDetailMethod}>Close</button>
    </div>
  );
};

export default OrderDetail;
