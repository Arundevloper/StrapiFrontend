import { privateDecrypt } from "crypto";
import api from "../_utils/GlobalApi";


export const fetchOrderDetailById = async (userId: number) => {
    try {
        const url = `/orders?filters[user][id][$eq]=${userId}&populate[order_items][populate][0]=product&populate[user]=*&populate[payment]=*`;
        const response = await api.get(url);
        console.log("This is the response from order:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error; // You can choose to throw or handle the error differently
    }
};

export const fetchProductImageUrl = async (productSlug: string) => { 
    try {
        const url = `/product-images?filters[product][slug]=${productSlug}&populate=*`;
        
        const response = await api.get(url);

        console.log("The response of the product name is:", response);
      
        const imageUrl=response.data.product_image[0].url;

        console.log("The product name is:", imageUrl);
        return imageUrl;

    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error; // You can choose to throw or handle the error differently
    }
};
