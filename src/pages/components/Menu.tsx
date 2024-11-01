import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { getCategories } from "../api/category"; // Adjust the import path as needed
import { Category } from "../_utils/types/Category";


// Category List Component
const CategoryList: React.FC<{
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
}> = ({ categories, onCategoryClick }) => {
  return (
    <div className="w-full">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <Link
            href={`/collection/${category.slug}`}
            className="flex-1 text-lg text-gray-800 font-medium"
          >
            {category.category_name}
          </Link>
          <FaAngleRight
            className="ml-4 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => onCategoryClick(category.category_name)}
          />
        </div>
      ))}
    </div>
  );
};

// Submenu Component
const Submenu: React.FC<{
  activeCategory: string;
  categories: Category[];
  onBackClick: () => void;
}> = ({ activeCategory, categories, onBackClick }) => {
  const category = categories.find(
    (cat) => cat.category_name === activeCategory
  );

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white shadow-md transition-transform ease-in-out duration-500 z-30">
      <div className="p-4">
        <button
          onClick={onBackClick}
          className="flex items-center text-gray-700 mb-4 hover:underline"
        >
          <AiOutlineArrowLeft className="mr-2" /> Back
        </button>
        <ul className="space-y-3">
          {category?.subcategories.map((option, index) => (
            <li key={index}>
              <Link
                href={`/sub_collection/${option.slug}`}
                className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {option.subcategory_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main Menu Component
const Menu: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleBackClick = () => {
    setActiveCategory(null);
  };

  // Toggle menu open/close state
  useEffect(() => {
    if (activeCategory !== null) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [activeCategory]);

  // Disable background scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.documentElement.style.overflow = ""; // Enable scrolling
    }
  
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);
  

  return (
    <div className="fixed top-0  left-0 w-[80%] h-full bg-gray-300 transition-transform ease-in-out  duration-500 flex flex-col bg-white z-40 shadow-lg">
      {/* Main Categories */}
      <div
        className={`flex-1 overflow-y-auto transition-transform ease-in-out mt-5 duration-500 ${
          activeCategory ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <CategoryList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
       
      </div>
      <div className="mt-auto">
          <div className="py-4 px-2">
            <Link href="/login">
              <button className="mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300">
                Login
              </button>
            </Link>
          </div>
          <div className="px-2 pb-12">
          <Link href="/register">
            <button className="w-full flex items-center bg-custom-green justify-center font-semibold py-2 px-4 rounded-lg border border-custom-green text-white transition-colors duration-300">
              Register
            </button>
          </Link>
            </div>

        </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white z-50 transition-transform transition-opacity ease-in-out duration-300 ${
          activeCategory
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {activeCategory && (
          <Submenu
            activeCategory={activeCategory}
            categories={categories}
            onBackClick={handleBackClick}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Assuming getCategories is an API call to fetch categories
    const responseData = await getCategories();

    const transformedCategories = responseData.map((category: any) => ({
      category_name: category.category_name,
      slug: category.slug,
      subcategories: category.subcategories.map((sub: any) => ({
        subcategory_name: sub.subcategory_name,
        slug: sub.slug,
      })),
    }));

    return {
      props: {
        categories: transformedCategories,
      },
    };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
};
