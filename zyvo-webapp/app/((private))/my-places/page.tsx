"use client";
import PlaceCard from "@/collections/PlaceCard/PlaceCard";
import PlaceModal from "@/collections/PlaceModal";
import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import { useCommonContext } from "@/context/CommonContext";
import {
  addUpdatePlace,
  deletePlace,
  getMyPlacesSnapshot,
} from "@/firebase/place";
import { getGooglePlaces } from "@/lib/actions";
import { debounce } from "@/lib/utils";
import { CoordinatesType, Place } from "@/types/place";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { geohashForLocation } from "geofire-common";

export default function MyPlaces() {
  const { user, mode } = useCommonContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const defaultPlace: Place = {
    placeId: "",
    addOns: [],
    allowPets: false,
    ameneties: [],
    availableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    availableDays: [0, 1, 2, 3, 4, 5, 6],
    availableHoursFrom: "12:00",
    availableHoursTo: "23:30",
    bathrooms: 1,
    peopleCount: 1,
    city: "",
    country: "",
    description: "",
    discountedMinHours: 4,
    discountPercentage: 5,
    hostRules: "",
    images: [],
    instantBook: true,
    minHours: 1,
    parkingRules: "",
    pricePerHour: 10,
    activityType: "STAYS",
    selfCheckIn: true,
    spaceType: "HOME",
    state: "",
    street: "",
    zipCode: "",
    reviewsCount: 0,
    rating: 0,
    coordinates: { lat: 0, lng: 0 },
    geohash: geohashForLocation([0, 0]),
    status: "ACTIVE",
    "X-SUN": true,
    "X-MON": true,
    "X-TUE": true,
    "X-WED": true,
    "X-THU": true,
    "X-FRI": true,
    "X-SAT": true,
    "X-JAN": true,
    "X-FEB": true,
    "X-MAR": true,
    "X-APR": true,
    "X-MAY": true,
    "X-JUN": true,
    "X-JUL": true,
    "X-AUG": true,
    "X-SEP": true,
    "X-OCT": true,
    "X-NOV": true,
    "X-DEC": true,
  };
  const [place, setPlace] = useState<Place>(defaultPlace);
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (mode === "GUEST") {
      router.push("/");
      return;
    }
    const unsubscribe = getMyPlacesSnapshot(
      user.userId,
      (places) => {
        setPlaces(places);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user, mode]);

  const onSubmitHandler = () => {
    if (!user) return;
    if (!validatePlace()) return;
    setIsLoading(true);
    addUpdatePlace(place, user?.userId).then(({ result, error }) => {
      if (error) {
        toast.error("error sending message!");
      } else {
        setIsModalOpen(false);
        toast.success("Place added Successfully!");
      }
      setIsLoading(false);
    });
  };

  const validatePlace = () => {
    let isValid = true;
    if (place.images.length === 0) {
      toast.error("Please add at least 1 image of your place!");
      isValid = false;
    }
    if (!place.description) {
      toast.error("Please add Description of your place!");
      isValid = false;
    }
    if (!place.country) {
      toast.error("Please add Country of your place!");
      isValid = false;
    }
    if (!place.city) {
      toast.error("Please add City of your place!");
      isValid = false;
    }
    return isValid;
  };
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    timer.current = debounce(
      () => {
        getCoords(
          `${place.street} ${place.city} ${place.state} ${place.country}`
        );
      },
      2000,
      timer.current
    )();
  }, [place.city, place.country, place.street, place.state, timer]);

  const getCoords = async (query: string) => {
    const result = await getGooglePlaces(query);
    let coords: CoordinatesType;

    if (result.length > 0) {
      coords = result[0].geometry.location;
    }
    setPlace((prev) => {
      return {
        ...prev,
        coordinates: coords,
      };
    });
  };

  return (
    <div>
      <div className="flex justify-between font-medium mt-10">
        <div className="text-h1 mb-8 ml-2">My Places</div>
        <div
          role="button"
          className="flex space-x-2 border text-sm font-medium rounded-full h-12 items-center py-2 px-4 text-center"
        >
          <Image
            src={"/icons/filter-icon-2.svg"}
            width={15}
            alt="filter-icon"
            height={15}
          />
          <span>Filters</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2">
        {places.map((place) => (
          <PlaceCard
            key={place.placeId}
            menuOptions={[
              {
                title: "View",
                onClick: () => {
                  router.push("/property-details/" + place.placeId);
                },
              },
              {
                title: "Calander View",
                onClick: () => {
                  router.push("/place-calendar/" + place.placeId);
                },
              },
              {
                title: "Edit",
                onClick: () => {
                  setIsModalOpen(true);
                  setPlace(place);
                },
              },
              {
                title: "Delete",
                onClick: () => {
                  deletePlace(place.placeId).then(({ error }) => {
                    if (error) {
                      toast.error(error.message);
                    } else {
                      toast.success("Place deleted successfully!");
                    }
                  });
                },
              },
            ]}
            place={place}
          />
        ))}
        <div className="flex-col bg-white justify-center flex items-center h-[165px] xs:h-[260px] md:h-[330px] lg:h-[360px] relative rounded-2xl border-2 border-dashed border-gray-200">
          <Button
            text="+"
            type="gray"
            roundedfull
            className="xl:text-[39px] text-[20px] px-4 xl:py-[17px] xl:px-3.5"
            onClick={() => {
              setIsModalOpen(true);
              setPlace(defaultPlace);
            }}
          />
          <p className="text-base md:text-lg text-[#3A4B4C] mt-3">
            Add new Place
          </p>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="border-t-4 border-l-4 border-r-4 border-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
      <CustomDialog open={isModalOpen} onClose={setIsModalOpen}>
        <PlaceModal
          place={place}
          setPlace={setPlace}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmitHandler}
          isLoading={isLoading}
        />
      </CustomDialog>
    </div>
  );
}
