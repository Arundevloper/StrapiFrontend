import api from "../_utils/GlobalApi";
import { Banner } from '../_utils/types/Banner';

export const fetchBanners = async (): Promise<Banner[]> => {
  try {
    const response = await api.get<{ data: Banner[] }>('/banners', {
        params: {
            populate: 'cover_image', // Populate the cover_image field
          },
        });
    // Filter active banners
    return response.data.data.filter(banner => banner.is_active);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return []; // Return an empty array on error
  }
};