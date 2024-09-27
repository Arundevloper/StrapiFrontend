import React from "react";
import { FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  image: string;
  title: string;
  sellingPrice: number; // Original price before discount
  percentagePrice: number; // Discount percentage
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  sellingPrice,
  percentagePrice,
}) => {
  // Calculate the current price after discount
  const price = sellingPrice - (sellingPrice * percentagePrice) / 100;

  return (
    <div className="p-4">
      <div className="bg-gray-100 to-white p-6 rounded-lg duration-300">
        {/* Centered Image */}
        <div className="bg-gray-100 p-2 rounded-lg flex justify-center items-center">
          <a
            className="block relative rounded overflow-hidden group cursor-pointer"
            style={{ width: "256px", height: "255px" }}
          >
            <img
              alt={title}
              className="object-cover object-center w-full h-full block rounded-lg transition-transform duration-300 group-hover:scale-105"
              src={image}
            />
            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25 rounded-lg"></div>
          </a>
        </div>
        {/* Product Info */}
        <div className="mt-4 text-left">
          <h2 className="text-gray-900 title-font text-lg">{title}</h2>

          {/* Pricing Information */}
          <div className="mt-2 flex items-center">
            {/* Discount with Custom Red Background and Rounded Corners */}
            <p className="bg-red-500 text-white text-sm font-medium mr-4 py-1 px-2 rounded-full">
              {percentagePrice}% OFF
            </p>
            {/* Grey Price */}
            <p className="text-gray-600 text-2xl font-semibold mr-4">
              ₹{price.toFixed(2)} {/* Display price with two decimal places */}
            </p>
            {/* Original Price */}
            <p className="text-gray-400 line-through text-sm">
              ₹{sellingPrice} {/* Display selling price with two decimal places */}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 hover:bg-custom-blue hover:border-custom-blue hover:text-white">
          <FiShoppingCart className="mr-2 text-xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
