import apiFetch from "../_utils/GlobalApi";
import { Category } from "../_utils/types/Category";

// Function to fetch categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Build the query string manually
    const query = new URLSearchParams({
      sort: 'sort_order:asc',  // Sorting based on 'sort_order'
      populate: '*',           // Populate all related fields
    });

    // Use apiFetch to make the request
    const response = await apiFetch(`/categories?${query.toString()}`);

    console.log("Categories after sorting is: ", response.data);

    // Assuming the response JSON follows this structure: { data: [...] }
    return response.data.data; // Return the categories array
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw the error for handling in the component
  }
};