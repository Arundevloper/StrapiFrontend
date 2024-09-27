import React from "react";
import ProductCard from "./productCard";

const LatestArrivals: React.FC = () => {
  const newArrivals = [
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
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-custom-blue ">New Arrivals</h1>
          <p className="mt-2 text-gray-500 text-lg">
            Check out our latest product arrivals!
          </p>
        </div>

        {/* Responsive Product Grid with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {newArrivals.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestArrivals;
