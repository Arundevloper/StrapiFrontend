export interface Subcategory {
  id: number;
  name: string; // Assuming subcategory has a name field
  slug: string; // Assuming there is a slug for subcategory
}

export interface Category {
  id: number;
  category_name: string; // Main category name
  subcategory_name: string; // Name of the subcategory
  subcategories: Subcategory[]; // Array of subcategories
  slug: string; // Slug for the category
  meta_title: string; // Meta title for SEO
  meta_desc: string; // Meta description for SEO
}

export interface Meta {
  pagination: {
    page: number; // Current page number
    pageSize: number; // Number of items per page
    pageCount: number; // Total number of pages
    total: number; // Total number of items
  };
}

export interface CategoryResponse {
  data: Category[]; // Array of categories
  meta: Meta; // Metadata regarding pagination
}
