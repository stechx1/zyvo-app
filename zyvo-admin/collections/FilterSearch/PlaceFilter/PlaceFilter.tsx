import React from "react";
import Image from "next/image";
import "../../../styles/globals.css"

const places = [
  { city: "New York", state: "US" },
  { city: "Brooklyn", state: "US" },
  { city: "Queens", state: " US" },
  { city: "Manhattan", state: " US" },
  { city: "Bronx", state: " US" },
  { city: "Fitor", state: " US" },
  { city: "New York", state: "US" },
  { city: "Brooklyn", state: "US" },
  { city: "Queens", state: " US" },
];

export const PlaceFilter = () => {
  return (
    <div className="border rounded-xl p-[18px] h-[380px] overflow-y-auto scrollbar">
      {places.map((place, index) => (
        <div className="flex mb-4 place hover:bg-secondary-gray-100 rounded-xl">
          <div
            key={index}
            className="rounded-xl bg-secondary-neutral-200 p-2 flex items-center w-11 h-11 justify-center mr-3 "
          >
            <Image
              src={"/icons/location-line-icon.svg"}
              alt="location-icon"
              width={22}
              height={22}
            />
          </div>

          <div className=" flex items-center">
            <p className="text-sm">{`${place.city}, ${place.state}`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
