import api from "../_utils/GlobalApi";
import { CategoryResponse, Category } from "../_utils/types/Category";

// Function to fetch all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Build the query string manually
    const query = new URLSearchParams({
      sort: 'sort_order:asc',  // Sorting based on 'sort_order'
      populate: '*',           // Populate all related fields
    });

    // Use api to make the request
    const response = await api(`/categories?${query.toString()}`);

    console.log("Categories after sorting is: ", response.data);

    // Assuming the response JSON follows this structure: { data: [...] }
    return response.data.data; // Return the categories array
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to fetch a category by slug
export const getCategory = async (slug: string): Promise<Category | null> => { // Update the return type
  try {
    const response = await api.get<CategoryResponse>('/categories', {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });

    console.log("Fetched category response:", response.data);

    // Check if any categories were returned and return the first one or null
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return a single Category or null
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
