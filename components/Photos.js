"use client";

import Image from 'next/image';
import React, { useEffect, useState, useCallback } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Modal from "./Modal";

function Photos() {
  const [imageData, setImageData] = useState([]);
  const [slide, setSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/photos`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setImageData(data.imageData);
        setSlide(0);
      } catch (error) {
        console.error('Failed to fetch image data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImageData();
  }, []);

  const nextSlide = useCallback(() => {
    setSlide(slide => (slide === imageData.length - 1 ? 0 : slide + 1));
  }, [imageData.length]);

  const prevSlide = useCallback(() => {
    setSlide(slide => (slide === 0 ? imageData.length - 1 : slide - 1));
  }, [imageData.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, slide]);

  return (
    <div className="w-3/4 pb-10">
      <h2 className="text-2xl">FEATURED PHOTOS</h2>
      <div className="flex justify-center items-center relative mt-4 noSelect">
        {isLoading ? (
          <div className="animate-pulse rounded-xl bg-white w-full h-full" style={{ paddingTop: '66.66%' }}></div>
        ) : (
          <>
            <BsArrowLeftCircleFill onClick={prevSlide} className="absolute left-1 z-10 cursor-pointer text-3xl drop-shadow-md" />
            {imageData.map((item, idx) => (
              <Image
                src={item.src}
                key={idx}
                alt={`Photo ${idx + 1}`}
                width={1920}
                height={1080}
                priority
                className={`rounded-xl transition-opacity duration-500 ease-in-out ${slide === idx ? "opacity-100" : "opacity-0 absolute"} w-full h-auto shadow-xl`}
              />
            ))}
            <BsArrowRightCircleFill onClick={nextSlide} className="absolute right-1 z-10 cursor-pointer text-3xl drop-shadow-md" />
          </>
        )}
      </div>

      {isLoading ? (
        <p className="text-center mt-2 text-xs">‎</p>
      ) : (
        <div className="text-center mt-2">
          <p className="text-xs"><i>Credit: {imageData[slide]?.credit} &nbsp;&bull;&nbsp; Organization: {imageData[slide]?.organization}</i></p>
        </div>
      )}
      <p className="mt-4 text-center">
        Want to submit a photo? &nbsp;
        <button className="underline font-semibold" onClick={() => setIsModalOpen(true)}>Click Here</button>
      </p>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Photos;