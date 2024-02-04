import Image from "next/image";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import { useEffect, useRef, useState } from "react";
import { getGooglePlaces } from "@/lib/actions";
import { CoordinatesType } from "@/types/place";
import { ActivitiesArray, ActivitiesArrayType, debounce } from "@/lib/utils";
import {
  getAllPlaces,
  getPlacesByLocation_Time_Activity,
} from "@/firebase/place";
import { useCommonContext } from "@/context/CommonContext";
type Address = { name: string; coordinates: CoordinatesType };
export const FilterSearch = () => {
  const { setPlaces } = useCommonContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [query, setQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedCoords, setSelectedCoords] = useState<CoordinatesType>();
  const [isPlacesDropdownOpen, setIsPlacesDropdownOpen] = useState(false);
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    async function getAddresses() {
      const results = await getGooglePlaces(query);
      console.log(results);
      
      if (results.length > 0) {
        setSelectedCoords(results[0].geometry.location);
      } else {
        setSelectedCoords(undefined);
      }
      setAddresses(
        results.map(
          (result: {
            formatted_address: string;
            geometry: { location: CoordinatesType };
            name: string;
          }) => {
            return {
              name: result.name,
              coordinates: result.geometry.location,
            };
          }
        )
      );
    }
    timer.current = debounce(
      () => {
        if (query) getAddresses();
      },
      500,
      timer.current
    )();
  }, [query]);

  const onSearch = () => {
    setIsSearched(true);
    getPlacesByLocation_Time_Activity({
      activity: ActivitiesArray[selectedActivity as keyof ActivitiesArrayType],
      coordinates: selectedCoords,
      time: "",
    }).then(({ result, error }) => {
      if (result) setPlaces(result);
      if (error) console.log(error);
    });
  };
  const onClearSearch = () => {
    setIsSearched(false);
    setSelectedActivity("");
    setSelectedCoords(undefined);
    setQuery("");
    getAllPlaces(
      (places) => {
        setPlaces(places);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  return (
    <div className="flex items-center">
      <div className="border border-gray-200 rounded-full flex justify-between items-center py-[4px] md:px-5 pl-5 pr-1 space-x-3 md:w-[398px] w-full">
        <div className="border-gray-200 w-40 px-2 cursor-pointer">
          <CustomDropdown
            isOpen={isPlacesDropdownOpen}
            setIsOpen={setIsPlacesDropdownOpen}
            parent={
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Place"
                className={`outline-none w-full text-ellipsis placeholder:text-gray-500 ${
                  selectedCoords ? "text-inherit" : "text-gray-500"
                } focus:text-gray-500`}
                onFocus={() => setIsPlacesDropdownOpen(true)}
              />
            }
          >
            {addresses.length > 0 && (
              <div className="w-80 m-2">
                {addresses.map((address, i) => {
                  return (
                    <div
                      key={i}
                      className="flex mb-4 hover:bg-secondary-gray-100 rounded-xl"
                      onClick={() => {
                        setQuery(address.name);
                        setSelectedCoords(address.coordinates);
                        setIsPlacesDropdownOpen(false);
                      }}
                    >
                      <div className="rounded-xl bg-secondary-neutral-200 p-2 flex items-center w-11 h-11 justify-center mr-3 ">
                        <Image
                          src={"/icons/location-line-icon.svg"}
                          alt="location-icon"
                          width={22}
                          height={22}
                        />
                      </div>

                      <div className=" flex items-center">
                        <p className="text-sm">{`${address.name}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CustomDropdown>
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <span className="whitespace-nowrap text-gray-500">{"Time"}</span>
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <span
            className="whitespace-nowrap"
            onClick={() => setIsActivityDropdownOpen(true)}
          >
            {selectedActivity ? (
              selectedActivity
            ) : (
              <span className="text-gray-500">Activity</span>
            )}
          </span>
          <CustomDropdown
            isOpen={isActivityDropdownOpen}
            setIsOpen={setIsActivityDropdownOpen}
          >
            <div className="h-80 overflow-auto m-4 mr-1 rounded-xl">
              {Object.keys(ActivitiesArray).map((event, i) => {
                return (
                  <div
                    key={i}
                    className="my-2 mr-4 px-2 py-1 rounded-sm hover:bg-slate-100"
                    onClick={() => {
                      setSelectedActivity(event);
                      setIsActivityDropdownOpen(false);
                    }}
                  >
                    {event}
                  </div>
                );
              })}
            </div>
          </CustomDropdown>
        </div>
        <Image
          onClick={onSearch}
          src={"/icons/filter-search-icon.svg"}
          className="cursor-pointer"
          alt="search-icon"
          width={35}
          height={35}
          title="Search"
        />
        {isSearched && (
          <Image
            onClick={onClearSearch}
            src={"/icons/close-icon-grey-background.svg"}
            className="cursor-pointer"
            alt="search-icon"
            width={35}
            height={35}
            title="Clear Search"
          />
        )}
      </div>
    </div>
  );
};
