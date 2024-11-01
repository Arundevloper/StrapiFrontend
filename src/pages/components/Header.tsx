// components/Header.tsx
import React, { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  imageUrl: string; // Accept a URL for the image as a prop
}

const Header: React.FC<HeaderProps> = ({ imageUrl }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <header className="relative w-full h-[150px] mt-[80px] md:h-[250px] lg:h-[250px]">
      <div className="relative w-full h-full">
        {!imgLoaded && !imgError && (
          <div className="flex justify-center items-center h-full bg-gray-200">
            {/* Placeholder loading state */}
            Loading...
          </div>
        )}
        <Image
          src={imageUrl}
          alt="E-commerce Products"
          layout="fill"
          objectFit="cover"
          priority
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`${imgLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} // Fade in effect
        />
        {imgError && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-200">
            {/* Fallback or placeholder image can go here */}
            <span>Error loading image</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
