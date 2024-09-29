import api from "../_utils/GlobalApi";
import { ProductResponse, Product } from "../_utils/types/Product";

// Function to fetch products by category slug
export const getProductByCategory = async (
  categorySlug: string,
  page: number = 1,
  pageSize: number = 3 // You can adjust the default page size
): Promise<ProductResponse> => {
  console.log("slug from product is ", categorySlug);
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: {
        filters: {
          category: {
            slug: {
              $eq: categorySlug,
            },
          },
        },
        pagination: {
          page, // Set the current page
          pageSize, // Set the number of items per page
        },
        populate: "*", // Populate all related fields
      },
    });

    console.log(
      "Products fetched for category slug '" + categorySlug + "':",
      response.data
    );
    return response.data; // Return the full product response
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to fetch product images by product IDs
export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });

    console.log("Fetched product response:", response.data);

    // Check if any products were returned and return the first one or null
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return a single Product or null
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchSingleImage = async (slug: string[]) => {
  try {
    const response = await api.get(`/products?filters[slug][$eq]=${slug}&populate[product_images][populate]=product_image`);

  
    // Check if there are any products and images available
     return response.data.data[0].product_images[0].product_image[0].url;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
