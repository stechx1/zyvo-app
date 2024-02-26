"use client";
import { FilterSearch } from "@/collections/FilterSearch/FilterSearch";
import HomeFilters from "@/collections/HomeFilters";
import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import Button from "@/components/Button";
import { MultiMap } from "@/components/Maps";
import { useCommonContext } from "@/context/CommonContext";
import { useFilterContext } from "@/context/FilterContext";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, mode, places } = useCommonContext();
  const { onClearSearch } = useFilterContext();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const [width] = useScreenDimensions()

  useEffect(() => {
    if (user && mode == "HOST") {
      router.push("/my-places");
      return;
    }
  }, [user, mode]);

  useEffect(() => {
    onClearSearch();
  }, []);

  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className='px-3 relative sm:px-[6%] lg:px-20 xl:px-30 py-8 space-y-7 sm:bg-[url("/images/dotted-background.svg")] bg-no-repeat'>
      <div className="z-10 sm:hidden border border-r-0 border-l-0 py-4 px-4 mt-[-2vh] mx-[-10px]">
        <FilterSearch />
      </div>
      { width > 768 &&
        <HomeFilters
        showMapBtn={places.length > 0}
        handleShowMap={handleShowMap}
        mapVisible={showMap}
      />}
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
        {showMap && places && (
          <div className="w-[100%] sm:w-[50%]">
            <MultiMap
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
      {places.length > 0 && (
        <div
          className={`sticky flex justify-center sm:hidden ${
            user ? "bottom-24" : "bottom-4"
          }`}
        >
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
      )}
      {places.length === 0 && (
        <div className="text-center m-auto h-[100%] flex items-center justify-center">
          {"No Properties!"}
        </div>
      )}
    </div>
  );
}
