"use client";
import PlaceModal from "@/collections/PlaceModal";
import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import Dropdown from "@/components/Dropdown";
import { useAuthContext } from "@/context/AuthContext";
import { addPlace, deletePlace, getMyPlacesSnapshot } from "@/firebase/place";
import { Place } from "@/types/place";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyPlaces() {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [place, setPlace] = useState<Place>({
    placeId: Math.random().toString(),
    addOns: [],
    allowPets: false,
    ameneties: [],
    availableMonths: [1, 2, 3],
    availableDays: [1, 2, 3, 4, 5, 6, 7],
    availableHoursFrom: "12:00",
    availableHoursTo: "12:00",
    bathrooms: 0,
    bedrooms: 0,
    beds: 0,
    city: "",
    coordinates: [1.9447, 2.4533],
    country: "",
    description: "",
    discountedMinHours: 2,
    discountPercentage: 30,
    hostRules: "",
    images: [],
    instantBook: true,
    minHours: 2,
    parkingRules: "",
    pricePerHour: 11,
    propertyType: "APARTMENT",
    selfCheckIn: true,
    spaceType: "HOME",
    state: "",
    street: "",
    zipCode: "",
  });
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
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
  }, [user]);

  const onSubmitHandler = () => {
    if (!user) return;
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

  return (
    <div>
      <div className="flex justify-between font-medium">
        <div className="text-lg">My Places</div>
        <div
          role="button"
          className="flex space-x-2 border text-sm font-medium rounded-full py-2 px-4 text-center"
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
      <div className="flex flex-wrap gap-4 mt-3">
        {places.map((place, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] overflow-hidden"
          >
            <div className="relative">
              <img
                src={
                  place.images?.length > 0
                    ? place.images[0]
                    : "/images/no-image.jpg"
                }
                alt={"title"}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute top-0 right-0 p-4 text-white">
                <Dropdown
                  items={[
                    {
                      title: "View",
                      onClick: () => {
                        router.push("/property-details/" + place.placeId);
                      },
                    },
                    {
                      title: "Delete",
                      onClick: () => {
                        deletePlace(place.placeId).then(({ error }) => {
                          if (error) {
                            toast.error("Error deleting place!");
                          } else {
                            toast.success("Place deleted successfully!");
                          }
                        });
                      },
                    },
                  ]}
                >
                  <div className="text-black border rounded-full bg-white px-1 outline-none cursor-pointer">
                    &#8226;&#8226;&#8226;
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="py-1 px-0.5">
              <div className="flex justify-between font-normal">
                {place.description}
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
                <span className="text-[#FCA800] mr-1">{5}</span>
                <span>({200})</span>
                <Image
                  src={"/icons/path0.svg"}
                  alt="star-icon"
                  width={15}
                  height={15}
                  className="ml-2 mr-1"
                />
                <span>{2}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full flex-col justify-center flex items-center h-64 sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] relative rounded-xl border-2 border-dashed border-gray-200">
            <Button
              text="+"
              type="gray"
              roundedfull
              className="text-xl"
              onClick={() => {
                setIsModalOpen(true);
              }}
            />
            <p className="text-sm mt-2">Add new Place</p>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="border-t-4 border-l-4 border-r-4 border-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
      <CustomDialog open={isModalOpen}>
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
