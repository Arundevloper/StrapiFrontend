import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ProductCard from "../components/productCard";
import { Product } from "../_utils/types/Product";
import { getProductBySubcategory } from "../api/productCategory"; // Updated import
import { getSubCategory } from "../api/category";
import Spinner from "../components/ReactLoading";
import Header from "../components/Header";

interface Props {
  params: {
    slug: string;
  };
  initialProducts: Product[];
  metaTitle: string;
  metaDescription: string;
  totalProducts: number;
  error?: string | null;
  cover_image: string;
}

const ProductPage: React.FC<Props> = ({
  params,
  initialProducts,
  metaTitle,
  metaDescription,
  totalProducts,
  cover_image,
  error,
}) => {
  const { slug } = params;
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page for loading more products
  const [hasMore, setHasMore] = useState(
    initialProducts.length < totalProducts
  ); // Track if there are more products to load
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Ref for the loading trigger
  const [coverImage, setCoverImage] = useState<string>(
    cover_image ? `http://localhost:1337${cover_image}` : ""
  );

  if (error) return <div>{error}</div>;

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return; // Prevent multiple loads at once and stop if no more products
    setLoading(true);

    try {
      const response = await getProductBySubcategory(slug, page + 1); // Fetch next page of products
      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setPage((prevPage) => prevPage + 1);

      // Update hasMore based on the total number of products
      if (products.length + response.data.length >= totalProducts) {
        setHasMore(false); // No more products to load
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMoreProducts(); // Load more products when the ref is in view
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, loading, hasMore, slug]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      try {
        const response = await getProductBySubcategory(slug, 1); // Fetch initial products
        setProducts(response.data);
        setPage(1);
        setHasMore(response.meta?.pagination?.total > response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, [slug]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content={`products, ${slug}, best products, shop online`}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://yourstore.com/subcategory/${slug}`} />
      </Head>

      <Header imageUrl={coverImage} />
      <Navbar />

      <section className="text-gray-600 body-font px-0 sm:px-2 md:px-2 md:w-full lg:px-24">
        <div className="container px-2 sm:px-0 lg:px-12 py-24 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.product_name}
                sellingPrice={product.price}
                percentagePrice={product.discount}
                productSlug={product.slug}
                stock={product.stock_quantity}
                productId={product.id}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={loadMoreRef} className="mt-4">
              {loading && <Spinner type="bubbles" color="#42a2a2" />}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

// Fetch data server-side using getServerSideProps
export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  try {
    const fetchedProducts = await getProductBySubcategory(slug, 1); // Fetch initial page
    const fetchCategory = await getSubCategory(slug);
    const totalProducts = fetchedProducts.meta?.pagination?.total || 0;

    return {
      props: {
        params: {
          slug,
        },
        initialProducts: fetchedProducts.data || [],
        totalProducts,
        metaTitle:
          fetchCategory?.meta_title ||
          `Products in ${slug} category - Your Store`,
        cover_image: fetchCategory?.cover_image?.url || null, // Set to null if undefined
        metaDescription:
          fetchCategory?.meta_desc ||
          `Explore a wide range of products in the ${slug} category. Find the best deals on high-quality products, handpicked just for you!`,
      },
    };
  } catch (error) {
    console.error("Error fetching products server-side:", error);
    return {
      props: {
        params: {
          slug,
        },
        initialProducts: [],
        totalProducts: 0,
        metaTitle: `Products in ${slug} category - Your Store`,
        metaDescription: `Explore a wide range of products in the ${slug} category. Find the best deals on high-quality products, handpicked just for you!`,
        error: "Failed to load products",
        cover_image: null, // Ensure cover_image is null if there's an error
      },
    };
  }
}


export default ProductPage;
