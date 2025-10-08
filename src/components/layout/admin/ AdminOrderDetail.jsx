import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Assuming OrderSummary component is available

import { MessageContext } from "../../../context/context";
import Loader from "../../common/Loader";
import {
  useGetAllOrders,
  useGetOrderById,
  useUpdateOrderStatus,
} from "../../../store/order";
import { OrderStatusBadge } from "./tables/AdminOrderTable";
import OrderSummary from "../shop/cart/orderSummary";

// --- Reusable Components (DetailLine, OrderItemRow) ---

// Helper line component (Unchanged)
const DetailLine = ({ label, value, highlight = false, large = false }) => (
  <div className="flex justify-between items-center text-gray-700">
    <dt
      className={`font-medium ${large ? "text-lg text-gray-900" : "text-sm"}`}
    >
      {label}
    </dt>
    <dd
      className={`${
        highlight ? "text-indigo-700 font-bold" : "text-gray-900 font-semibold"
      } ${large ? "text-lg" : "text-sm"}`}
    >
      {value}
    </dd>
  </div>
);

// Product Row (Unchanged)
const OrderItemRow = ({ item }) => {
  // ... (Your existing OrderItemRow logic)
  const qty = item.quantity || 1;
  // Fallback logic check omitted for brevity

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
            Unit Price: ₹{item.price.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-400">
            Original Price:{" "}
            <span className="line-through">
              ₹{item.sale_price.toLocaleString("en-IN")}
            </span>
          </p>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-bold text-indigo-700">
            ₹{(item.price * qty).toLocaleString("en-IN")}
          </p>
          <p className="text-sm line-through text-gray-400">
            ₹{(item.sale_price * qty).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </li>
  );
};
// --- END Reusable Components ---

const AdminOrderDetail = ({ closeOrderDetailMethod, orderId }) => {
  // Keep orderId prop if SingleOrder uses it
  const { isLoading, orderDetails } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { setMessageContextState, messageContextState } =
    useContext(MessageContext);
  const [newOrderStatus, setNewOrderStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (orderDetails && orderDetails.orderStatus) {
      setNewOrderStatus(orderDetails.orderStatus);
    }
  }, [orderDetails]);
  if (isLoading) return <Loader />;
  if (!orderDetails)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <p className="bg-white p-6 rounded-lg shadow-2xl text-xl text-gray-700">
          Order not found.
        </p>
      </div>
    );

  const {
    _id,
    createdAt,
    orderStatus,
    paymentMethods,
    paymentStatus,
    addressId,
    cartItems,
    paymentId,
  } = orderDetails;

  const items = cartItems || [];
  const calculateTotals = (items) => {
    if (!items || items.length === 0)
      return { subtotal: 0, discount: 0, totalItems: 0 };
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const originalTotal = items.reduce(
      (acc, item) => acc + item.sale_price * item.quantity,
      0
    );
    const discount = originalTotal - subtotal;
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    return { subtotal, discount, totalItems };
  };

  const { subtotal, discount, totalItems } = calculateTotals(cartItems);
  const shippingCost = 0;
  const total = subtotal + shippingCost;

  const handleUpdateStatus = async () => {
    dispatch(
      useUpdateOrderStatus({ orderId: _id, status: newOrderStatus })
    ).then((res) => {
      if (res.payload?.success) {
        setMessageContextState({
          ...messageContextState,
          is_show: true,
          text:
            res.payload?.message ||
            `Order status updated to ${newOrderStatus}.`,
          success: true,
        });
        dispatch(useGetAllOrders());
        dispatch(useGetOrderById(_id));
      } else {
        setMessageContextState({
          ...messageContextState,
          is_show: true,
          text: res.payload?.message || "Failed to update order status.",
          success: false,
        });
      }
    });
  };

  const possibleStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    // Modal Overlay Wrapper
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60  flex justify-center p-4 ">
      <div className="max-w-7xl w-full mx-auto my-4 lg:my-2">
        {/* Modal Content */}
        <div className="bg-gray-50 rounded-xl shadow-2xl relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition z-10 p-2 bg-white rounded-full shadow-md"
            onClick={closeOrderDetailMethod}
            aria-label="Close Order Details"
          >
            {/* Use an icon library for better visuals (e.g., Heroicons X or Font Awesome times) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* --- ADMIN STATUS CONTROL PANEL (New Section) --- */}
            <div className="bg-indigo-50 shadow rounded-xl p-5 border-2 border-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-indigo-900">
                  Manage Status
                </h2>
                <p className="text-sm text-indigo-700">
                  Current Status: <OrderStatusBadge status={orderStatus} />
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <select
                  value={newOrderStatus}
                  onChange={(e) => setNewOrderStatus(e.target.value)}
                  className="block w-full sm:w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base"
                  disabled={isUpdating}
                >
                  <option value="" disabled>
                    Select New Status
                  </option>
                  {possibleStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleUpdateStatus}
                  disabled={isUpdating || newOrderStatus === orderStatus}
                  className={`py-2 px-4 rounded-md text-base font-semibold transition ${
                    isUpdating || newOrderStatus === orderStatus
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 shadow"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
            {/* --- END ADMIN STATUS CONTROL PANEL --- */}

            {/* Header (Simplified since status is now in the control panel) */}
            <header className="bg-white shadow rounded-xl px-6 py-5 border border-gray-200">
              <h1 className="text-2xl font-extrabold text-gray-900">
                Order ID:{" "}
                <span className="text-indigo-600 font-mono">
                  #{_id.slice(-8).toUpperCase()}
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {new Date(createdAt).toLocaleDateString("en-GB")}
              </p>
            </header>

            {/* Shipping + Payment (Layout adjustment for admin view) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Shipping */}
              <div className="bg-white shadow rounded-xl p-6 border border-gray-200 md:col-span-1">
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
              <div className="bg-white shadow rounded-xl p-6 border border-gray-200 md:col-span-2">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-accent border-b pb-2">
                  Payment Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <DetailLine
                      label="Method"
                      value={paymentMethods}
                      large={true}
                    />
                    <DetailLine label="Payment ID" value={paymentId || "N/A"} />
                  </div>
                  <div className="space-y-2">
                    <DetailLine
                      label="Payment Status"
                      value={""}
                      large={true}
                    />
                    <span
                      className={`px-3 py-1 text-base font-semibold rounded-full ${
                        paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {paymentStatus}
                    </span>
                  </div>
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

            {/* Summary (Kept your OrderSummary component) */}
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              totalItems={totalItems}
              total={total}
            />

            {/* --- ADMIN ACTIONS --- */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              {/* Optional: Add a button to manually trigger a fulfillment notification */}
              <button
                className="py-3 px-6 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md font-semibold transition"
                onClick={() => alert("Simulate Send Fulfillment Email...")}
              >
                Send Email Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
