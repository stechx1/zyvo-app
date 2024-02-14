"use client";
import React, { createContext, useContext, useState } from "react";
import { Address, CoordinatesType } from "@/types/place";
import BottomTabNav from "@/collections/Footer/bottomTabNav/bottomTabNav";
import { Navbar } from "@/collections/Navbar/Navbar";
import { usePathname } from "next/navigation";
import { Footer } from "@/collections/Footer/Footer";
import { useCommonContext } from "./CommonContext";
import {
  getAllPlaces,
  getPlacesByLocation_Time_Activity,
} from "@/firebase/place";
import { ActivitiesArray, ActivitiesArrayType } from "@/lib/utils";

const defaultValue: {
  selectedAddress?: Address;
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;
  selectedActivity: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedDates?: Date[];
  setSelectedDates: React.Dispatch<React.SetStateAction<Date[] | undefined>>;
  hours?: number;
  setHours: React.Dispatch<React.SetStateAction<number | undefined>>;
  isFlexible: boolean;
  setIsFlexible: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressSearched: boolean;
  setIsAddressSearched: React.Dispatch<React.SetStateAction<boolean>>;
  isDatesSearched: boolean;
  setIsDatesSearched: React.Dispatch<React.SetStateAction<boolean>>;
  isHoursSearched: boolean;
  setIsHoursSearched: React.Dispatch<React.SetStateAction<boolean>>;
  isActivitySearched: boolean;
  setIsActivitySearched: React.Dispatch<React.SetStateAction<boolean>>;
  onClearSearch: () => void;
  onSearch: (opt: {
    selectedActivity: string;
    selectedDates?: Date[] | undefined;
    hours?: number | undefined;
    selectedAddress?: Address | undefined;
  }) => void;
} = {
  setSelectedAddress: () => {},
  setHours: () => {},
  setSelectedDates: () => {},
  setSelectedActivity: () => {},
  setIsFlexible: () => {},
  setIsAddressSearched: () => {},
  setIsDatesSearched: () => {},
  setIsHoursSearched: () => {},
  setIsActivitySearched: () => {},
  setQuery: () => {},
  onSearch: () => {},
  selectedActivity: "",
  query: "",
  isFlexible: false,
  isActivitySearched: false,
  isAddressSearched: false,
  isDatesSearched: false,
  isHoursSearched: false,
  onClearSearch: () => {},
};
export const FilterContext = createContext(defaultValue);

export const useFilterContext = () => useContext(FilterContext);

export const FilterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>();
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const [hours, setHours] = useState<number>();
  const [isFlexible, setIsFlexible] = useState(false);
  const [query, setQuery] = useState("");
  const [isAddressSearched, setIsAddressSearched] = useState(false);
  const [isDatesSearched, setIsDatesSearched] = useState(false);
  const [isHoursSearched, setIsHoursSearched] = useState(false);
  const [isActivitySearched, setIsActivitySearched] = useState(false);

  const pathname = usePathname();
  const { user, setPlaces } = useCommonContext();
  const onClearSearch = () => {
    setIsAddressSearched(false);
    setIsDatesSearched(false);
    setIsHoursSearched(false);
    setIsActivitySearched(false);
    setSelectedActivity("");
    setSelectedAddress(undefined);
    setSelectedDates(undefined);
    setHours(undefined);
    getAllPlaces(
      (places) => {
        setPlaces(places);
      },
      (e) => {
        console.log(e);
      }
    );
  };
  const onSearch = ({
    selectedActivity,
    hours,
    selectedAddress,
    selectedDates,
  }: {
    selectedActivity: string;
    selectedDates?: Date[];
    hours?: number;
    selectedAddress?: Address;
  }) => {
    if (selectedActivity) setIsActivitySearched(true);
    if (selectedDates) setIsDatesSearched(true);
    if (hours) setIsHoursSearched(true);
    if (selectedAddress) setIsAddressSearched(true);
    if (
      !selectedActivity &&
      !selectedAddress &&
      (!selectedDates || selectedDates.length == 0) &&
      !hours
    )
      onClearSearch();
    else
      getPlacesByLocation_Time_Activity({
        activity:
          ActivitiesArray[selectedActivity as keyof ActivitiesArrayType],
        coordinates: selectedAddress?.coordinates,
        dates: selectedDates,
        hours,
      }).then(({ result, error }) => {
        if (result) setPlaces(result);
        if (error) console.log(error);
      });
  };
  return (
    <FilterContext.Provider
      value={{
        selectedAddress,
        isFlexible,
        selectedActivity,
        hours,
        selectedDates,
        isAddressSearched,
        isDatesSearched,
        isHoursSearched,
        isActivitySearched,
        query,
        setHours,
        setSelectedActivity,
        setSelectedAddress,
        setSelectedDates,
        setIsFlexible,
        setIsAddressSearched,
        setIsDatesSearched,
        setIsActivitySearched,
        setIsHoursSearched,
        onClearSearch,
        setQuery,
        onSearch,
      }}
    >
      <Navbar />
      {children}
      {pathname !== "/signup" && pathname !== "/signin" && user && (
        <BottomTabNav />
      )}
      {pathname !== "/messages" &&
        pathname !== "/signup" &&
        pathname !== "/signin" && (
          <div className="p-1">
            <Footer />
          </div>
        )}
    </FilterContext.Provider>
  );
};
