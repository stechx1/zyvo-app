"use client";
import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import { getAllPlacesSnapshot } from "@/firebase/place";
import { Place } from "@/types/place";
import { useEffect, useState } from "react";

export default function Home() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 py-8">
      <PropertyList places={places} />
      {places.length === 0 && (
        <div className="text-center m-auto h-[100%] flex items-center justify-center">
          {isLoading ? "Loading.." : "No Properties!"}
        </div>
      )}
    </div>
  );
}
