import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import ProductCard from "./components/productCard";
import Header from "./components/Header";

const Product: React.FC = () => {
  const products = [
    {
      image: "/product/product1.png",
      title: "Foil Magic - Animal Wisdom Tales | 4-8 years | DIY Activity Kit",
      price: "16.00",
    },
    {
      image: "/product/product2.png",
      title: "Shooting Stars - A Journey Through the Galaxy",
      price: "21.15",
    },
    {
      image: "https://dummyimage.com/422x262",
      title: "Neptune - Dive Deep into the Ocean",
      price: "12.00",
    },
    {
      image: "https://dummyimage.com/423x263",
      title: "The 400 Blows - A Cinematic Classic",
      price: "18.40",
    },
    {
      image: "https://dummyimage.com/424x264",
      title: "Foil Magic - Animal Wisdom Tales | 4-8 years | DIY Activity Kit",
      price: "16.00",
    },
    {
      image: "https://dummyimage.com/425x265",
      title: "Shooting Stars - A Journey Through the Galaxy",
      price: "21.15",
    },
    {
      image: "https://dummyimage.com/427x267",
      title: "Neptune - Dive Deep into the Ocean",
      price: "12.00",
    },
    {
      image: "https://dummyimage.com/428x268",
      title: "The 400 Blows - A Cinematic Classic",
      price: "18.40",
    },
  ];

  return (
    <>
      <Navbar />
      <Header/>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                sellingPrice={product.price}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Product;
