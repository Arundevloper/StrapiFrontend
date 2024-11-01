"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Menu from "../components/Menu";
import { getCategories } from "../api/category"; // Adjust the import path as needed
import { Category } from "../_utils/types/Category";
import CartComponent from "../components/CartComponent";
import UserIcon from "../components/UserIcon";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const menuRef = useRef(null);
  const { cart } = useCart();

  // Fetch categories from Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await getCategories();
        console.log("this is the data", responseData);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.productQuantity, 0);
  };

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
          {/* <Link href="/" className="flex items-center text-gray-900">
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
          </Link> */}

          <Link href="/" className="flex items-center text-gray-900">
            {/* Only the logo image */}
            <img src="/lab2.png" alt="Logo" className="h-10 w-full" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {categories.map((category) => (
              <div className="relative group" key={category.slug}>
                <Link
                  href={`/collection/${category.slug}`}
                  className="text-gray-700 relative flex items-center"
                >
                  <span className="transition-colors duration-300">
                    {category.category_name}
                  </span>
                  <span className="block w-full h-0.5 bg-gray-900 absolute bottom-0 left-0 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>

                {/* Subcategories dropdown */}
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-50 w-48 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
                  {category.subcategories.length > 0 && (
                    <ul className="py-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/sub_collection/${sub.slug}`}
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

            <div className="relative group" key="shop_by_age">
              <Link
                href={`/collection/shop_by_age`}
                className="text-gray-700 relative flex items-center"
                aria-haspopup="true"
                aria-expanded="false" // Change to "true" when the dropdown is open
              >
                <span className="transition-colors duration-300">
                  Shop By Age
                </span>
                <span className="block w-full h-0.5 bg-gray-900 absolute bottom-0 left-0 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>

              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md z-50 w-48 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
                <ul className="py-2">
                  <li>
                    <Link
                      href="/shop-by-age/0-2"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                      0-2 Years
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop-by-age/3-5"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                      3-5 Years
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop-by-age/6-12"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                      6-12 Years
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop-by-age/13-18"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                    >
                      13-18 Years
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Icons */}
          <div className="flex space-x-6 items-center">
            <UserIcon />
            <Link href="/cart">
              <CartComponent itemCount={getTotalItems()} />
            </Link>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <Menu
          ref={menuRef} // Add this line
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          categories={categories}
        />
      )}
    </>
  );
};

export default Navbar;
