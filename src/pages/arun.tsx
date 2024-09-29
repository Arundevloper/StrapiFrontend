import React, { useEffect, useState } from 'react';
import { fetchSingleImage } from '../pages/api/productCategory'; // Adjust the import path to your file location

interface ProductImageProps {
  productId: string; // Define the productId prop
}

const ProductImage: React.FC<ProductImageProps> = ({ productId }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        // Directly pass the string "magical_hands"
        const url = await fetchSingleImage("magical_hands");
        console.log("tul"+url);
        if (url) {
          setImageUrl("http://localhost:1337/"+url);
        }
      } catch (err) {
        setError('Failed to load product image.');
      } finally {
        setLoading(false);
      }
    };

    getImage();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div>Loading image...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Product" />
      ) : (
        <div>No image available</div>
      )}
    </div>
  );
};

export default ProductImage;
