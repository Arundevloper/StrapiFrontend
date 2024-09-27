"use client";

import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <div className="w-full h-auto pt-20 sm:pt-24  md:pt-16 lg:pt-10">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={500}
        >
          <div>
            <img
              src="/images/1.webp"
              srcSet="/images/11.png 640w, /images/1.webp 1024w"
              sizes="(max-width: 640px) 100vw, 1024px"
              alt="Slide 1"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <img
              src="/images/2.webp"
              alt="Slide 2"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <img
              src="/images/3.webp"
              alt="Slide 3"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <img
              src="/images/4.webp"
              alt="Slide 4"
              className="w-full h-auto object-cover"
            />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default DemoCarousel;
