import Image from "next/image";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getGooglePlaces } from "@/lib/actions";
import { CoordinatesType } from "@/types/place";
import { ActivitiesArray, ActivitiesArrayType, debounce } from "@/lib/utils";
import {
  getAllPlaces,
  getPlacesByLocation_Time_Activity,
} from "@/firebase/place";
import { useCommonContext } from "@/context/CommonContext";
import { Tabs } from "@/components/Tabs";
import { Calendar } from "@/components/ui/calendar";
import { differenceInCalendarDays } from "date-fns";
import CircularSlider from "@fseehawer/react-circular-slider";
type Address = { name: string; coordinates: CoordinatesType };
export const FilterSearch = () => {
  const { setPlaces } = useCommonContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [query, setQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>();
  const [selectedCoords, setSelectedCoords] = useState<CoordinatesType>();
  const [isSearched, setIsSearched] = useState(false);
  const [hours, setHours] = useState(2);

  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    async function getAddresses() {
      const results = await getGooglePlaces(query);
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
      dates: selectedDates,
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
    setSelectedDates([]);
    setHours(2);
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
      <div className="border border-gray-200 rounded-full flex justify-between items-center py-[4px] md:px-5 pl-5 pr-1 space-x-3 md:w-[450px] w-full">
        <div className="border-gray-200 w-40 px-2 cursor-pointer">
          <PlacesDropdown
            addresses={addresses}
            query={query}
            selectedCoords={selectedCoords}
            setQuery={setQuery}
            setSelectedCoords={setSelectedCoords}
          />
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <TimeDropdown
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            hours={hours}
            setHours={setHours}
          />
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <ActivityDropdown
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
          />
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
const PlacesDropdown = ({
  query,
  selectedCoords,
  setSelectedCoords,
  setQuery,
  addresses,
}: {
  query: string;
  setQuery: (query: string) => void;
  selectedCoords?: CoordinatesType;
  setSelectedCoords: (coords: CoordinatesType) => void;
  addresses: Address[];
}) => {
  const [isPlacesDropdownOpen, setIsPlacesDropdownOpen] = useState(false);

  return (
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
  );
};
const ActivityDropdown = ({
  selectedActivity,
  setSelectedActivity,
}: {
  selectedActivity: string;
  setSelectedActivity: (activity: string) => void;
}) => {
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);

  return (
    <>
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
    </>
  );
};
const TimeDropdown = ({
  selectedDates,
  setSelectedDates,
  hours,
  setHours,
}: {
  selectedDates?: Date[];
  hours: number;
  setSelectedDates: Dispatch<SetStateAction<Date[] | undefined>>;
  setHours: Dispatch<SetStateAction<number>>;
}) => {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  function disabledDays(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }
  return (
    <>
      <span
        className="whitespace-nowrap"
        onClick={() => setIsTimeDropdownOpen(true)}
      >
        {selectedDates && selectedDates.length > 0 ? (
          selectedDates.length +
          ` Date${selectedDates.length > 1 ? "s" : ""} Selected`
        ) : (
          <span className="text-gray-500">Time</span>
        )}
      </span>
      <CustomDropdown
        isOpen={isTimeDropdownOpen}
        setIsOpen={setIsTimeDropdownOpen}
      >
        <div className="w-80 p-2">
          <Tabs
            size="sm"
            options={[
              { name: "Dates", value: 1 },
              { name: "Hourly", value: 2 },
              { name: "Flexible", value: 3 },
            ]}
            selected={selectedTab}
            onSelect={(option) => {
              setSelectedTab(+option.value);
            }}
          />
          {selectedTab === 1 && (
            <div className="mb-4 align-middle">
              <Calendar
                mode="multiple"
                selected={selectedDates ?? []}
                onSelect={setSelectedDates}
                fixedWeeks
                disabled={disabledDays}
              />
            </div>
          )}
          {selectedTab === 2 && (
            <div className="my-4 align-middle text-center">
              <CircularSlider
                width={200}
                label="Hours"
                labelFontSize="20px"
                labelColor="#005a58"
                knobColor="#fff"
                knobSize={30}
                progressColorFrom="#4AEAB1"
                progressColorTo="#4AEAB1"
                progressSize={30}
                trackColor="#eeeeee"
                trackSize={30}
                data={[
                  2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20, 21, 22, 23, 24,
                ]}
                min={2}
                dataIndex={hours - 1}
                onChange={(value: number) => {
                  setHours(value);
                }}
              />
            </div>
          )}
        </div>
      </CustomDropdown>
    </>
  );
};
