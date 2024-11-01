import api from "../_utils/GlobalApi";
import { CategoryResponse, Category } from "../_utils/types/Category";

// Function to fetch all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    // Build the query string manually for Strapi API
    const query = new URLSearchParams({
      sort: 'sort_order:asc',  // Sorting based on 'sort_order' for categories
      'populate[subcategories][sort]': 'sort_order:asc',  // Sorting subcategories by 'sort_order'
    });

    // Use api to make the request
    const response = await api(`/categories?${query.toString()}`);

    console.log("Categories with sorted subcategories: ", response.data);

    // Assuming the response JSON follows this structure: { data: [...] }
    return response.data.data; // Return the categories array
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

// Function to fetch a category by slug
export const getCategory = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.get<CategoryResponse>(`/categories`, {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: 'cover_image', 
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

export const getAgeByRange = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.get<CategoryResponse>(`/age-ranges`, {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: 'cover_image', // Adjust this based on the actual fields in AgeRange
      },
    });

    console.log("Fetched age range response:", response.data);

    // Check if any age ranges were returned and return the first one or null
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return a single AgeRange or null
  } catch (error) {
    console.error('Error fetching age range:', error);
    throw error; // Re-throw the error for handling in the component
  }
};




export const getSubCategory = async (slug: string): Promise<Category | null> => {
  try {
    const response = await api.get<CategoryResponse>(`/subcategories`, { // Adjust the endpoint to fetch subcategories
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: 'cover_image', // Populate the cover_image field
      },
    });

    console.log("Fetched subcategory response:", response.data);

    // Check if any subcategories were returned and return the first one or null
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return a single SubCategory or null
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

