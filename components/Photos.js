"use client";

import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const imageData = [
  { src: "https://picsum.photos/id/240/600/400", credit: "John Doe", organization: "ΑΑΑ" },
  { src: "https://picsum.photos/id/250/600/400", credit: "Jane Doe", organization: "ΑΑΑ" },
  { src: "https://picsum.photos/id/260/600/400", credit: "Jim Doe", organization: "ΑΑΑ" },
];

function Photos() {
  const [isLoading, setIsLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  const changeSlide = (newSlide) => {
    setIsLoading(true);
    setSlide(newSlide);
  };

  const nextSlide = () => {
    changeSlide(slide === imageData.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    changeSlide(slide === 0 ? imageData.length - 1 : slide - 1);
  };

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">FEATURED PHOTOS</h2>
      <div className="flex justify-center items-center relative mt-4 noSelect">
        <BsArrowLeftCircleFill onClick={prevSlide} className="absolute left-1 z-10 cursor-pointer text-3xl text-gray-800" />
        {isLoading && (
          <div
            style={{
              width: "600px",
              height: "400px",
              backgroundColor: "#f3f3f3",
              animation: "pulse 2s infinite",
            }}
          />
        )}
        {imageData.map((item, idx) => (
          <img
            src={item.src}
            key={idx}
            onLoad={() => setIsLoading(false)}
            className={`rounded-xl transition-opacity duration-500 ease-in-out ${slide === idx ? "opacity-100" : "opacity-0 absolute"} w-full h-auto`}
          />
        ))}
        <BsArrowRightCircleFill onClick={nextSlide} className="absolute right-1 z-10 cursor-pointer text-3xl text-gray-800" />
      </div>
      <div className="text-center">
        <p className="text-sm"><i>Credit: {imageData[slide].credit} &nbsp;&bull;&nbsp; Organization: {imageData[slide].organization}</i></p>
      </div>
      <p>Want to submit a photo?</p>
    </div>
  );
};

export default Photos;