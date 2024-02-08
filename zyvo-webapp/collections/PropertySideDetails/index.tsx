import Image from "next/image";
import React from "react";

export default function PropertySideDetails({
  imageURL,
  description,
  hours,
  price,
  rating,
  reviewsCount,
  distance,
}: {
  imageURL: string;
  description: string;
  hours: number;
  price: number;
  rating: number;
  reviewsCount: number;
  distance: number | null;
}) {
  return (
    <div className=" sm:order-1 border rounded-[6%] sm:rounded-lg lg:rounded-2xl w-full bg-white">
      <div className="flex p-3.5 gap-4 items-center">
        <Image
          src={imageURL}
          alt="detail-image"
          className="rounded-[15px] w-[5.5rem] h-[5.5rem] sm:w-[30%] md:w-[5rem] lg:w-[35%] xl:w-[26%] xl:h-[100px] object-cover"
          width={50}
          height={50}
        />
        <div className="flex flex-col w-[70%] space-y-0.5 md:space-y-0">
          <div className="text-black text-[17px] md:text-[22.5px] font-normal font-Poppins whitespace-nowrap">
            {description ?? "-"}
          </div>
          <div className="flex">
            <p className="flex items-center text-[14px] sm:text-[16px] text-primary-amber-500 mr-0 font-Poppins">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={17}
                height={17}
                className="mr-1 md:w-[15px] md:h-[15px]"
              />
              {rating?.toFixed(1) ?? 0}
            </p>
            <p className="md:text-[15px] ml-1 text-[14px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${
              reviewsCount ?? 0
            })`}</p>
          </div>
          {distance && (
            <div className="flex space-x-1 mt-0.5 items-center">
              <Image
                src={"/icons/gray-location-icon.svg"}
                alt="location-icon"
                width={17}
                height={17}
                className="md:w-[20px] md:h-[20px] mt-1"
              />
              <p className="md:text-[16px] text-[14px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins whitespace-nowrap">{`${distance} miles away`}</p>
            </div>
          )}
        </div>
      </div>
      <div className="hidden sm:block h-[0.5px] m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className={`flex flex-row justify-between md:my-[15px] mx-[20px]`}>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins whitespace-nowrap">
          {hours} Hour{hours > 1 && "s"}
        </div>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins  whitespace-nowrap">
          ${price}
        </div>
      </div>
      <div className={`flex flex-row justify-between my-2 md:my-[15px] mx-[20px]`}>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins whitespace-nowrap">
          Zyvo Service Fee
        </div>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins  whitespace-nowrap">
          $2
        </div>
      </div>
      <div className={`flex flex-row justify-between my-2 md:my-[15px] mx-[20px]`}>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins whitespace-nowrap">
          Cleaning Fee
        </div>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins  whitespace-nowrap">
          $0
        </div>
      </div>
      <div className={`flex flex-row justify-between my-2 md:my-[15px] mx-[20px]`}>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins whitespace-nowrap">
          Taxes
        </div>
        <div className="text-black text-[15px] md:text-[18px] font-normal font-Poppins  whitespace-nowrap">
          $0
        </div>
      </div>

      <div className="h-[0.5px] mx-[20px] md:m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className={`flex flex-row justify-between my-2 md:my-[15px] mx-[20px]`}>
        <div className="text-black text-[16.5px] md:text-[20px] font-normal font-Poppins whitespace-nowrap">
          Total
        </div>
        <div className="text-black text-[16.5px] md:text-[20px] font-normal font-Poppins whitespace-nowrap">
          ${price + 2}
        </div>
      </div>
    </div>
  );
}
