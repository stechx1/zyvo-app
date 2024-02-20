import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import { useFilterContext } from "@/context/FilterContext";
import { getDatesText } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import PlaceModal from "../PlaceModal";
import { Place } from "@/types/place";
import { geohashForLocation } from "geofire-common";
interface Props {
  handleShowMap: () => void;
  mapVisible: boolean;
  showMapBtn: boolean;
}

function HomeFilters(props: Props) {
  const { handleShowMap, mapVisible, showMapBtn } = props;

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [place, setPlace] = useState<Place>(defaultPlace);
  const {
    isDatesSearched,
    isActivitySearched,
    isAddressSearched,
    isHoursSearched,
    selectedActivity,
    hours,
    selectedAddress,
    selectedDates,
    setHours,
    setIsActivitySearched,
    setIsAddressSearched,
    setIsDatesSearched,
    setIsHoursSearched,
    setSelectedActivity,
    setSelectedDates,
    setSelectedAddress,
    onSearch,
  } = useFilterContext();

  const onSubmitHandler = () => {
    
  };

  return (
    <div className="flex justify-between ">
      <div className="flex flex-wrap gap-5">
        {isAddressSearched && selectedAddress && (
          <div
            className={`border rounded-full py-2 px-3 sm:py-3 sm:px-5 gap-3  flex items-center bg-white`}
          >
            <Image
              src={"/icons/location-line-icon.svg"}
              alt={"icon"}
              width={20}
              height={20}
            />
            <div>{selectedAddress.name}</div>
            <Image
              src="/icons/close-icon-grey-background.svg"
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                setSelectedAddress(undefined);
                setIsAddressSearched(false);
                onSearch({
                  selectedActivity,
                  hours,
                  selectedAddress: undefined,
                  selectedDates,
                });
              }}
            />
          </div>
        )}
        {isDatesSearched && selectedDates && selectedDates?.length > 0 && (
          <div
            className={`border rounded-full py-2 px-3 sm:py-3 sm:px-5 gap-3  flex items-center bg-white`}
          >
            <Image
              src={"/icons/calendar-icon.svg"}
              alt={"icon"}
              width={20}
              height={20}
            />
            <div>{getDatesText(selectedDates)}</div>
            <Image
              src="/icons/close-icon-grey-background.svg"
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                setSelectedDates(undefined);
                setIsDatesSearched(false);
                onSearch({
                  selectedActivity,
                  hours,
                  selectedAddress,
                  selectedDates: undefined,
                });
              }}
            />
          </div>
        )}
        {isHoursSearched && hours && (
          <div
            className={`border rounded-full py-2 px-3 sm:py-3 sm:px-5 gap-3  flex items-center bg-white`}
          >
            <Image
              src={"/icons/calendar-icon.svg"}
              alt={"icon"}
              width={20}
              height={20}
            />
            <div>{hours}</div>
            <Image
              src="/icons/close-icon-grey-background.svg"
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                setHours(undefined);
                setIsHoursSearched(false);
                onSearch({
                  selectedActivity,
                  hours: undefined,
                  selectedAddress,
                  selectedDates,
                });
              }}
            />
          </div>
        )}
        {isActivitySearched && selectedActivity && (
          <div
            className={`border rounded-full py-2 px-3 sm:py-3 sm:px-5 gap-3  flex items-center bg-white`}
          >
            {/* <Image
              src={"/icons/location-line-icon.svg"}
              alt={"icon"}
              width={20}
              height={20}
            /> */}
            <div className="capitalize">{selectedActivity.toLowerCase()}</div>
            <Image
              src="/icons/close-icon-grey-background.svg"
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                setSelectedActivity("");
                setIsActivitySearched(false);
                onSearch({
                  selectedActivity: "",
                  hours,
                  selectedAddress,
                  selectedDates,
                });
              }}
            />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <div className="sm:block hidden">
          <Button
            icon={"/icons/filter-icon-2.svg"}
            text={"Filters"}
            type="white"
            className="border rounded-full"
            roundedfull
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        {showMapBtn && (
          <div className="sm:block hidden">
            <Button
              icon={
                mapVisible
                  ? "/icons/white-filter-icon.svg"
                  : "/icons/white-showmap-icon.svg"
              }
              text={mapVisible ? "Show List" : "Show Map"}
              type="gray"
              roundedfull
              onClick={handleShowMap}
            />
          </div>
        )}
      </div>
      <CustomDialog open={isModalOpen} onClose={setIsModalOpen}>
        <PlaceModal
          place={place}
          setPlace={setPlace}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onSubmitHandler}
          isLoading={false}
          priceRange={true}
        />
      </CustomDialog>
    </div>
  );
}

export default HomeFilters;
