import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/router";
import UserLayout from "./layout/UserLayout";
import { fetchOrderDetailById } from "./api/profile";
import Profile from "./_utils/types/Profile";
import OrderImageCard from "./components/OrderImageCard";

const OrderHistory = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const [orders, setOrders] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [openOrderId, setOpenOrderId] = useState<number | null>(null); // Assuming order IDs are numbers
  const [productNames, setProductNames] = useState<{ [key: number]: string }>(
    {}
  ); // State to hold product names

  useEffect(() => {
    const getOrders = async () => {
      if (isAuthenticated && user) {
        try {
          const orderData = await fetchOrderDetailById(user.id);
          setOrders(orderData.data || []);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          setError("Failed to load your orders. Please try again later.");
        }
      }
    };

    if (!loading) {
      if (isAuthenticated) {
        getOrders();
      } else {
        router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      }
    }
  }, [isAuthenticated, loading, user, router]);

  const toggleMoreInfo = (orderId: number) => {
    if (openOrderId === orderId) {
      setOpenOrderId(null);
    } else {
      setOpenOrderId(orderId);
    }
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
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : orders.length > 0 ? (
              <div className="flex flex-col gap-5">
                {orders.map((order) => {
                  // Calculate the subtotal dynamically for all order items
                  const subtotal = order.order_items.reduce((acc, item) => {
                    return (
                      acc +
                      item.price * item.quantity * (1 - item.discount / 100)
                    );
                  }, 0);

                  // Add shipping cost to the subtotal to get total amount
                  const totalAmount = subtotal + 12; // Assuming shipping cost is ₹12
                  // Assuming shipping fee is fixed at 12

                  return (
                    <div
                      key={order.order_id}
                      className="border p-5 mb-5 rounded shadow"
                    >
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                          Order ID: {order.order_id}
                        </h2>
                        {order && order.payment ? (
                          <p
                            className={`text-sm ${
                              order.payment.payment_status === "Paid"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {order.payment.payment_status === "Paid"
                              ? "Paid"
                              : "NA"}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">Loading...</p>
                        )}
                      </div>
                      <p className="text-gray-500">
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <h3 className="text-lg font-semibold">Items:</h3>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="flex items-center justify-between  pb-2">
                            {Array.isArray(order.order_items) &&
                              order.order_items.map(
                                (item: any, index: number) => {
                                  const { slug, product_name } = item.product;
                                  const {
                                    price,
                                    discount = 0,
                                    quantity,
                                  } = item; // Default discount to 0 if not present
                                  const discountedPrice =
                                    price - (price * discount) / 100;
                                  const totalPrice = discountedPrice * quantity;

                                  return (
                                    <div
                                      key={index}
                                      className="flex items-start gap-4"
                                    >
                                      <OrderImageCard productSlug={slug} />
                                      <div>
                                        <h4 className="text-md text-gray-900">
                                          {product_name}
                                        </h4>
                                        <div className="flex items-center">
                                          <p className="text-gray-600 text-lg font-medium mr-4">
                                            ₹{discountedPrice} x {quantity} = ₹
                                            {totalPrice}
                                          </p>
                                          {discount > 0 && (
                                            <p className="text-gray-400 line-through text-sm">
                                              ₹{price}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-lg text-gray-800">
                          ₹{totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleMoreInfo(order.order_id)}
                        className="text-blue-500 hover:underline mt-3"
                      >
                        {openOrderId === order.order_id
                          ? "Less Info"
                          : "More Info"}
                      </button>

                      {openOrderId === order.order_id && (
                        <div className="mt-5">
                          <div className="flex justify-between mt-5">
                            <div className="w-1/2 pr-4">
                              <h3 className="text-lg font-semibold">
                                Price Summary:
                              </h3>

                              {/* Total MRP for all items */}
                              <div className="flex justify-between">
                                <span>Total MRP:</span>
                                <span>
                                  ₹
                                  {order.order_items
                                    .reduce(
                                      (acc, item) =>
                                        acc + item.price * item.quantity,
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </div>

                              {/* Total Discount on MRP for all items */}
                              <div className="flex justify-between">
                                <span>Discount on MRP:</span>
                                <span>
                                  -₹
                                  {order.order_items
                                    .reduce(
                                      (acc, item) =>
                                        acc +
                                        ((item.price * item.discount) / 100) *
                                          item.quantity,
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </div>

                              {/* Fixed Shipping Cost */}
                              <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>₹12</span>
                              </div>

                              {/* Subtotal Calculation */}
                              <div className="flex justify-between font-bold">
                                <span>Subtotal:</span>
                                <span>
                                  ₹
                                  {(
                                    order.order_items.reduce(
                                      (acc, item) =>
                                        acc +
                                        item.price * item.quantity -
                                        ((item.price * item.discount) / 100) *
                                          item.quantity,
                                      0
                                    ) + 12
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <div className="w-1/2 pl-4 border-l">
                              <h3 className="text-lg font-semibold">
                                Shipping Address:
                              </h3>
                              <p>
                                {order.first_name} {order.last_name}
                              </p>
                              <p>{order.address_line_1}</p>
                              {order.address_line_2 && (
                                <p>{order.address_line_2}</p>
                              )}
                              <p>
                                {order.city}, {order.state} {order.pincode}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5">
                            <h3 className="text-lg font-semibold">
                              Payment Information:
                            </h3>
                            <div className="flex justify-between">
                              <span>Payment Method:</span>
                              <span>
                                {order.payment?.PaymentMethod ||
                                  "Not Available"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Transaction ID:</span>
                              <span>
                                {order.payment?.transaction_id || "N/A"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Payment Status:</span>
                              <span>
                                {order.payment?.payment_status || "Pending"}
                              </span>
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
                  You have not placed any orders yet. Browse our products and
                  place your first order.
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
