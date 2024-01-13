import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFullName } from "@/lib/utils";
import { Place } from "@/types/place";
import { User } from "@/types/profile";
import { DocumentReference } from "firebase/firestore";
import { getUserByRef } from "@/firebase/user";
import { useRouter } from "next/navigation";
export const PropertyCard = ({ place }: { place: Place }) => {
  const router = useRouter();
  const [placeUser, setPlaceUser] = useState<null | User>();

  useEffect(() => {
    if (place.userRef) getUser(place.userRef);
  }, []);

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setPlaceUser(result);
    }
  };
  return (
    <div
      className="rounded-xl relative overflow-hidden mb-6"
      role="button"
      onClick={() => {
        router.push("/property-details/" + place.placeId);
      }}
    >
      <div
        className="bg-cover bg-center relative h-[165px] xs:h-[260px] md:h-[360px] p-3 shadow-md mb-4 rounded-xl"
        style={{
          backgroundImage: `url(${
            place.images.length > 0
              ? place.images[0]
              : "images/no-image.jpg"
          })`,
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
            src={placeUser?.photoURL ?? "/icons/profile-icon.png"}
            alt={"host-image"}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md line-clamp-1">
              Host By {placeUser ? getFullName(placeUser) : "-"}
            </p>
            <p className="text-sm">
              {place.country + " " + place.state}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-0 md:px-3">
        <div className="justify-between flex">
          <p className="sm:text-lg lg:text-md text-[14px] font-medium md:font-normal  line-clamp-1">
            {place.description}
          </p>
          <p className="items-center hidden md:flex text-[16px] whitespace-nowrap">
            <Image
              src={"/icons/dark-gray-clock-icon.svg"}
              alt="clock-icon"
              width={18}
              height={18}
              className="mr-2"
            />
            ${place.pricePerHour} / h
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
            {place.rating?.toFixed(1)}
          </p>
          <p className=" sm:text-[16px] text-[11px] text-secondary-neutral-400 mr-0 sm:mr-2">{`(${place.reviewsCount})`}</p>
          <p className="flex items-center  text-[10px] sm:text-[16px] text-secondary-neutral-400">
            <Image
              src={"/icons/gray-location-icon.svg"}
              alt="location-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {1} miles away
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
            ${place.pricePerHour} / h
          </p>
        </div>
      </div>
    </div>
  );
};
