import React, { useEffect, useRef, useState } from 'react';

interface LazyLoadImageProps {
  src: string;
  alt: string;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          imgObserver.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current) {
      imgObserver.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        imgObserver.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : undefined}
      alt={alt}
      className="w-full h-auto object-cover"
      loading="lazy" // Native lazy loading
    />
  );
};

export default LazyLoadImage;
