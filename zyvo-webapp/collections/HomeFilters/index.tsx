import Button from "@/components/Button";
import { useFilterContext } from "@/context/FilterContext";
import { getDatesText } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface Props {
  handleShowMap: () => void;
  mapVisible: boolean;
  showMapBtn: boolean;
}

function HomeFilters(props: Props) {
  const { handleShowMap, mapVisible, showMapBtn } = props;
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
  );
}

export default HomeFilters;
