import { NextPage } from "next";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext"; // Adjust the path as necessary
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import {
  createOrder,
  saveOrderItem,
  savePaymentInformation,
  preTransaction,
  updatePaymentInformation,
  verifyandupdate,
} from "../pages/api/productCategory";
import { jwtDecode } from "jwt-decode";

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    } else {
      resolve(false); // Server-side, script loading is skipped
    }
  });
};

loadRazorpayScript();

const Checkout: NextPage = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    // Redirect immediately if not authenticated
    router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    return null; // Prevent rendering the rest of the component
  }

  const shippingCost = 50;

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

  const getShippingCost = () => {
    const total = calculateDiscountedPrice();
    return total > 500 ? 0 : 50; // Free shipping if total exceeds ₹500
  };

  interface MyToken {
    id: number; // User ID
    iat: number; // Issued At
    exp: number; // Expiration time
  }

  // Function to get the user ID from the token
  const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("token"); // Adjust the key based on where you're storing the token

    if (token) {
      const decodedToken = jwtDecode<MyToken>(token);
      console.log("Decoded Token:", decodedToken); // Log the decoded token
      return decodedToken.id; // Return the user ID
    } else {
      console.log("No token found");
      return null; // Return null if no token is present
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      console.error("Failed to load Razorpay script.");
      return;
    }

    const formData: OrderData = {
      first_name: (e.target as HTMLFormElement).first_name.value,
      last_name: (e.target as HTMLFormElement).last_name.value,
      address_line_1: (e.target as HTMLFormElement).address_line_1.value,
      address_line_2: (e.target as HTMLFormElement).address_line_2.value,
      city: (e.target as HTMLFormElement).city.value,
      state: (e.target as HTMLFormElement).state.value,
      pincode: (e.target as HTMLFormElement).Pincode.value,
      phone_number: (e.target as HTMLFormElement).phone_number.value,
      user: getUserIdFromToken(),
    };

    try {
      const response = await createOrder(formData);
      console.log("Order created successfully:", response);

      const orders = response.data.id;

      const orderItemsPayload = cart.map((item) => ({
        orders,
        product: item.productId,
        quantity: item.productQuantity,
        price: item.price,
        discount: item.discount,
      }));

      await Promise.all(
        orderItemsPayload.map((item) => saveOrderItem(item as any))
      );

      const PaymentData = {
        order: orders,
        payment_status: "Pending",
      };

      const paymentResponse = await savePaymentInformation(PaymentData);
      const paymentId = paymentResponse.data.documentId;

      const preTransactionResponse = await preTransaction({
        amount: calculateDiscountedPrice() + getShippingCost(),
        currency: "INR",
        receipt: `receipt#${orders}`,
        notes: {
          address: formData.address_line_1,
        },
      });

      const { orderId, amount } = preTransactionResponse;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "LabnBox",
        description: "Your Transaction Description",
        order_id: orderId,
        handler: async (response:any) => {
          // Call verifyandupdate and handle response based on status code
          const verificationResponse = await verifyandupdate( {
            payment_id: paymentId,
            razorpay_signature: response.razorpay_signature,
            razorpay_payment_id: response.razorpay_payment_id,
            order_id:orderId,
            amount:amount
          });

          if (verificationResponse.status === 200) {
            console.log("Payment verified and updated successfully");
          } else if (verificationResponse.status === 400) {
            console.error("Payment verification failed");
          }
        },
        prefill: {
          name: `${formData.first_name} ${formData.last_name}`,
          email: `${formData.email}`,
          contact: `${formData.phone_number}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", async (response) => {
        await upda(paymentId, { payment_status: "Failed" });
      });

      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  //amount and payyment method

  return (
    <>
      <Helmet>
        <title>Checkout | Your Store Name</title>
        <meta
          name="description"
          content="Complete your purchase at Your Store Name."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Navbar />
      <section className="mt-20">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-custom-blue mt-10 text-gray-900">
            Checkout
          </h1>
          <p className="lg:w-2/3 mx-auto text-gray-600 ">
            Please enter your Shipping Address below to complete the purchase.
          </p>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="flex flex-col lg:flex-row items-center justify-center ">
          <div className=" px-5 py-12 ">
            <form onSubmit={handleFormSubmit}>
              <div className="flex lg:w-2/3 w-full sm:flex-row mt-8 flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                {/* Email Input */}
                <div className="relative flex-grow w-full">
                  <label className=" text-2xl text-gray-600">
                    Shipping Address:
                  </label>
                </div>
              </div>
              <div className="flex lg:w-2/3 w-full sm:flex-row sm-w-full mt-8 flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                {/* Full Name Input */}
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="first_name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* Last Name Input */}
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="last-name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="flex lg:w-2/3 w-full sm:flex-row  mt-8 flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                {/* Email Input */}
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="phoneNumber"
                    id="phoneNumber"
                    name="phone_number"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="flex lg:w-2/3 w-full sm:flex-row mt-8 flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end mt-8">
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="address-line1"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="address-line1"
                    name="address_line_1"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end mt-8">
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="address-line2"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="address-line2"
                    name="address_line_2"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* City, State, and Pincode Code */}
              <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end mt-8">
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="city"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="state"
                    className="leading-7 text-sm text-gray-600"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative flex-grow w-full">
                  <label
                    htmlFor="Pincode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="Pincode"
                    name="Pincode"
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex lg:w-2/3 w-full mx-auto  sm:px-0 items-end mt-8">
                <button className="text-white bg-custom-blue border-0 py-2  focus:outline-none hover:bg-cutsom-blue-600 rounded text-lg w-full">
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Section */}
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
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
