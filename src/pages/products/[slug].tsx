import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { FiShoppingCart, FiChevronUp, FiChevronDown } from "react-icons/fi";
import moment from "moment";
import {getProductBySlug} from "../api/productCategory"

function ProductPage({ product }) {
  // State for image gallery, quantity, pincode, and description visibility
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleThumbnailCount = 4;

  // Pincode check
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Estimated Delivery
  const deliveryDays = 5;
  const estimatedDeliveryDate = moment().add(deliveryDays, "days").format("MMMM Do, YYYY");

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
  };

  // Scroll up the thumbnails
  const scrollUp = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Scroll down the thumbnails
  const scrollDown = () => {
    if (visibleStartIndex + visibleThumbnailCount < product.images.length) {
      setVisibleStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Get the visible thumbnails
  const visibleThumbnails = product.images.slice(
    visibleStartIndex,
    visibleStartIndex + visibleThumbnailCount
  );

  // Validate pincode
  const validatePincode = () => {
    if (pincode.length !== 6 || isNaN(pincode)) {
      setPincodeError("Invalid pincode. Please enter a 6-digit pincode.");
    } else {
      setPincodeError("");
      // Further logic for delivery info can be implemented here
    }
  };

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font overflow-hidden mt-12">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full lg:w-1/2 h-auto flex flex-col-reverse lg:flex-row">
              <div className="flex flex-col items-center mt-4 lg:mt-0 lg:mr-4">
                <button
                  onClick={scrollUp}
                  className={`px-10 py-2 text-xl rounded focus:outline-none transition ${
                    visibleStartIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FiChevronUp />
                </button>

                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-hidden">
                  {visibleThumbnails.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`gallery ${idx}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                        img === mainImage
                          ? "border-blue-500"
                          : "border-gray-300"
                      } transition-transform transform hover:scale-105`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>

                <button
                  onClick={scrollDown}
                  disabled={visibleStartIndex + visibleThumbnailCount >= product.images.length}
                  className={`p-2 text-xl focus:outline-none transition ${
                    visibleStartIndex + visibleThumbnailCount >= product.images.length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FiChevronDown />
                </button>
              </div>

              <div className="w-[500px] h-[500px] flex items-center justify-center bg-white rounded transition-all duration-300 ease-in-out">
                <img
                  alt="product"
                  className="object-contain max-w-full max-h-full transition-opacity duration-500 ease-in-out"
                  src={mainImage}
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
              <h1 className="text-3xl title-font text-custom-blue font-medium mb-1">
                {product.name}
              </h1>

              <p className="leading-relaxed">
                {showFullDescription
                  ? product.description
                  : `${product.description.substring(0, 200)}... `}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-custom-blue underline ml-1"
                >
                  {showFullDescription ? "See Less" : "See More"}
                </button>
              </p>

              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="mt-2 flex items-center">
                  <p className="bg-red-500 text-white text-sm font-medium mr-4 py-1 px-2 rounded-full">
                    {((500 / (product.price + 500)) * 100).toFixed(0)}% OFF
                  </p>
                  <p className="text-gray-600 text-2xl font-semibold mr-4">₹{product.price}</p>
                  <p className="text-gray-400 line-through text-sm">₹{(product.price + 500).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-between">
                <div className="flex items-center mb-5">
                  <span className="mr-4 text-gray-700 font-medium">Quantity:</span>
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-300 text-gray-600 px-3 py-1 rounded-l focus:outline-none"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200 text-gray-900">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-300 text-gray-600 px-3 py-1 rounded-r focus:outline-none"
                  >
                    +
                  </button>
                </div>

                <div className="flex">
                  <button className="flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 hover:bg-custom-blue hover:border-custom-blue hover:text-white">
                    <FiShoppingCart className="mr-2 text-xl" />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-semibold">Check Delivery Estimate:</p>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border border-gray-300 p-2 rounded mt-2 w-48"
                  placeholder="Enter Pincode"
                />
                <button
                  onClick={validatePincode}
                  className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                >
                  Check
                </button>
                {pincodeError && <p className="text-red-500 text-sm">{pincodeError}</p>}
              </div>

              <div className="mt-6 text-gray-600">
                <p className="font-semibold">Estimated Delivery:</p>
                <p>{estimatedDeliveryDate}</p>
                <p className="text-sm text-gray-500">
                  Order now and receive it within {deliveryDays} days!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Fetch product data based on slug
export async function getServerSideProps(context) {
  const { slug } = context.params; // Extract the slug from the URL parameters
  const fetchedProduct = await getProductBySlug(slug); // Fetch product data using your API function

  // Check if product exists
  if (!fetchedProduct) {
    return {
      notFound: true, // Return 404 if product is not found
    };
  }

  return {
    props: { product: fetchedProduct }, // Pass product data as props to the component
  };
}

export default ProductPage;
