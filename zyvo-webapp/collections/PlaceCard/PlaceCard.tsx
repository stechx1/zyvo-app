import Dropdown from "@/components/Dropdown";
import { useAuthContext } from "@/context/AuthContext";
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
  const { currentCoordinates } = useAuthContext();

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
    <div className="w-[48%] sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] overflow-hidden">
      <div className="relative">
        <img
          src={
            place.images?.length > 0 ? place.images[0] : "/images/no-image.jpg"
          }
          alt={"title"}
          className="w-full h-64 object-cover rounded-xl"
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
        <div className="flex justify-between font-normal">
          <div className="truncate w-2/3">{place.description}</div>
          <div className="flex space-x-1">
            <Image
              width={15}
              height={15}
              alt="clock-icon"
              src={"/icons/dark-gray-clock-icon.svg"}
            />
            <span>${place.pricePerHour}/h</span>
          </div>
        </div>
        <div className="flex text-gray-700 text-base">
          <p className="flex items-center text-[11px] sm:text-[16px] text-custom-amber-500 me-1">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {place.rating?.toFixed(1)}
          </p>
          <span>({place.reviewsCount ?? 0})</span>
          <Image
            src={"/icons/path0.svg"}
            alt="star-icon"
            width={15}
            height={15}
            className="ml-2 mr-1"
          />
          <span>{placeDistance} miles away</span>
        </div>
      </div>
    </div>
  );
}
