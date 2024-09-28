// types/Product.ts

export interface ProductDesc {
  type: string;
  children: Array<{ text: string; type: string }>;
}

export interface Product {
  id: number;
  documentId: string;
  createdAt: string; // You can use Date if you convert it later
  updatedAt: string; // You can use Date if you convert it later
  publishedAt: string; // You can use Date if you convert it later
  locale: string | null;
  product_name: string;
  product_desc: ProductDesc[];
  price: number;
  discount: number;
  slug: string;
  meta_title: string;
  meta_desc: ProductDesc[];
  stock_quantity: number;
  data: any;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface ProductResponse {
  data: Product[];
  meta: Meta;
}
