// components/Header.tsx
import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="relative w-full h-[300px] mt-[80px]">
      {" "}
      {/* Adjust height as needed */}
      <div className="relative w-full h-full">
        <Image
          src="/product/back1.png"
          alt="E-commerce Products"
          layout="fill" // Makes the image fill the container
          objectFit="cover" // Ensures the image covers the container
          priority // Ensures faster loading
        />
      </div>
    </header>
  );
};

export default Header;
