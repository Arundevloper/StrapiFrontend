"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";

// Sample categories and their options
const categories = [
  {
    name: "Construction Toys",
    href: "/construction-toys",
    options: [
      { name: "Option 1", href: "/option-1" },
      { name: "Option 2", href: "/option-2" },
      { name: "Option 3", href: "/option-3" },
    ],
  },
  {
    name: "Action Figures",
    href: "/action-figures",
    options: [
      { name: "Option A", href: "/option-a" },
      { name: "Option B", href: "/option-b" },
      { name: "Option C", href: "/option-c" },
    ],
  },
  {
    name: "Board Games",
    href: "/board-games",
    options: [
      { name: "Option X", href: "/option-x" },
      { name: "Option Y", href: "/option-y" },
      { name: "Option Z", href: "/option-z" },
    ],
  },
];

// Category List Component
const CategoryList: React.FC<{
  categories: typeof categories;
  onCategoryClick: (categoryName: string) => void;
}> = ({ categories, onCategoryClick }) => {
  return (
    <div className="w-full">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <Link href={category.href} className="flex-1 text-lg text-gray-800 font-medium">
            {category.name}
          </Link>
          <FaAngleRight
            className="ml-4 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() => onCategoryClick(category.name)}
          />
        </div>
      ))}
    </div>
  );
};

// Submenu Component
const Submenu: React.FC<{
  activeCategory: string;
  categories: typeof categories;
  onBackClick: () => void;
}> = ({ activeCategory, categories, onBackClick }) => {
  const category = categories.find((cat) => cat.name === activeCategory);

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
          {category?.options.map((option, index) => (
            <li key={index}>
              <Link
                href={option.href}
                className="block px-4 py-2 text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



// Main Menu Component
const Menu: React.FC = () => {
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
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    // Clean up the overflow style when component unmounts or menu closes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col bg-white z-40 shadow-lg">
      {/* Main Categories */}
      <div
        className={`flex-1 overflow-y-auto transition-transform ease-in-out duration-500 ${
          activeCategory ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
        <div className="mt-auto flex flex-col space-y-4 p-4">
    <Link href="/login">
      {" "}
      <button className="mt-6 w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg border-2 border-custom-blue text-custom-blue bg-white transition-colors duration-300 ">
        Login
      </button>
    </Link>
    <Link
      href="/register"
     
    > <button
    className=" w-full flex items-center bg-custom-green justify-center font-semibold py-2 px-4 rounded-lg border border-custom-green text-white transition-colors duration-300"
  >
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
          <Submenu activeCategory={activeCategory} categories={categories} onBackClick={handleBackClick} />
        )}
      </div>
    
    </div>
  );
};

export default Menu;
