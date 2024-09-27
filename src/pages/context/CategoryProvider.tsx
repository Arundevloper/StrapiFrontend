import React, { createContext, useContext } from "react";
import { Category } from "../_utils/types/Category";

interface CategoryContextType {
  categories: Category[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode; categories: Category[] }> = ({ children, categories }) => {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context.categories;
};
