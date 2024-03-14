"use client";

import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Modal from "./Modal";

const imageData = [
  { src: "https://picsum.photos/id/240/600/400", credit: "John Doe", organization: "ΑΑΑ" },
  { src: "https://picsum.photos/id/250/600/400", credit: "Jane Doe", organization: "ΑΑΑ" },
  { src: "https://picsum.photos/id/260/600/400", credit: "Jim Doe", organization: "ΑΑΑ" },
];

function Photos() {
  const [slide, setSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = () => {
    setSlide(slide === imageData.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? imageData.length - 1 : slide - 1);
  };

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">FEATURED PHOTOS</h2>
      <div className="flex justify-center items-center relative mt-4 noSelect">
        <BsArrowLeftCircleFill onClick={prevSlide} className="absolute left-1 z-1 cursor-pointer text-3xl text-gray-800" />
        {imageData.map((item, idx) => (
          <img
            src={item.src}
            key={idx}
            className={`rounded-xl transition-opacity duration-500 ease-in-out ${slide === idx ? "opacity-100" : "opacity-0 absolute"} w-full h-auto`}
          />
        ))}
        <BsArrowRightCircleFill onClick={nextSlide} className="absolute right-1 z-1 cursor-pointer text-3xl text-gray-800" />
      </div>
      <div className="text-center">
        <p className="text-sm"><i>Credit: {imageData[slide].credit} &nbsp;&bull;&nbsp; Organization: {imageData[slide].organization}</i></p>
      </div>
      <p>
        Want to submit a photo? &nbsp;
        <button className="underline" onClick={() => setIsModalOpen(true)}>Click Here</button>
      </p>
      <div className="z-2">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Photos;