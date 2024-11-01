import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext"; // Adjust the path as necessary
import { useRouter } from "next/router";
import { Helmet } from "react-helmet"; // Import Helmet

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const calculateTotalMrp = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.productQuantity,
      0
    );
  };

  const calculateTotalDiscount = () => {
    return cart.reduce(
      (total, item) =>
        total + ((item.price * item.discount) / 100) * item.productQuantity,
      0
    );
  };

  const calculateDiscountedPrice = () => {
    return calculateTotalMrp() - calculateTotalDiscount();
  };

  const shippingCost = 50; // Fixed shipping cost

  const handleCheckout = () => {
    // if (!isAuthenticated) {
    //   // Redirect to the login page if the user is not authenticated
    //   router.push("/login");
    // } else {
    //   // Proceed to payment page if authenticated
    //   router.push("/checkout");
    // }

    router.push("/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Your Cart-LabnBox</title>
      </Helmet>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container mx-auto py-24 px-4 lg:px-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
            My Shopping Cart
          </h1>
          {cart.length > 0 ? (
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
              {/* Cart Items Section */}
              <div className="lg:w-1/2 md:w-full">
                {cart.map((item) => (
                  <div
                    key={item.productSlug}
                    className="flex items-center justify-between border-b pb-5 mb-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-[107px] h-[107px] object-contain rounded"
                      />
                      <div>
                        <h2 className="text-md text-gray-900">
                          {item.productName}
                        </h2>
                        {/* Pricing and Discount Section */}
                        <div className="flex items-center pb-5 mb-5">
                          <div className="mt-2 flex items-center">
                            <p className="text-red-600 text-sm mr-4 py-1 px-2">
                              {item.discount}% OFF
                            </p>
                            <p className="text-gray-600 text-lg font-medium mr-4">
                              ₹{item.price - (item.price * item.discount) / 100}
                            </p>
                            <p className="text-gray-400 line-through text-sm">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productSlug,
                              item.productQuantity - 1
                            )
                          }
                          className="bg-gray-300 text-gray-600 px-3 py-1 rounded-l focus:outline-none"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 bg-gray-200 text-gray-900">
                          {item.productQuantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productSlug,
                              item.productQuantity + 1
                            )
                          }
                          className="bg-gray-300 text-gray-600 px-3 py-1 rounded-r focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productSlug)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Cart Summary Section */}
              <div className="lg:w-1/3 w-full border p-9 rounded-lg">
                <h2 className="text-black text-lg font-medium mb-6">
                  Price Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 text-md">Total MRP</span>
                  <span className="text-gray-600 text-md">
                    ₹{calculateTotalMrp().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 text-md">Discount on MRP</span>
                  <span className="text-green-600 text-md">
                    - ₹{calculateTotalDiscount().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 text-md">Delivery Fee</span>
                  <span className="text-gray-600 text-md">
                    ₹{shippingCost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-xl">
                  <span>Subtotal</span>
                  <span>
                    ₹{(calculateDiscountedPrice() + shippingCost).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-3 border-2 border-custom-green bg-white text-black font-medium rounded-lg hover:bg-custom-green hover:text-white transition-colors duration-300 ease-in-out"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
              <p className="text-gray-500 mt-4">
                Explore our exciting STEAM toys collection and add items to your
                cart.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
