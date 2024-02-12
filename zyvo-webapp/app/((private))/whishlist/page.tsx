"use client";
import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import { useCommonContext } from "@/context/CommonContext";
import { getAllPlaces } from "@/firebase/place";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, mode, places, setPlaces } = useCommonContext();
  const [isLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user && mode == "HOST") {
      router.push("/my-places");
      return;
    }
  }, [user, mode]);

  useEffect(() => {
    getAllPlaces(
      (places) => {
        setPlaces(places);
      },
      (e) => {
        console.log(e);
      }
    );
  }, []);

  return (
    <div className='relative py-8 space-y-7 sm:bg-[url("/images/dotted-background.png")] bg-no-repeat'>
      <div>
        <div>
          {user && (
            <PropertyList
              places={places.filter((place) =>
                user.favoritePlaces?.includes(place.placeId)
              )}
              grids={"xl:grid-cols-4 lg:grid-cols-3 grid-cols-2"}
            />
          )}
        </div>
      </div>

      {places.length === 0 && (
        <div className="text-center m-auto h-[100%] flex items-center justify-center">
          {isLoading ? "Loading.." : "No Properties!"}
        </div>
      )}
    </div>
  );
}
