import api from "../_utils/GlobalApi";
import { CategoryResponse, Category } from "../_utils/types/Category";

// Function to fetch all subcategories
export const getSubcategories = async (): Promise<Category[]> => {
  try {
    // Build the query string manually for Strapi API
    const query = new URLSearchParams({
      sort: 'sort_order:asc',  // Sorting based on 'sort_order'
      populate: '*',           // Populate all related fields
    });

    // Use api to make the request to Strapi's subcategories
    const response = await api(`/subcategories?${query.toString()}`);

    console.log("Subcategories after sorting is: ", response.data);

    // Strapi response structure: { data: [...] }
    return response.data.data; // Return the subcategories array
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to fetch a subcategory by slug
export const getSubcategory = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.get<CategoryResponse>(`/subcategories`, {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: 'cover_image', // Adjust fields to populate as needed
      },
    });

    console.log("Fetched subcategory response:", response.data);

    // Check if any subcategories were returned and return the first one or null
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return a single subcategory or null
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
