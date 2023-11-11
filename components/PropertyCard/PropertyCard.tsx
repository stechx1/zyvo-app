import React from "react";
import Image from "next/image";
import { PropertyCardProps } from "@/types";
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
        className="bg-cover bg-center relative h-[165px] xs:h-[260px] md:h-[360px] p-3 shadow-md mb-4 rounded-xl"
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
            className="w-[22px] h-[19px] xs:w-[30px] xs:h-[30px]"
          />
        </div>
        <div className="bg-opacity-80 bg-white text-black p-3 rounded-xl items-center gap-4 mt-[225px] hidden md:flex">
          <Image
            src={hostImage}
            alt={"host-image"}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md">Host By {getEllipsesText(host, 10)}</p>
            <p className="text-sm">{location}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-0 md:px-3">
        <div className="justify-between flex">
          <p className="sm:text-lg lg:text-md text-[14px] font-medium md:font-normal">
            {getEllipsesText(title, 15)}
          </p>
          <p className="items-center hidden md:flex text-[16px]">
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
        <div className="items-center flex gap-[0.3rem] sm:gap-1">
          <p className="flex items-center text-[11px] sm:text-[16px] text-custom-amber-500 mr-0">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {rating}
          </p>
          <p className=" sm:text-[16px] text-[11px] text-secondary-neutral-400 mr-0 sm:mr-2">{`(${reviews})`}</p>
          <p className="flex items-center  text-[10px] sm:text-[16px] text-secondary-neutral-400">
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
        <div>
          <p className="items-center md:hidden flex text-[12px] sm:text-lg font-medium">
            <Image
              src={"/icons/dark-gray-clock-icon.svg"}
              alt="clock-icon"
              width={16}
              height={16}
              className="mr-2"
            />
            ${price} / h
          </p>
        </div>
      </div>
    </div>
  );
};
