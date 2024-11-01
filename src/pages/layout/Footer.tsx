"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../api/category"; // Adjust the import path as needed
import { Category } from "../_utils/types/Category";

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseData = await getCategories();
        setCategories(responseData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Prepare the footer categories
  const footerCategories = [
    {
      title: "Shop By Age",
      links: [
        { label: "3-6 years", route: "/shop-by-age/3-6" },
        { label: "6-8 years", route: "/shop-by-age/6-8" },
        { label: "8-10 years", route: "/shop-by-age/8-10" },
        { label: "10+ years", route: "/shop-by-age/10plus" },
      ],
    },
    {
      title: "Shop By Feature",
      links: categories.map((category) => ({
        label: category.category_name,
        route: `/collection/${category.slug}`,
      })), // Dynamic links from fetched data
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", route: "/help" },
        { label: "Contact Us", route: "/contact" },
        { label: "Pricing", route: "/pricing" },
        { label: "Privacy Policy", route: "/privacy-policy" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "About Us", route: "/about" },
        { label: "Careers", route: "/careers" },
        { label: "Blog", route: "/blog" },
        { label: "Press", route: "/press" },
      ],
    },
  ];

  // Dynamic data for social media links
  const socialLinks = [
    {
      name: "facebook",
      path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    },
    {
      name: "twitter",
      path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
    },
    {
      name: "instagram",
      path: "M2 2h20v20H2V2zm4 8a6 6 0 1112 0 6 6 0 01-12 0z",
    },
    {
      name: "linkedin",
      path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 body-font mt-auto">
      <div className="container px-8 py-20 mx-auto flex md:items-start lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Logo and About Section */}
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-white"
          >
            {/* Only the logo image */}
            <img
              src="/lab.png"
              alt="Logo"
              className="w-full h-full "
            />
          </Link>

          <p className="text-gray-300 text-base mt-4">
            Innovating solutions to help you grow your business.
          </p>
        </div>

        {/* Link Categories */}
        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {footerCategories.map((category, idx) => (
            <div key={idx} className="px-4 mb-10">
              <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-3">
                {category.title}
              </h2>
              <nav className="list-none">
                {category.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.route} // Use the route defined in the links
                      className="text-gray-400 hover:text-gray-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2024 LabnBox
            <Link
              href="https://steamtroops.com"
              className="text-gray-500 ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {socialLinks.map((social, idx) => (
              <Link
                href="/"
                key={idx}
                className="text-gray-400 hover:text-white ml-3"
              >
                <svg
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d={social.path}></path>
                </svg>
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
