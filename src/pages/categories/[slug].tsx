"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head'; // Import Head component for SEO
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ProductCard from '../components/productCard';
import { getProductsBySlug } from '../api/productCategory';
import { Product } from '../_utils/types/Product';

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<Props> = ({ params }) => {
  const { slug } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [metaTitle, setMetaTitle] = useState<string>(''); // State for meta title
  const [metaDescription, setMetaDescription] = useState<string>(''); // State for meta description
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsBySlug(slug);

        // Set the fetched meta title and description from product data
        setMetaTitle(fetchedProducts.meta_title || `Products in ${slug} category - Your Store`);
        setMetaDescription(fetchedProducts.meta_desc || `Explore a wide range of products in the ${slug} category. Find the best deals on high-quality products, handpicked just for you!`);

        setProducts(fetchedProducts.data); // Assuming `data` is where the array of products resides
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`products, ${slug}, best products, shop online`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://yourstore.com/category/${slug}`} />
      </Head>

      <Navbar />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto lg:w-3/5">
          <h1 className="text-3xl font-bold mb-6">Products in {slug} category</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.product_name}
                sellingPrice={product.price.toFixed(2)}
                percentagePrice={product.discount}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const fetchedProducts = await getProductsBySlug(slug);

    return {
      props: {
        params: {
          slug,
        },
        initialProducts: fetchedProducts.data, // Pass initial products data fetched server-side
      },
    };
  } catch (error) {
    console.error('Error fetching products server-side:', error);
    return {
      props: {
        params: {
          slug,
        },
        initialProducts: [], // Return empty array or handle error state as needed
        error: 'Failed to load products',
      },
    };
  }
}

export default ProductPage;
