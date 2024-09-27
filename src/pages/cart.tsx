"use client";

import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Foil Magic - Animal Wisdom Tales | 4-8 years | DIY Activity Kit",
      price: 4999, // Prices in paisa for rupees (4999 = ₹49.99)
      quantity: 1,
      image: "/product/product2.png",
    },
    {
      id: 2,
      name: "Foil Magic - Animal Wisdom Tales | 4-8 years | DIY Activity Kit",
      price: 2999, // ₹29.99
      quantity: 2,
      image: "https://dummyimage.com/107x107",
    },
  ]);

  const [discount] = useState(10); // Fixed 10% discount for demonstration

  // Function to handle quantity changes
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // Calculate total MRP
  const calculateTotalMrp = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total price after discount
  const calculateDiscountedPrice = () => {
    const totalMrp = calculateTotalMrp();
    return totalMrp - totalMrp * (discount / 100);
  };

  // Calculate shipping (flat ₹50 for demo)
  const shippingCost = 50; // Shipping in rupees, not in paisa

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <section className="text-gray-600 body-font">
          <div className="container mx-auto py-24 px-4 lg:px-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
              Your Shopping Cart
            </h1>
            {cartItems.length > 0 ? (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                {/* Cart Items Section */}
                <div className="lg:w-1/2 md:w-full">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-5 mb-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-[107px] h-[107px] object-contain rounded"
                        />
                        <div>
                          <h2 className="text-md text-gray-900">{item.name}</h2>
                          {/* Pricing and Discount Section */}
                          <div className="flex items-center pb-5  mb-5">
                            <div className="mt-2 flex items-center">
                              <p className=" text-red-600 text-sm  mr-4 py-1 px-2 ">
                                {((500 / (item.price + 500)) * 100).toFixed(0)}% OFF
                              </p>
                              <p className="text-gray-600 text-lg font-medium mr-4">
                                ₹{(item.price / 100).toFixed(2)}
                              </p>
                              <p className="text-gray-400 line-through text-sm">
                                ₹{((item.price + 500) / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-300 text-gray-600 px-3 py-1 rounded-l focus:outline-none"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 bg-gray-200 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-300 text-gray-600 px-3 py-1 rounded-r focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        {/* Remove Button */}
                        <button
                          onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Cart Summary Section */}
                <div className="lg:w-1/3 w-full bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                  <div className="flex justify-between mb-4">
                    <span className="text-gray-900">Total MRP</span>
                    <span className="text-gray-900">₹{(calculateTotalMrp() / 100).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="text-gray-900">Discount on MRP</span>
                    <span className="text-green-600">
                      - ₹{((calculateTotalMrp() * discount) / 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="text-gray-900">Shipping</span>
                    <span className="text-gray-900">₹{shippingCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between font-bold text-xl">
                    <span>Subtotal</span>
                    <span>
                      ₹{((calculateDiscountedPrice() / 100) + shippingCost).toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full mt-6 py-3 bg-custom-green text-white rounded-lg ">
  Proceed to Checkout
</button>

                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-semibold">Your cart is empty!</h2>
                <p className="text-gray-500 mt-4">
                  Explore our exciting STEAM toys collection and add items to your cart.
                </p>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
