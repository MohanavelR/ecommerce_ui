import React from 'react';
import Loader from '../../../common/Loader';
// Assuming the use of Font Awesome for icons

// --- OrderStatusBadge Component (Unchanged, as it's already well-designed) ---
export const OrderStatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-100 text-gray-800';
  let iconClass = 'fas fa-info-circle';
  let iconColor = 'text-gray-400';
  if (status === 'Delivered') {
    colorClasses = 'bg-green-100 text-green-800';
    iconColor = 'text-green-500';
    iconClass = 'fas fa-check-circle';
  } else if (status === 'Shipped') {
    colorClasses = 'bg-blue-100 text-blue-800';
    iconColor = 'text-blue-500';
    iconClass = 'fas fa-truck'; 
  } else if (status === 'Processing' || status === 'Pending') {
    colorClasses = 'bg-yellow-100 text-yellow-800';
    iconColor = 'text-yellow-500';
    iconClass = 'fas fa-hourglass-half';
  } else if (status === 'Cancelled') {
    colorClasses = 'bg-red-100 text-red-800';
    iconColor = 'text-red-500';
    iconClass = 'fas fa-times-circle';
  }

  return (
    <span className={`inline-flex items-center rounded-full text-xs font-medium ${colorClasses} pr-3`}>
      {/* Note: Ensure Font Awesome is included in your project for these icons */}
      <i className={`${iconClass} ${iconColor} h-4 w-4 -ml-1 mr-1.5`} aria-hidden="true"></i>
      {status}
    </span>
  );
};

// --- Main Order List Page (Clean & Compact Design) ---
const AdminOrderTable = ({ orders,isLoading,openOrderDetailMethod }) => {
  if (isLoading) return <Loader />;

  if (!orders || orders.length === 0)
    return <p className="text-center py-10 text-gray-500 bg-white shadow rounded-lg mx-auto max-w-lg mt-6">No Orders found in your history.</p>;

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full bg-white shadow-xl rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="admin-table-th">Order ID</th>
                <th className="admin-table-th">Name</th>
                <th className="admin-table-th">Email</th>
                <th className="admin-table-th">Date</th>
                <th className="admin-table-th">Total Amount</th>
                <th className="admin-table-th">Status</th>
                <th className="admin-table-th">Items</th>
                {/* REMOVED the redundant 'Product' column */}
                <th className="relative py-3 pr-6 pl-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            
            {/* --- Body: Added Zebra Stripes and Text Styling --- */}
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, index) => {
                const itemsCount = order.cartItems?.length || 0;
                
                // Add a striped background based on the index
                const rowClasses = index % 2 === 0 
                  ? 'bg-white hover:bg-gray-50 transition duration-150' 
                  : 'bg-gray-50 hover:bg-gray-100 transition duration-150';

                return (
                  <tr key={order._id} className="admin-table-tr">
                    
                    {/* Order ID: Bolder and more prominent */}
                    <td className="py-4 pl-6 pr-3 whitespace-nowrap text-sm font-bold text-indigo-700">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                     <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.userId?.firstName}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order?.userId?.email}
                    </td>
                    
                    {/* Date: Standard gray text */}
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    
                    {/* Total: Large, bold, and green for finance visibility */}
                    <td className="px-3 py-4 whitespace-nowrap text-lg font-medium text-primary">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    
                    {/* Status: Using the Badge component */}
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      <OrderStatusBadge status={order.orderStatus} />
                    </td>
                    
                    {/* Items: Hidden on small screens to save space */}
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-700 hidden sm:table-cell">
                      {itemsCount} {itemsCount > 1 ? 'items' : 'item'}
                    </td>
                    
                    {/* Action Button: Focused on the right */}
                    <td className="py-4 pl-3 pr-6 text-right whitespace-nowrap text-sm font-medium">
                      <button onClick={()=>openOrderDetailMethod(order?._id)} className="text-indigo-600 hover:text-indigo-900 transition duration-150 p-1 rounded">
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderTable;

