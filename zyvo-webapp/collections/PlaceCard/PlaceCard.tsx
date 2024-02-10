import Dropdown from "@/components/Dropdown";
import { useCommonContext } from "@/context/CommonContext";
import { getRouteDetails } from "@/lib/actions";
import { Place } from "@/types/place";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PlaceCard({
  place,
  menuOptions,
}: {
  place: Place;
  menuOptions: { title: string; onClick?: () => void }[];
}) {
  const [placeDistance, setPlaceDistance] = useState<number | null>(null);
  const { currentCoordinates } = useCommonContext();

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

  return (
    <div className="overflow-hidden">
      <div className="relative">
        <img
          src={
            place.images?.length > 0 ? place.images[0] : "/images/no-image.jpg"
          }
          alt={"title"}
          className="w-full h-[165px] xs:h-[260px] md:h-[330px] lg:h-[360px] object-cover rounded-2xl"
        />
        <div className="absolute top-0 right-0 m-4 text-white">
          <Dropdown items={menuOptions}>
            <div className="text-black w-[30px] aspect-square border rounded-full bg-white outline-none cursor-pointer flex justify-center ">
              <Image
                width={18}
                height={18}
                alt="clock-icon"
                src={"/icons/dots-vertical.svg"}
              />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="py-1 px-0.5">
        <div className="flex justify-between md:text-h3 items-center font-normal">
          <div className="truncate w-2/3">{place.description}</div>
          <div className="flex space-x-1 items-center">
            <Image
              width={15}
              height={15}
              className="sm:h-[22px] sm:w-[22px] mr-1"
              alt="clock-icon"
              src={"/icons/dark-gray-clock-icon.svg"}
            />
            <span>${place.pricePerHour}/h</span>
          </div>
        </div>
        <div className="flex text-gray-700 text-base">
          <p className="flex items-center text-[14px] text-[#FCA800] sm:text-[17px] text-custom-amber-500 me-1">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1 md:w-[17px] md:h-[17px]"
            />
            {place.rating?.toFixed(1)}
          </p>
          <span className="text-[#A4A4A4] text-[13px] sm:text-[16px]">({place.reviewsCount ?? 0})</span>
          {placeDistance !== null && (
            <>
              <Image
                src={"/icons/path0.svg"}
                alt="star-icon"
                width={15}
                height={15}
                className="ml-2 mr-1"
              />
              <span className="text-[#A4A4A4] text-[14px] sm:text-[16px]">{placeDistance} miles away</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
