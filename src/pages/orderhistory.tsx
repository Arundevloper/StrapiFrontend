import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";
import UserLayout from "./layout/UserLayout";
import { fetchOrderDetailById } from "./api/profile";
import Profile from "./_utils/types/Profile";

const OrderHistory = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
       if (isAuthenticated && user) {
        setLoading(true);
        try {
          const orderData = await fetchOrderDetailById(user.id);
          setOrders(orderData.data || []);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        //  setError("Failed to load your orders. Please try again later.");
        } finally {
          setLoading(false);
        }
       } else {
        router.push("/login");
       }
    };

    getOrders();
  }, [isAuthenticated, user, router]);

  const toggleMoreInfo = (orderId:Number) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <UserLayout>
        <section className="text-gray-600 w-full body-font">
          <div className="container mx-auto py-1 px-4 lg:px-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
              Your Orders
            </h1>
            {loading ? (
              <p className="text-center">Loading your orders...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : orders.length > 0 ? (
              <div className="flex flex-col gap-5">
                {orders.map((order) => {
                  const subtotal = order.order_item.price * order.order_item.quantity * (1 - order.order_item.discount / 100);
                  const totalAmount = subtotal + (order.payment.amount || 0); // Assuming `order.payment.amount` as additional fees

                  return (
                    <div key={order.order_id} className="border p-5 mb-5 rounded shadow">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Order ID: {order.order_id}</h2>
                        <p
                          className={`text-sm ${
                            order.payment.payment_status === "Paid" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          Status: {order.payment.payment_status || "Pending"}
                        </p>
                      </div>
                      <p className="text-gray-500">
                        Order Date: {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <h3 className="text-lg font-semibold">Items:</h3>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <h4 className="text-md text-gray-900">{order.order_item.documentId}</h4>
                          <div className="flex items-center">
                            <p className="text-gray-600 text-lg font-medium mr-4">
                              ₹{order.order_item.price - (order.order_item.price * order.order_item.discount) / 100} x {order.order_item.quantity}
                            </p>
                            <p className="text-gray-400 line-through text-sm">₹{order.order_item.price}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-lg text-gray-800">₹{totalAmount.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => toggleMoreInfo(order.order_id)}
                        className="text-blue-500 hover:underline mt-3"
                      >
                        {openOrderId === order.order_id ? "Less Info" : "More Info"}
                      </button>

                      {openOrderId === order.order_id && (
                        <div className="mt-5">
                          <div className="flex justify-between mt-5">
                            <div className="w-1/2 pr-4">
                              <h3 className="text-lg font-semibold">Price Summary:</h3>
                              <div className="flex justify-between">
                                <span>Total MRP:</span>
                                <span>₹{(order.order_item.price * order.order_item.quantity).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Discount on MRP:</span>
                                <span>
                                  -₹{((order.order_item.price * order.order_item.discount / 100) * order.order_item.quantity).toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{order.payment.amount > 0 ? `₹${order.payment.amount}` : "FREE"}</span>
                              </div>
                              <div className="flex justify-between font-bold">
                                <span>Subtotal:</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                              </div>
                            </div>

                            <div className="w-1/2 pl-4 border-l">
                              <h3 className="text-lg font-semibold">Shipping Address:</h3>
                              <p>{order.first_name} {order.last_name}</p>
                              <p>{order.address_line_1}</p>
                              {order.address_line_2 && <p>{order.address_line_2}</p>}
                              <p>
                                {order.city}, {order.state} {order.pincode}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5">
                            <h3 className="text-lg font-semibold">Payment Information:</h3>
                            <div className="flex justify-between">
                              <span>Payment Method:</span>
                              <span>{order.payment.PaymentMethod || "Not Available"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Transaction ID:</span>
                              <span>{order.payment.transaction_id || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment Status:</span>
                              <span>{order.payment.payment_status || "Pending"}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">No Orders Found</h2>
                <p className="text-gray-500">
                  You have not placed any orders yet. Browse our products and place your first order.
                </p>
              </div>
            )}
          </div>
        </section>
      </UserLayout>
      <Footer />
    </div>
  );
};

export default OrderHistory;
