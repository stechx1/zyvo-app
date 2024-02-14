import Image from "next/image";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { getGooglePlaces } from "@/lib/actions";
import { Address, CoordinatesType } from "@/types/place";
import { ActivitiesArray, debounce } from "@/lib/utils";
import { useFilterContext } from "@/context/FilterContext";
import { Tabs } from "@/components/Tabs";
import { Calendar } from "@/components/ui/calendar";
import { differenceInCalendarDays } from "date-fns";
import CircularSlider from "@fseehawer/react-circular-slider";
export const FilterSearch = () => {
  const {
    isFlexible,
    selectedActivity,
    hours,
    selectedAddress,
    selectedDates,
    query,
    setHours,
    setIsFlexible,
    setSelectedActivity,
    setSelectedDates,
    setSelectedAddress,
    setQuery,
    onSearch,
  } = useFilterContext();

  const [addresses, setAddresses] = useState<Address[]>([]);

  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    async function getAddresses() {
      const results = await getGooglePlaces(query);
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

  return (
    <div className="flex items-center">
      <div className="border border-gray-200 rounded-full flex justify-between items-center py-[4px] md:px-5 pl-5 pr-1 space-x-3 md:w-[450px] w-full">
        <div className="border-gray-200 w-40 px-2 cursor-pointer">
          <PlacesDropdown
            addresses={addresses}
            query={query}
            selectedAddress={selectedAddress}
            setQuery={setQuery}
            setSelectedAddress={setSelectedAddress}
          />
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <TimeDropdown
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            hours={hours}
            setHours={setHours}
            isFlexible={isFlexible}
            setIsFlexible={setIsFlexible}
          />
        </div>
        <div className="border-l border-gray-200 w-40 px-2 cursor-pointer">
          <ActivityDropdown
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
          />
        </div>
        <Image
          onClick={() =>
            onSearch({
              selectedActivity,
              hours,
              selectedAddress,
              selectedDates,
            })
          }
          src={"/icons/filter-search-icon.svg"}
          className="cursor-pointer"
          alt="search-icon"
          width={35}
          height={35}
          title="Search"
        />
        {/* {isSearched && (
          <Image
            onClick={onClearSearch}
            src={"/icons/close-icon-grey-background.svg"}
            className="cursor-pointer"
            alt="search-icon"
            width={35}
            height={35}
            title="Clear Search"
          />
        )} */}
      </div>
    </div>
  );
};
const PlacesDropdown = ({
  query,
  selectedAddress,
  setSelectedAddress,
  setQuery,
  addresses,
}: {
  query: string;
  setQuery: (query: string) => void;
  selectedAddress?: Address;
  setSelectedAddress: (address: Address) => void;
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
          className={`outline-none w-full text-ellipsis placeholder:text-black ${
            selectedAddress ? "text-black" : "text-gray-500"
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
                  setSelectedAddress(address);
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
        className="whitespace-nowrap text-black"
        onClick={() => setIsActivityDropdownOpen(true)}
      >
        {selectedActivity ? selectedActivity : <span>Activity</span>}
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
  isFlexible,
  setIsFlexible,
}: {
  selectedDates?: Date[];
  hours?: number;
  setSelectedDates: Dispatch<SetStateAction<Date[] | undefined>>;
  setHours: Dispatch<SetStateAction<number | undefined>>;
  isFlexible: boolean;
  setIsFlexible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  function disabledDays(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }
  return (
    <>
      <span
        className="whitespace-nowrap text-black"
        onClick={() => setIsTimeDropdownOpen(true)}
      >
        {selectedDates && selectedDates.length > 0 ? (
          selectedDates.length +
          ` Date${selectedDates.length > 1 ? "s" : ""} Selected`
        ) : hours ? (
          hours + " Hours"
        ) : isFlexible ? (
          "Flexible"
        ) : (
          <span>Time</span>
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
              if (option.value == 1) {
                setHours(undefined);
                setIsFlexible(false);
              }
              if (option.value == 2) {
                setSelectedDates(undefined);
                setHours(2);
                setIsFlexible(false);
              }
              if (option.value == 3) {
                setHours(undefined);
                setIsFlexible(true);
              }
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
                dataIndex={hours ? hours - 1 : 0}
                onChange={(value: number) => {
                  setHours(value);
                }}
              />
            </div>
          )}
          {selectedTab === 3 && (
            <div className="my-4 align-middle text-center">Flexible Hours</div>
          )}
        </div>
      </CustomDropdown>
    </>
  );
};
