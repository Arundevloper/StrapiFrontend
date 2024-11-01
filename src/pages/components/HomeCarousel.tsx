"use client";

import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LazyLoadImage from "./LazyLoading"; // Adjust this import based on your project structure
import { fetchBanners } from "../api/banner"; // Adjust this import based on your project structure
import { Banner } from "../_utils/types/Banner"; // Adjust this import based on your project structure
import Link from "next/link"; // Import Link from next/link

const DemoCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:1337"; // Base URL for your Strapi backend
  const frontUrl="http://localhost:3000";

  useEffect(() => {
    const loadBanners = async () => {
      const fetchedBanners = await fetchBanners();
      setBanners(fetchedBanners);
      setLoading(false);
    };
    loadBanners();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching
  }

  return (
    <div className="w-full h-auto pt-20 sm:pt-24 md:pt-16 lg:pt-10">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={500}
      >
        {banners.map((banner) => {
          // Construct the image URL from the 'large' format
          const imageUrl = `${baseUrl}${banner.cover_image.formats.large.url}`;

          // Prepend the base URL to the link if it's a relative path
          const linkUrl = banner.link.startsWith("http") ? banner.link : `${frontUrl}${banner.link}`;

          // Log the image URL and link URL
          console.log("Image URL:", imageUrl); // Log the image URL
          console.log("Link URL:", linkUrl); // Log the link URL

          return (
            <div key={banner.id}>
              <Link href={linkUrl} passHref>
                <div className="cursor-pointer"> {/* Add cursor-pointer class */}
                  <LazyLoadImage
                    src={imageUrl} // Use the complete URL for the image
                    alt={banner.title}
                    effect="blur" // Optional: Add blur effect while loading
                    className="w-full h-auto object-cover"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
