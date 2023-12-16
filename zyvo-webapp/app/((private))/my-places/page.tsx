"use client";
import PlaceModal from "@/collections/PlaceModal";
import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import Image from "next/image";
import React, { useState } from "react";

export default function MyPlaces() {
  interface CardProps {
    imageUrl: string;
    title: string;
    ratings: string;
    distance: string;
    hrlyRate: string;
    reviews: string;
  }

  const [properties, setProperties] = useState<CardProps[]>([
    {
      imageUrl: "/images/dummyImage-1.png",
      title: "Cabin in Peshastin",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
    {
      imageUrl: "/images/dummyImage-2.png",
      title: "Property 1",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
    {
      imageUrl: "/images/dummyImage-3.png",
      title: "Cabin in Peshastin",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
  ]);

  return (
    <div>
      <div className="flex justify-between font-medium">
        <div className="text-lg">My Places</div>
        <div
          role="button"
          className="flex space-x-2 border text-sm font-medium rounded-full py-2 px-4 text-center"
        >
          <Image
            src={"/icons/filter-icon-2.svg"}
            width={15}
            alt="filter-icon"
            height={15}
          />
          <span>Filters</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        {properties.map((items, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] overflow-hidden"
          >
            <div className="relative">
              <img
                src={items.imageUrl}
                alt={"title"}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute top-0 right-0 p-4 text-white">
                <div
                  className="text-black border rounded-full bg-white px-1"
                  role="button"
                >
                  &#8226;&#8226;&#8226;
                </div>
              </div>
            </div>
            <div className="py-1 px-0.5">
              <div className="flex justify-between font-normal">
                {items.title}
                <div className="flex space-x-1">
                  <Image
                    width={15}
                    height={15}
                    alt="clock-icon"
                    src={"/icons/dark-gray-clock-icon.svg"}
                  />
                  <span>{items.hrlyRate}</span>
                </div>
              </div>
              <div className="flex text-gray-700 text-base text-[#A4A4A4]">
                <span className="text-[#FCA800] mr-1">{items.ratings}</span>
                <span>({items.reviews})</span>
                <Image
                  src={"/icons/path0.svg"}
                  alt="star-icon"
                  width={15}
                  height={15}
                  className="ml-2 mr-1"
                />
                <span>{items.distance}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full justify-center flex items-center h-64 sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] relative rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-center my-50">
            <CustomDialog
              button={
                <Button text="+" type="gray" roundedfull className="text-xl" />
              }
            >
              <PlaceModal />
            </CustomDialog>
            <p className="text-sm mt-2">Add new Place</p>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="border-t-4 border-l-4 border-r-4 border-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
