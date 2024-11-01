import api from "../_utils/GlobalApi";
import { ProductResponse, Product } from "../_utils/types/Product";
import {OrderData,OrderResponse}  from "../_utils/types/OrderData";
import { Payment,PaymentResponse } from "../_utils/types/Payment";

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
        sort: [
          {
            createdAt: "desc", // Sort by createdAt field in descending order
          },
        ],
      },
    });

    // Check if pagination metadata and data match expectations
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



// Function to fetch products by subcategory slug
export const getProductBySubcategory = async (
  subcategorySlug: string,
  page: number = 1,
  pageSize: number = 3 // You can adjust the default page size
): Promise<ProductResponse> => {
  console.log("slug from product is ", subcategorySlug);
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: {
        filters: {
          subcategory: { // Adjusted to use 'subcategory'
            slug: {
              $eq: subcategorySlug,
            },
          },
        },
        pagination: {
          page, // Set the current page
          pageSize, // Set the number of items per page
        },
        populate: "*", // Populate all related fields
        sort: [
          {
            createdAt: "desc", // Sort by createdAt field in descending order
          },
        ],
      },
    });

    // Check if pagination metadata and data match expectations
    console.log(
      "Products fetched for subcategory slug '" + subcategorySlug + "':",
      response.data
    );
    return response.data; // Return the full product response
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const getProductByAgeRange = async (
  ageRangeSlug: string,
  page: number = 1,
  pageSize: number = 3 // You can adjust the default page size
): Promise<ProductResponse> => {
  console.log("Fetching products for age range slug:", ageRangeSlug);
  try {
    const response = await api.get<ProductResponse>("/products", {
      params: {
        filters: {
          age_range: {
            slug: {
              $eq: ageRangeSlug, // Filter by age_range.slug
            },
          },
        },
        pagination: {
          page, // Set the current page
          pageSize, // Set the number of items per page
        },
        populate: "*", // Populate all related fields, including product_images
        sort: [
          {
            createdAt: "desc", // Sort by createdAt field in descending order
          },
        ],
      },
    });

    // Logging the fetched data for debugging purposes
    console.log(
      `Products fetched for age range slug '${ageRangeSlug}':`,
      response.data
    );
    
    return response.data; // Return the full product response
  } catch (error) {
    console.error("Error fetching products by age range:", error);
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

export const fetchSingleImage = async (slug: string) => {
  try {
    const response = await api.get(`/products?filters[slug][$eq]=${slug}&populate[product_images][populate]=product_image`);

   
    // Check if there are any products and images available
     return response.data.data[0].product_images[0].product_image[0].url;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchAllProductImages = async (slug: string) => {
  try {
    const response = await api.get(`/products?filters[slug][$eq]=${slug}&populate[product_images][populate]=product_image`);

console.log(slug);
    
  
    // Check if there are any products and images available
     return response.data.data[0].product_images[0].product_image;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
export const fetchImageByUrl = async (url: string) => {
  try {
    console.log("url ",url)
    const response = await api.get(`${url}`);

    console.log("reponse is "+response);
  
    // Check if there are any products and images available
     return response.data;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    const response = await api.post<OrderResponse>("/orders", {
      data: orderData,
    });

    console.log("Order created successfully:", response.data);
    return response.data; // Return the created order response
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const saveOrderItem = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    const response = await api.post<OrderResponse>("/order-items", {
      data: orderData, // Wrap orderData in an object with a key `data`
    });

    console.log("Order item Saved Successfully", response.data);
    return response.data; // Return the created order response
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


export const savePaymentInformation = async (payment: Payment): Promise<PaymentResponse> => {

  // console.log("thsi is a payments",payment);
  try {
    const response = await api.post<PaymentResponse>("/payments", {
      data: payment, // Use `payment` variable and ensure it's wrapped in `data`
    });

    console.log("Payment information saved successfully", response.data);
    return response.data; // Return the created payment response
  } catch (error) {
    console.error("Error saving payment information:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


export const preTransaction = async (orderInfo: Payment): Promise<PaymentResponse> => {


  console.log("this is the ordr information",orderInfo);
  // console.log("thsi is a payments",payment);
  try {
    const response = await api.post<PaymentResponse>("/orders/pretransaction", 
      orderInfo)

    console.log("pretransction initiate", response.data);
    return response.data; // Return the created payment response
  } catch (error) {
    console.error("Error saving payment information:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


export const updatePaymentInformation = async (paymentId: number, payment: Payment): Promise<PaymentResponse> => {
  try {
    const response = await api.put<PaymentResponse>(`/payments/${paymentId}`, {
      data: payment, // Wrap the `payment` object in a `data` key as expected by Strapi
    });

    console.log("payment is updated", response.data);
    return response.data; // Return the updated payment response
  } catch (error) {
    console.error("Error updating payment information:", error);
    throw error; // Re-throw the error for handling in the component
  }
};


export const verifyandupdate = async (payment: Payment): Promise<PaymentResponse> => {
  try {
    // Make sure to wrap the `payment` object in a `data` key
    const response = await api.post<PaymentResponse>(`/orders/verifyAndUpdate`, {
      payment, // Wrap the `payment` object in a `data` key as expected by Strapi
    });

    console.log("Payment is updated", response.data);
    return response.data; // Return the updated payment response
  } catch (error) {
    console.error("Error updating payment information:", error);
    throw error; // Re-throw the error for handling in the component
  }
};
