import { PropertyCardProps } from "@/types/components/card";
import React from "react";
import Image from "next/image";
import { getEllipsesText } from "@/lib/utils";

export const PropertyCard: React.FC<PropertyCardProps> = ({ propertyItem }) => {
  const {
    imageUrl,
    hostImage,
    host,
    location,
    title,
    price,
    rating,
    reviews,
    milesAway,
  } = propertyItem;

  return (
    <div className="rounded-xl relative overflow-hidden mb-6">
      <div
        className="bg-cover bg-center relative h-[380px] p-3 shadow-md mb-4 rounded-xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          paddingBottom: "75%",
        }}
      >
        <div className="flex justify-end items-start">
          <Image
            src={"/icons/gray-heart-icon.svg"}
            alt={"heart-icon"}
            width={30}
            height={30}
          />
        </div>
        <div className="bg-opacity-80 bg-white text-black p-3 rounded-xl flex items-center gap-4 mt-[245px]">
          <Image
            src={hostImage}
            alt={"host-image"}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md">Host By {host}</p>
            <p className="text-sm">{location}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3">
        <div className="justify-between flex">
          <p className="text-lg">{getEllipsesText(title, 15)}</p>
          <p className="flex items-center">
            <Image
              src={"/icons/dark-gray-clock-icon.svg"}
              alt="clock-icon"
              width={18}
              height={18}
              className="mr-2"
            />
            ${price} / h
          </p>
        </div>
        <div className="items-center flex gap-1">
          <p className="flex items-center text-sm text-custom-amber-500">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {rating}
          </p>
          <p className="text-sm text-secondary-neutral-400  mr-2">{`(${reviews})`}</p>
          <p className="flex items-center text-sm text-secondary-neutral-400">
            <Image
              src={"/icons/gray-location-icon.svg"}
              alt="location-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {milesAway} miles away
          </p>
        </div>
        
      </div>
    </div>
  );
};
