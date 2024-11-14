import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fetchSingleImage } from '../api/productCategory';

interface ProductCardProps {
  productSlug: string;
}

const OrderImageCard: React.FC<ProductCardProps> = ({ productSlug }) => {
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

  return (
    <div className="flex items-center gap-4">
      {loading ? (
         <div className="animate-pulse bg-gray-300 h-full w-full rounded-lg"></div>
      ) : imageUrl ? (
        <LazyLoadImage
          src={imageUrl}
          alt={`Image for product ${productSlug}`}
          className="w-[80px] h-[80px] object-contain rounded"
        />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
};

export default OrderImageCard;
