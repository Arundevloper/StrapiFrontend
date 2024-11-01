import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { FiShoppingCart, FiChevronUp, FiChevronDown } from "react-icons/fi";
import moment from "moment";
import {
  getProductBySlug,
  fetchAllProductImages,
} from "../api/productCategory";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify


function ProductPage({ productData }) {
  const {
    product_name,
    product_desc,
    price,
    discount,
    stock_quantity,
    slug,
    images,
    id,
  } = productData;

  // Convert product_desc from rich text format to a string
  const description = product_desc
    .map((desc) => desc.children.map((child) => child.text).join(""))
    .join("\n");

  // State for image gallery, quantity, pincode, and description visibility
  const [mainImage, setMainImage] = useState(
    images[0] ? `http://localhost:1337/${images[0]}` : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const visibleThumbnailCount = 4;

  // Pincode check
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Estimated Delivery
  const deliveryDays = 5;
  const estimatedDeliveryDate = moment()
    .add(deliveryDays, "days")
    .format("MMMM Do, YYYY");

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prevQty) => prevQty + 1);
  };

  // Decrease quantity, ensuring it doesn't go below 1
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
    if (visibleStartIndex + visibleThumbnailCount < images.length) {
      setVisibleStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Get the visible thumbnails
  const visibleThumbnails = images.slice(
    visibleStartIndex,
    visibleStartIndex + visibleThumbnailCount
  );

  

  // Use Cart Context
  const { addItem } = useCart();

  // Handle Add to Cart
  // Handle Add to Cart
const handleAddToCart = () => {
  addItem({
    productSlug: slug,
    productName: product_name,
    productQuantity: quantity,
    price: price,
    discount: discount,
    stock: stock_quantity,
    productImage: mainImage,
    productId:id,
  });

  // Show a toast notification
  toast.success(`${product_name} has been added to the cart!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};


  return (
    <div>
      <Helmet>
        <title>{productData.meta_title}</title>
        <meta
          name="description"
          content={productData.meta_desc[0].children[0].text}
        />
        <meta property="og:title" content={productData.meta_title} />
        <meta
          property="og:description"
          content={productData.meta_desc[0].children[0].text}
        />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={mainImage} />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SITE_URL}/products/${productData.slug}`}
        />
      </Helmet>

      <Navbar />
      <section className="text-gray-600 body-font overflow-hidden mt-12">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* Image gallery with small images on the left */}
            <div className="w-full lg:w-1/2 h-auto flex flex-col-reverse lg:flex-row">
              {/* Scrollable thumbnail container */}
              <div className="flex flex-col items-center mt-4 lg:mt-0 lg:mr-4">
                {/* Up Button */}
                <button
                  onClick={scrollUp}
                  className={`px-10 py-2 text-xl rounded focus:outline-none transition ${
                    visibleStartIndex === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FiChevronUp />
                </button>

                {/* Thumbnails */}
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-hidden">
                  {visibleThumbnails.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:1337/${img}`}
                      alt={`gallery ${idx}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                        `http://localhost:1337/${img}` === mainImage
                          ? "border-blue-500"
                          : "border-gray-300"
                      } transition-transform transform hover:scale-105`}
                      onClick={() =>
                        setMainImage(`http://localhost:1337/${img}`)
                      }
                    />
                  ))}
                </div>

                {/* Down Button */}
                <button
                  onClick={scrollDown}
                  disabled={
                    visibleStartIndex + visibleThumbnailCount >= images.length
                  }
                  className={`p-2 text-xl focus:outline-none transition ${
                    visibleStartIndex + visibleThumbnailCount >= images.length
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FiChevronDown />
                </button>
              </div>

              {/* Main Image Container with fixed 491x491 size */}
              <div className="w-[500px] h-[500px] flex items-center justify-center bg-white rounded transition-all duration-300 ease-in-out">
                <img
                  alt="product"
                  className="object-contain max-w-full max-h-full transition-opacity duration-500 ease-in-out"
                  src={mainImage}
                />
              </div>
            </div>

            {/* Product details */}
            <div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
              <h1 className="text-3xl title-font text-custom-blue font-medium mb-1">
                {product_name}
              </h1>

              {/* Description with See More */}
              <p className="leading-relaxed">
                {showFullDescription
                  ? description
                  : `${description.substring(0, 200)}... `}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-custom-blue underline ml-1"
                >
                  {showFullDescription ? "See Less" : "See More"}
                </button>
              </p>

              {/* Pricing and Discount */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="mt-2 flex items-center">
                  <p className="bg-red-500 text-white text-sm font-medium mr-4 py-1 px-2 rounded-full">
                    {discount}% OFF
                  </p>
                  <p className="text-gray-600 text-2xl font-semibold mr-4">
                    ₹{price}
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    ₹{(price + 500).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Selector with Label */}
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center mb-5">
                  <span className="mr-4 text-gray-700 font-medium">
                    Quantity:
                  </span>
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-300 text-gray-600 px-3 py-1 rounded-l focus:outline-none"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200 text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-300 text-gray-600 px-3 py-1 rounded-r focus:outline-none"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="flex">
                  <button
                    onClick={handleAddToCart}
                    className="flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 hover:bg-custom-blue hover:border-custom-blue hover:text-white"
                  >
                    <FiShoppingCart className="mr-2 text-xl" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Estimated Delivery: {estimatedDeliveryDate}
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
export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  // Fetch product data using the slug
  const productData = await getProductBySlug(slug);

  // Fetch images associated with the product
  const imageData = await fetchAllProductImages(slug);
  const images = imageData?.map((img: any) => img.url);

  return {
    props: {
      productData: {
        ...productData,
        images,
      },
    },
  };
}
export default ProductPage;
