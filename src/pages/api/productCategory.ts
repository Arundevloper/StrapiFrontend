import api from "../_utils/GlobalApi";
import { ProductResponse } from "../_utils/types/Product";

// Function to fetch products by category slug
export const getProductsBySlug = async (categorySlug: string): Promise<ProductResponse> => {
  try {
    const response = await api.get<ProductResponse>('/products', {
      params: {
        filters: {
          category: {
            slug: {
              $eq: categorySlug,
            },
          },
        },
        populate: '*', // Populate all related fields
      },
    });
    
    console.log("Products fetched for category slug '" + categorySlug + "':", response.data);
    return response.data; // Return the full product response
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Usage Example
// const fetchProducts = async () => {
//   try {
//     const productsResponse = await getProductsBySlug('construction-toys');
//     const products = productsResponse.data;

//     products.forEach(product => {
//       console.log('Product Name:', product.product_name);
//       console.log('Description:', product.product_desc[0].children[0].text); // Accessing the first paragraph of description
//       console.log('Price:', product.price);
//       console.log('Discount:', product.discount);
//       console.log('Stock Quantity:', product.stock_quantity);
//     });
//   } catch (error) {
//     console.error('Failed to fetch products:', error);
//   }
// };
