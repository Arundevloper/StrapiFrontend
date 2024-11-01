import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchSingleImage } from '../api/productCategory';
import { useCart } from "../context/CartContext";
import { toast } from 'react-toastify'; // Import toast

interface ProductCardProps {
  productSlug: string;
  title: string;
  sellingPrice: number;
  percentagePrice: number;
  stock: number;
  key: number;
  productId:number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productSlug,
  title,
  sellingPrice,
  percentagePrice,
  stock,
  productId
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const getImage = async () => {
      try {
        setLoading(true);
        const url = await fetchSingleImage(productSlug);
        if (url) {
          setImageUrl(`http://localhost:1337${url}`);
        }
      } catch (err) {
        console.error("Image fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      getImage();
    }
  }, [productSlug]);

  const price = sellingPrice - (sellingPrice * percentagePrice) / 100;

  // Use Cart Context
  const { addItem } = useCart();

  // Handle Add to Cart
  const handleAddToCart = () => {
    addItem({
      productSlug: productSlug,
      productName: title,
      productQuantity: 1,
      price: sellingPrice,
      discount: percentagePrice,
      stock: stock,
      productImage: imageUrl || '',
      productId
    });

    // Show notification
    toast.success(`${title} has been added to your cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="lg:p-4 md:p-1 sm:p-2">
      <div className="bg-gray-100 to-white p-6 rounded-lg duration-300">
        <div className="bg-gray-100 p-2 rounded-lg flex justify-center items-center">
          <Link
            href={`/products/${productSlug}`}
            className="block relative rounded overflow-hidden group cursor-pointer"
            style={{ width: '256px', height: '255px' }}
          >
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-full w-full rounded-lg"></div>
            ) : imageUrl ? (
              <LazyLoadImage
                alt={title}
                src={imageUrl}
                width="256px"
                height="255px"
                className="sm:object-cover object-fill object-center w-full h-full block rounded-lg transition-transform duration-300 group-hover:scale-105"
                effect={null}
              />
            ) : (
              ''
            )}
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25 rounded-lg"></div>
          </Link>
        </div>
        <div className="mt-4 text-left">
          <h2 className="text-gray-900 text-md title-font sm:text-md md:text-base lg:text-lg xl:text-xl">{title}</h2>
          <div className="mt-2 flex items-center">
            <p className="bg-red-500 text-white text-sm font-medium mr-4 py-1 px-2 rounded-full">
              {percentagePrice}% OFF
            </p>
            <p className="text-gray-600 text-2xl font-semibold mr-4">
              ₹{price.toFixed(2)}
            </p>
            <p className="text-gray-400 line-through text-sm">
              ₹{sellingPrice}
            </p>
          </div>
        </div>
        <button 
          onClick={handleAddToCart} 
          className="mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 hover:bg-custom-blue hover:border-custom-blue hover:text-white"
        >
          <FiShoppingCart className="mr-2 text-xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
