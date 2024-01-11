import Image from "next/image";
import React from "react";

export default function PropertySideDetails({
  imageURL,
  description,
  hours,
  price,
}: {
  imageURL: string;
  description: string;
  hours: number;
  price: number;
}) {
  return (
    <div className=" sm:order-1 border rounded-[6%] sm:rounded-lg w-full">
      <div className="flex m-3 gap-4">
        <Image
          src={imageURL}
          alt="detail-image"
          className="rounded-[15px] sm:w-[30%] lg:w-[35%] object-fill"
          width={50}
          height={50}
        />
        <div className="flex flex-col w-[70%]">
          <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
            {description ?? "-"}
          </div>
          <div className="flex space-x-2">
            <p className="flex items-center text-[10px] text-base sm:text-[14px] text-primary-amber-500 mr-0 font-Poppins">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={14}
                height={14}
                className="mr-1"
              />
              {"5.0"}
            </p>
            <p className=" sm:text-[14px] text-[10px] text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${1}k+)`}</p>
          </div>
          <div className="flex space-x-1">
            <Image
              src={"/icons/gray-location-icon.svg"}
              alt="location-icon"
              width={14}
              height={14}
            />
            <p className=" sm:text-[14px] text-[10px] text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins whitespace-nowrap">{`37 miles away`}</p>
          </div>
        </div>
      </div>
      <div className="hidden sm:block h-[0.5px] m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className={`flex flex-row justify-between my-[10px] mx-[20px]`}>
        <div className="text-black text-base font-normal font-Poppins whitespace-nowrap">
          {hours} Hour{hours > 1 && "s"}
        </div>
        <div className="text-black text-base font-normal font-Poppins  whitespace-nowrap">
          ${price}
        </div>
      </div>
      <div className={`flex flex-row justify-between my-[10px] mx-[20px]`}>
        <div className="text-black text-base font-normal font-Poppins whitespace-nowrap">
          Zyvo Service Fee
        </div>
        <div className="text-black text-base font-normal font-Poppins  whitespace-nowrap">
          $2
        </div>
      </div>

      <div className="h-[0.5px] m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className={`flex flex-row justify-between my-[10px] mx-[20px]`}>
        <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
          Total
        </div>
        <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
          ${price + 2}
        </div>
      </div>
    </div>
  );
}
