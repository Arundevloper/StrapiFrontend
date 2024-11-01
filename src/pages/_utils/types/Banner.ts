// types.ts
export interface Banner {
    id: number;
    title: string;
    link: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover_image: {
      url: string;
      formats: {
        large: {
          url: string;
        };
        medium: {
          url: string;
        };
        small: {
          url: string;
        };
        thumbnail: {
          url: string;
        };
      };
    };
  }
  
  
  export interface BannerResponse {
    data: Banner[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  