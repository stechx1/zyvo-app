import Button from "@/components/Button";
import { CustomToggleBtn } from "@/components/CustomToggle";
import Input from "@/components/Input";
import CustomSelect from "@/components/SelectDropDown";
import {
  Accordion as Accord,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Place } from "@/types/place";
import Image from "next/image";
import React, { useState } from "react";
export default function PlaceModal() {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [place, setPlace] = useState<Place>({
    addOns: [{ name: "test", price: 20 }],
    allowPets: false,
    ameneties: ["WIFI", "WASHER", "HEATING", "DRYER"],
    availableMonths: [1, 2, 3],
    availableDays: [1, 2, 3, 4, 5, 6, 7],
    availableHoursFrom: 1,
    availableHoursTo: 24,
    bathrooms: 2,
    bedrooms: 2,
    beds: 2,
    city: "Washington",
    coordinates: [1.9447, 2.4533],
    country: "United States",
    description: "This is desc of Place",
    discountedMinHours: 2,
    discountPercentage: 30,
    hostRules: "this is a list of host rules",
    images: ["url"],
    instantBook: true,
    minHours: 2,
    parkingRules: "This is a list of parking rules",
    pricePerHour: 11,
    propertyType: "APARTMENT",
    selfCheckIn: true,
    spaceType: "HOME",
    state: "US",
    street: "street 3",
    zipCode: "1233",
  });

  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const HomeSetup = () => {
    return (
      <div>
        <div className="px-4 space-y-2">
          <label>Type of space</label>
          <Tabs
            options={[
              { name: "Entire Home", value: "HOME" },
              { name: "Private Room", value: "ROOM" },
            ]}
            selected={place.spaceType}
          />
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Rooms and beds</div>
          <div>Bedrooms</div>
          <Tabs
            options={[
              { name: "0", value: 0 },
              { name: "1", value: 1 },
              { name: "2", value: 2 },
              { name: "3", value: 3 },
              { name: "4", value: 4 },
              { name: "5", value: 5 },
              { name: "6", value: 6 },
              { name: "7", value: 7 },
              { name: "8", value: 8 },
              { name: "8+", value: 9 },
            ]}
            selected={place.bedrooms}
            onSelect={(option) =>
              setPlace((prev) => {
                return { ...prev, bedrooms: +option.value };
              })
            }
          />
          <div>Beds</div>
          <Tabs
            options={[
              { name: "0", value: 0 },
              { name: "1", value: 1 },
              { name: "2", value: 2 },
              { name: "3", value: 3 },
              { name: "4", value: 4 },
              { name: "5", value: 5 },
              { name: "6", value: 6 },
              { name: "7", value: 7 },
              { name: "8", value: 8 },
              { name: "8+", value: 9 },
            ]}
            selected={place.beds}
            onSelect={(option) =>
              setPlace((prev) => {
                return { ...prev, beds: +option.value };
              })
            }
          />
          <div>Bathrooms</div>
          <Tabs
            options={[
              { name: "0", value: 0 },
              { name: "1", value: 1 },
              { name: "2", value: 2 },
              { name: "3", value: 3 },
              { name: "4", value: 4 },
              { name: "5", value: 5 },
              { name: "6", value: 6 },
              { name: "7", value: 7 },
              { name: "8", value: 8 },
              { name: "8+", value: 9 },
            ]}
            selected={place.bathrooms}
            onSelect={(option) =>
              setPlace((prev) => {
                return { ...prev, bathrooms: +option.value };
              })
            }
          />
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <label>Property type</label>
          <div className="flex gap-3">
            <PropertyType
              imageUrl="/icons/home-filled-icon.svg"
              text="House"
              value="HOUSE"
              selected={place.propertyType}
              onSelect={(value) =>
                setPlace((prev) => {
                  return { ...prev, propertyType: value.toString() };
                })
              }
            />
            <PropertyType
              imageUrl="/icons/building-icon.svg"
              text="Apartment"
              value="APARTMENT"
              selected={place.propertyType}
              onSelect={(value) =>
                setPlace((prev) => {
                  return { ...prev, propertyType: value.toString() };
                })
              }
            />
            <PropertyType
              imageUrl="/icons/guest-house-icon.svg"
              text="Guesthouse"
              value="GUESTHOUSE"
              selected={place.propertyType}
              onSelect={(value) =>
                setPlace((prev) => {
                  return { ...prev, propertyType: value.toString() };
                })
              }
            />
            <PropertyType
              imageUrl="/icons/hotel-icon.svg"
              text="Hotel"
              value="HOTEL"
              selected={place.propertyType}
              onSelect={(value) =>
                setPlace((prev) => {
                  return { ...prev, propertyType: value.toString() };
                })
              }
            />
          </div>
          <Accord type="single" collapsible>
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="font-normal text-sm">
                Other property types
              </AccordionTrigger>
              <AccordionContent className="flex gap-3 flex-wrap">
                <PropertyType
                  imageUrl="/icons/home-filled-icon.svg"
                  text="Barn"
                  value="BARN"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/building-icon.svg"
                  text="Boat"
                  value="BOAT"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/guest-house-icon.svg"
                  text="Camper"
                  value="CAMPER"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/hotel-icon.svg"
                  text="Castle"
                  value="CASTLE"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/hotel-icon.svg"
                  text="Cave"
                  value="CAVE"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/hotel-icon.svg"
                  text="Container"
                  value="CONTAINER"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/hotel-icon.svg"
                  text="Farm"
                  value="FARM"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
                <PropertyType
                  imageUrl="/icons/hotel-icon.svg"
                  text="Tent"
                  value="TENT"
                  selected={place.propertyType}
                  onSelect={(value) =>
                    setPlace((prev) => {
                      return { ...prev, propertyType: value.toString() };
                    })
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accord>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Amenities</div>
          <div className="flex gap-2 flex-wrap">
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Wifi</label>
            </div>
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Kitchen</label>
            </div>
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Washer</label>
            </div>
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Dryer</label>
            </div>
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Air Conditioning</label>
            </div>
            <div className="w-[47%] space-x-1.5">
              <input type="radio" />
              <label>Heating</label>
            </div>
          </div>
          <div>
            <u>Show more</u>
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Booking</div>
          <div className="flex justify-between items-center">
            <div>
              <div>Instant Book</div>
              <div>Users can book without waiting for host approval</div>
            </div>
            <CustomToggleBtn
              isToggled={isToggled}
              handleToggle={handleToggle}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>Self check-in</div>
              <div>Easy access to the property once you arrive</div>
            </div>
            <CustomToggleBtn
              isToggled={isToggled}
              handleToggle={handleToggle}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div>Allows pets</div>
              <div>
                <u>Allow bring animals?</u>
              </div>
            </div>
            <CustomToggleBtn
              isToggled={isToggled}
              handleToggle={handleToggle}
            />
          </div>
        </div>
      </div>
    );
  };

  const GallaryAndLocation = () => {
    return (
      <div>
        <div className="px-4 space-y-3">
          <div>Gallery</div>
          <div className="flex gap-2">
            <div className="basis-1/3 text-center">
              <Image
                src={"/images/dummyImage-2.png"}
                alt="image"
                width={200}
                height={200}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
            <div className="basis-1/3 border-2 border-dashed justify-center flex items-center border-gray-200">
              <Image
                src={"/icons/gray-skeleton-img-icon.svg"}
                alt="image"
                width={30}
                height={30}
              />
            </div>
            <div className="basis-1/3 border-2 border-dashed justify-center flex items-center border-gray-200">
              <Image
                src={"/icons/gray-skeleton-img-icon.svg"}
                alt="image"
                width={30}
                height={30}
              />
            </div>
            <div className="basis-1/3 border-2 border-dashed justify-center flex items-center border-gray-200">
              <Image
                src={"/icons/gray-skeleton-img-icon.svg"}
                alt="image"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>About the Space</div>
          <div>
            <textarea
              rows={4}
              placeholder="Description"
              className="px-2 focus:outline-none focus:border-gray-500 focus:border-1 rounded-lg py-1 text-black w-full border"
            />
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Parking Rules</div>
          <div>
            <textarea
              rows={4}
              placeholder="(Optional)"
              className="px-2 focus:outline-none focus:border-gray-500 rounded-lg py-1 text-black w-full border"
            />
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Host Rules</div>
          <div>
            <textarea
              rows={4}
              placeholder="(Optional)"
              className="px-2 focus:outline-none focus:border-gray-500 rounded-lg py-1 text-black w-full border"
            />
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Address</div>
          <Input type="text" placeholder="Street" />
          <Input type="text" placeholder="City" />
          <div className="flex gap-3">
            <Input type="text" placeholder="Zipcode" />
            <Input type="text" placeholder="Country" />
            <Input type="text" placeholder="State" />
          </div>
          <Image
            src={"/images/mapImage.png"}
            alt="favourite-icon"
            width={200}
            height={200}
            className="object-contain w-full h-full rounded-l-xl"
          />
        </div>
      </div>
    );
  };

  const Availability = () => {
    return (
      <div>
        <div className="px-4 space-y-3">
          <div>Minimum hour & Pricing</div>
          <div className="flex justify-between gap-4">
            <CustomSelect
              options={[
                { label: "1 hour minimum", value: "1 hour minimum" },
                { label: "2 hour minimum", value: "2 hour minimum" },
                { label: "3 hour minimum", value: "3 hour minimum" },
              ]}
              roundedFull
            />
            <div className="border w-[100%] rounded-full px-3 py-2">
              $10 per hour
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Bulk discount</div>
          <div className="flex justify-between gap-4">
            <CustomSelect
              options={[
                { label: "4 hours", value: "4 hours" },
                { label: "5 hours", value: "5 hours" },
              ]}
              roundedFull
            />
            <CustomSelect
              options={[
                { label: "15% Discount", value: "15% Discount" },
                { label: "16% Discount", value: "16% Discount" },
              ]}
              roundedFull
            />
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Add-ons from the host</div>
          <div className="flex gap-2">
            <div className="border w-[30%] rounded-full px-3 py-2">
              Bed Sheets $10
            </div>
            <div className="border w-[27%] rounded-full px-3 py-2">
              Add New{" "}
              <span className="bg-secondary-green rounded-full px-1.5 text-lg">
                +
              </span>
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Availability - Days</div>
          <div>Months</div>
          <MultiTabs
            options={[
              { name: "All", value: 0 },
              { name: "Jan", value: 1 },
              { name: "Feb", value: 2 },
              { name: "Mar", value: 3 },
              { name: "Apr", value: 4 },
              { name: "May", value: 5 },
              { name: "Jun", value: 6 },
              { name: "Jul", value: 7 },
              { name: "Aug", value: 8 },
              { name: "Sep", value: 9 },
              { name: "Oct", value: 10 },
              { name: "Nov", value: 11 },
              { name: "Dec", value: 12 },
            ]}
            selected={place.availableMonths}
          />
          <div>Days</div>
          <Tabs
            options={[
              { name: "All", value: 0 },
              { name: "Only Working Days", value: 1 },
              { name: "Only Weekends", value: 3 },
            ]}
            selected={
              JSON.stringify(place.availableDays) ===
              JSON.stringify([1, 2, 3, 4, 5, 6, 7])
                ? 0
                : JSON.stringify(place.availableDays) ===
                  JSON.stringify([1, 2, 3, 4, 5])
                ? 1
                : JSON.stringify(place.availableDays) === JSON.stringify([6, 7])
                ? 3
                : 0
            }
          />
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Availability - Hours</div>
          <div className="flex gap-3">
            <div className="w-full">
              <label>From</label>
              <CustomSelect
                options={[
                  { label: "12:00 Pm", value: "12:00 Pm" },
                  { label: "1:00 pm", value: "1:00 pm" },
                ]}
                roundedFull
              />
            </div>
            <div className="w-full">
              <label>To</label>
              <CustomSelect
                options={[
                  { label: "12:00 Pm", value: "12:00 Pm" },
                  { label: "1:00 pm", value: "1:00 pm" },
                ]}
                roundedFull
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Tabs = ({
    options,
    selected,
    onSelect,
  }: {
    options: { name: string; value: number | string }[];
    selected: string | number;
    onSelect?: (option: { name: string; value: number | string }) => void;
  }) => {
    return (
      <div className="flex justify-between text-center bg-gray-200 px-2 py-2 rounded-full">
        {options.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                onSelect && onSelect(item);
              }}
              className={`w-[45%] py-1 rounded-full ${
                item.value === selected
                  ? "bg-white pointer-events-none"
                  : "cursor-pointer"
              }`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };
  const MultiTabs = ({
    options,
    selected,
    onSelect,
  }: {
    options: { name: string; value: number | string }[];
    selected: string[] | number[];
    onSelect?: (option: { name: string; value: number | string }) => void;
  }) => {
    return (
      <div className="flex justify-between text-center bg-gray-200 px-2 py-2 rounded-full">
        {options.map((item, i) => {
          return (
            <div
              key={i}
              role="button"
              onClick={() => {
                onSelect && onSelect(item);
              }}
              className={`w-[45%] py-1 rounded-full ${
                selected.find((d) => d === item.value) ? "bg-white" : ""
              }`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  };

  const PropertyType = ({
    imageUrl,
    text,
    value,
    selected,
    onSelect,
  }: {
    imageUrl: string;
    text: string;
    value: string | number;
    selected?: string | number;
    onSelect?: (value: string | number) => void;
  }) => {
    return (
      <div
        className={`space-y-3 border border-gray-300 px-4 py-3 rounded-lg w-[23%] ${
          selected === value
            ? "bg-gray-100 pointer-events-none"
            : "cursor-pointer"
        }`}
        onClick={() => onSelect && onSelect(value)}
      >
        <div className="h-6">
          <img src={imageUrl} height={20} width={20} />
        </div>
        <div>{text}</div>
      </div>
    );
  };

  return (
    <div
      className="flex-column w-full overflow-auto"
      style={{ height: "40rem" }}
    >
      <div className="px-4 space-y-3">
        <div>Manage your place</div>
        <span>Setup places, availability, prices and more.</span>
        <Tabs
          options={[
            { name: "Home Setup", value: 1 },
            { name: "Gallery & Location", value: 2 },
            { name: "Availability", value: 3 },
          ]}
          selected={selectedTab}
          onSelect={(option) => setSelectedTab(+option.value)}
        />
      </div>
      <hr className="my-8" />

      {selectedTab === 1 ? (
        <HomeSetup />
      ) : selectedTab === 2 ? (
        <GallaryAndLocation />
      ) : (
        selectedTab === 3 && <Availability />
      )}

      <hr className="my-8" />
      <div className="flex justify-between px-4">
        <Button
          text="Cancel"
          onClick={() => {}}
          bordered
          roundedfull
          type="white"
        />
        <Button text="Save & Continue" roundedfull type="green" />
      </div>
    </div>
  );
}
