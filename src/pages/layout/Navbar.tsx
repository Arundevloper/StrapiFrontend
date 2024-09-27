"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import  Menu from "../components/Menu"
import { getCategories } from "../api/category"; // Adjust the import path as needed
import { Category } from "../_utils/types/Category";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const menuRef = useRef(null);


  

  // Fetch categories from Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await getCategories();

        const transformedCategories = responseData.map((category: any) => ({
          category_name: category.category_name,
          slug: category.slug, // Add slug for category
          subcategories: category.subcategories.map((sub: any) => ({
            subcategory_name: sub.subcategory_name,
            slug: sub.slug, // Add slug for subcategory
          })),
        }));
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const preventScroll = () => {
      document.body.style.overflow = isMenuOpen ? "hidden" : "";
      document.documentElement.style.overflow = isMenuOpen ? "hidden" : "";
    };

    preventScroll();

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 bg-gray-50 shadow-md p-1 sm:p-3 transition-transform duration-300 ease-in-out ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } z-40`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-8 h-8 text-indigo-600 rounded-full"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-semibold">Tailblocks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {categories.map((category) => (
              <div className="relative group" key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-gray-700  relative flex items-center"
                >
                  <span className="transition-colors duration-300">
                    {category.category_name}
                  </span>
                  <span className="block w-full h-0.5 bg-gray-900 absolute bottom-0 left-0 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 z-50 w-48 pointer-events-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  {category.subcategories.length > 0 && (
                    <ul className="py-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/subcategories/${sub.slug}`}
                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                          >
                            {sub.subcategory_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex space-x-6 items-center">
            <button className="text-gray-700 hover:text-gray-900">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
              </svg>
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <Menu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          categories={categories}
        />
      )}
    </>
  );
};

export default Navbar;
