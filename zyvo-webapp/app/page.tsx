"use client";
import { FilterSearch } from "@/collections/FilterSearch/FilterSearch";
import HomeFilters from "@/collections/HomeFilters";
import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import Button from "@/components/Button";
import Map from "@/components/Maps";
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
    <div className="px-3 relative sm:px-[6%] md:px-20 lg:px-20 xl:px-30 py-8 space-y-7">
      <div className="z-10 sm:hidden border border-r-0 border-l-0 py-4 px-4 mt-[-2vh] mx-[-10px]">
        <FilterSearch />
      </div>
      <HomeFilters handleShowMap={handleShowMap} mapVisible={showMap} />
      <div className={`${showMap && "flex sm:space-x-5"}`}>
        <div className={`${showMap && "sm:w-[50%] hidden sm:block"}`}>
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
          <div className="w-[100%] sm:w-[50%]">
            <Map
              multipleCoords={places.map((p) => {
                return {
                  coord: p.coordinates,
                  text: (
                    <div className="flex">
                      <Image
                        src={"/icons/clock-icon.svg"}
                        alt="icon"
                        width={15}
                        height={15}
                      />
                      <div className="mx-1">{`$ ${p.pricePerHour} / hr`}</div>
                    </div>
                  ),
                };
              })}
              height={650}
            />
          </div>
        )}
      </div>
      <div className="sticky flex justify-center sm:hidden block bottom-24">
        <Button
          text={!showMap ? "Show Map" : "Show List"}
          type="gray"
          roundedfull
          icon={
            !showMap
              ? "/icons/white-showmap-icon.svg"
              : "/icons/white-filter-icon.svg"
          }
          onClick={handleShowMap}
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
