"use client";
import PlaceCard from "@/collections/PlaceCard/PlaceCard";
import PlaceModal from "@/collections/PlaceModal";
import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import { useCommonContext } from "@/context/CommonContext";
import { addPlace, deletePlace, getMyPlacesSnapshot } from "@/firebase/place";
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
    addPlace(place, user?.userId).then(({ result, error }) => {
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
      <div className="flex justify-between font-medium">
        <div className="text-h1 mb-5">My Places</div>
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
      <div className="flex flex-wrap gap-2 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4 mt-3">
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
        <div className="w-[48%] flex-col justify-center flex items-center h-80 sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[22%] relative rounded-2xl border-2 border-dashed border-gray-200">
          <Button
            text="+"
            type="gray"
            roundedfull
            className="xl:text-[39px] xl:py-[15px] xl:px-3.5"
            onClick={() => {
              setIsModalOpen(true);
              setPlace(defaultPlace);
            }}
          />
          <p className="text-lg text-[#3A4B4C] mt-3">Add new Place</p>
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
