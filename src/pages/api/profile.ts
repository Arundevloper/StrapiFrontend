import api from "../_utils/GlobalApi";


export const fetchOrderDetailById = async (userId: number) => {
    try {
        const url = `/orders?filters[user][id][$eq]=${userId}&populate=*`;
        const response = await api.get(url);
      console.log("this is the response from ordrer",response.data)
        // Assuming the response data structure is something like { data: [...] }
        return response.data;
    } catch (error) {
        console.error("Error fetching order details:", error);
        throw error; // You can choose to throw or handle the error differently
    }
};
