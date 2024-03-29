import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getFullName } from "@/lib/utils";
import { CoordinatesType, Place } from "@/types/place";
import { User } from "@/types/user";
import { DocumentReference } from "firebase/firestore";
import { getUserByRef, updateFavourites } from "@/firebase/user";
import { useRouter } from "next/navigation";
import { useCommonContext } from "@/context/CommonContext";
import { getRouteDetails } from "@/lib/actions";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
export const PropertyCard = ({
  place,
  currentCoordinates,
}: {
  place: Place;
  currentCoordinates: CoordinatesType | null;
}) => {
  const router = useRouter();
  const [width] = useScreenDimensions();
  const { user, setUser } = useCommonContext();
  const [placeUser, setPlaceUser] = useState<null | User>();
  const [placeImageIndex, setPlaceImageIndex] = useState<number>(0);
  const [imageOpacity, setImageOpacity] = useState<number>(1);
  const [showCarouselItems, setShowCarouselItems] = useState(false);
  const [placeDistance, setPlaceDistance] = useState<number | null>(null);

  useEffect(() => {
    if (!place) return;
    getDistance();
    async function getDistance() {
      if (currentCoordinates && place?.coordinates) {
        const routes = await getRouteDetails(
          currentCoordinates,
          place?.coordinates
        );
        if (routes) setPlaceDistance(routes.distance);
        else setPlaceDistance(null);
      } else setPlaceDistance(null);
    }
  }, [currentCoordinates, place]);

  useEffect(() => {
    if (place.userRef) {
      getUser(place.userRef);
      setPlaceImageIndex(0);
    }
  }, [place.userRef]);

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setPlaceUser(result);
    }
  };

  const handleImageChange = (newIndex: number) => {
    setImageOpacity(0);
    setTimeout(() => {
      setPlaceImageIndex(newIndex);
      setImageOpacity(1);
    }, 100);
  };
  const handleFavoriteChange = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !place) return;
    const { result } = await updateFavourites(user?.userId, place?.placeId);
    if (result) setUser({ ...user, favoritePlaces: result });
  };
  return (
    <div
      className="rounded-xl relative overflow-hidden mb-6"
      role="button"
      onClick={() => {
        if (user) router.push("/property-details/" + place.placeId);
        else router.push("/signin");
      }}
      onMouseEnter={() => width > 768 && setShowCarouselItems(true)}
      onMouseLeave={() => setShowCarouselItems(false)}
    >
      <div
        className="bg-cover bg-white bg-center relative h-[185px] xs:h-[260px] md:h-[360px] p-2 sm:p-3 shadow-md mb-2 rounded-xl"
        style={{
          backgroundImage: `url(${
            place.images.length > 0
              ? place.images[placeImageIndex]
              : "images/no-image.jpg"
          })`,
          paddingBottom: "75%",
          transition: "opacity 0.3s ease-in-out",
          opacity: imageOpacity,
        }}
      >
        {place.instantBook && (
          <div className="absolute text-center flex w-full space-x-2">
            <div className="bg-white rounded-full pl-1.5 pr-2 sm:pl-2 sm:pr-4 py-0.5 sm:py-1.5 flex items-center space-x-1">
              <Image
                src={"/icons/green-instant-icon.svg"}
                alt="square-fit"
                width={12}
                height={12}
                className="sm:w-[19px] sm:h-[19px]"
              />
              <span className="mb-0.5 text-sm sm:text-base">Instant book</span>
            </div>
          </div>
        )}
        <div className="absolute text-center justify-center flex w-full space-x-2 mx-[-12px]">
          {place.images.length > 1 &&
            showCarouselItems && !place.instantBook &&
            Array.from({ length: place.images.length }, (_, index) => (
              <div
                key={index}
                className={`drop-shadow-xl rounded-full w-[10px] h-[9px] ${
                  +index === placeImageIndex
                    ? "bg-[#fff]"
                    : "bg-gray-300 opacity-[0.6]"
                }`}
              ></div>
            ))}
        </div>
        <div>
          {place && (
            <div
              className={`${!user && "invisible"} flex justify-end items-start`}
            >
              {!user?.favoritePlaces?.includes(place.placeId) ? (
                <Image
                  src={"/icons/heart-icon-gray.svg"}
                  alt="heart-icon"
                  width={27}
                  height={27}
                  className="opacity-50 cursor-pointer"
                  onClick={handleFavoriteChange}
                />
              ) : (
                <Image
                  src={"/icons/heart-icon-red.svg"}
                  alt="heart-icon"
                  width={27}
                  height={27}
                  className="opacity-80 cursor-pointer"
                  onClick={handleFavoriteChange}
                />
              )}
            </div>
          )}
        </div>
        <div
          className={`flex mt-[6.5rem] ${
            !placeImageIndex ? "justify-end" : "justify-between"
          } w-full`}
        >
          <div
            className={`${
              place.images.length < 2 || !showCarouselItems || !placeImageIndex
                ? "invisible"
                : "block"
            } drop-shadow-lg`}
            onClick={(e) => {
              e.stopPropagation();
              handleImageChange(placeImageIndex - 1);
            }}
            role="button"
          >
            <Image
              src={"/icons/white-carousel-right-arrow.svg"}
              alt={"heart-icon"}
              width={30}
              height={30}
              className="w-[22px] h-[19px] xs:w-[30px] xs:h-[30px] rotate-180"
            />
          </div>
          <div
            className={`${
              place.images.length < 2 ||
              !showCarouselItems ||
              place.images.length - 1 === placeImageIndex
                ? "hidden"
                : "block"
            } drop-shadow-lg`}
            onClick={(e) => {
              e.stopPropagation();
              handleImageChange(placeImageIndex + 1);
            }}
            role="button"
          >
            <Image
              src={"/icons/white-carousel-right-arrow.svg"}
              alt={"heart-icon"}
              width={30}
              height={30}
              className="w-[22px] h-[19px] xs:w-[30px] xs:h-[30px]"
            />
          </div>
        </div>
        <div
          className={`bg-opacity-80 bg-white text-black p-3 rounded-xl items-center gap-4 ${
               "mt-[97px]"
          } hidden md:flex`}
        >
          <Image
            src={
              placeUser?.photoURL && placeUser?.photoURL?.length > 0
                ? placeUser?.photoURL
                : "/icons/profile-icon.png"
            }
            alt={"host-image"}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-md line-clamp-1">
              Host By {placeUser ? getFullName(placeUser) : "-"}
            </p>
            <p className="text-sm">{place.country + " " + place.state}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-0 md:px-3">
        <div className="justify-between flex">
          <p className="sm:text-lg lg:text-[20px] text-[14px] font-medium md:font-normal  line-clamp-1">
            {place.description}
          </p>
          <p className="items-center hidden md:flex text-[16px] sm:text-lg whitespace-nowrap">
            <Image
              src={"/icons/dark-gray-clock-icon.svg"}
              alt="clock-icon"
              width={18}
              height={18}
              className="mr-2 sm:w-[21px] sm:h-[21px]"
            />
            ${place.pricePerHour} / h
          </p>
        </div>
        <div className="items-center flex gap-[0.3rem] sm:gap-1">
          <p className="flex text-[#FCA800] items-center text-[11px] sm:text-[17px] text-custom-amber-500 mr-0">
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
          {placeDistance && (
            <p className="flex items-center  text-[10px] sm:text-[16px] text-secondary-neutral-400">
              <Image
                src={"/icons/gray-location-icon.svg"}
                alt="location-icon"
                width={14}
                height={14}
                className="mr-1 sm:w-[20px] sm:h-[20px] sm:mt-0.5"
              />
              {placeDistance} miles away
            </p>
          )}
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
