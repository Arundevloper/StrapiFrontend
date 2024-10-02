import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchSingleImage } from '../api/productCategory';

interface ProductCardProps {
  productSlug: string;
  title: string;
  sellingPrice: number;
  percentagePrice: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productSlug,
  title,
  sellingPrice,
  percentagePrice,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = await fetchSingleImage("magical_hands");
        
        if (url) {
          setImageUrl(`http://localhost:1337${url}`);
        }
      } catch (err) {
        console.error("Image fetch error:", err); // More detailed error logging
        setError('Failed to load product image.');
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      getImage();
    }
  }, [productSlug]);

  const price = sellingPrice - (sellingPrice * percentagePrice) / 100;

  return (
    <div className="p-4">
      <div className="bg-gray-100 to-white p-6 rounded-lg duration-300">
        <div className="bg-gray-100 p-2 rounded-lg flex justify-center items-center">
          <Link
            href={`/products/${productSlug}`}
            className="block relative rounded overflow-hidden group cursor-pointer"
            style={{ width: '256px', height: '255px' }}
          >
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-full w-full rounded-lg"></div>
            ) : error ? (
              <div>
                <img src="/path/to/placeholder.png" alt="Placeholder" className="object-cover object-center w-full h-full block rounded-lg" />
                <div className="text-red-500">{error}</div>
              </div>
            ) : imageUrl ? (
              <LazyLoadImage
              alt={title}
              src={imageUrl}
              width="256px"
              height="255px"
              className="object-cover object-center w-full h-full block rounded-lg transition-transform duration-300 group-hover:scale-105"
              effect={null} // Remove the blur effect
            />
            
            ) : (
              <div>No image available</div>
            )}
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25 rounded-lg"></div>
          </Link>
        </div>
        <div className="mt-4 text-left">
          <h2 className="text-gray-900 title-font text-lg">{title}</h2>
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
        <button className="mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 hover:bg-custom-blue hover:border-custom-blue hover:text-white">
          <FiShoppingCart className="mr-2 text-xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
