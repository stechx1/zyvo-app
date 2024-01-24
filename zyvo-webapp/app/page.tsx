"use client";
import HomeFilters from "@/collections/HomeFilters";
import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import Button from "@/components/Button";
import { getAllPlacesSnapshot } from "@/firebase/place";
import { Place } from "@/types/place";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getAllPlacesSnapshot(
      (places) => {
        setPlaces(places);
        setIsLoading(false);
      },
      (e) => {
        setIsLoading(false);
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-30 py-8 space-y-7">
      <HomeFilters handleShowMap={handleShowMap} mapVisible={showMap} />
      <div className={`${showMap && "flex space-x-5"}`}>
        <div className={`${showMap && "w-[50%]"}`}>
          <PropertyList
            places={places}
            grids={
              showMap
                ? "xl:grid-cols-2 lg:grid-cols-2 grid-cols-1"
                : "xl:grid-cols-4 lg:grid-cols-3 grid-cols-2"
            }
          />
        </div>
        {showMap && (
          <div className="">
            <Image
              width={655}
              height={655}
              alt="map"
              src={"/images/long-map-image.svg"}
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="sticky flex justify-center sm:hidden block bottom-24">
        <Button
          text={!showMap ? "Show Map" : "Show List"}
          type="gray"
          roundedfull
        />
      </div>
      {places.length === 0 && (
        <div className="text-center m-auto h-[100%] flex items-center justify-center">
          {isLoading ? "Loading.." : "No Properties!"}
        </div>
      )}
    </div>
  );
}
