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
import Image from "next/image";
import React, { useState } from "react";
export default function PlaceModal() {
  interface CardProps {
    imageUrl: string;
    title: string;
    ratings: string;
    distance: string;
    hrlyRate: string;
    reviews: string;
  }

  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] =
    useState<string>("Home Setup");

  const [properties, setProperties] = useState<CardProps[]>([
    {
      imageUrl: "/images/dummyImage-1.png",
      title: "Cabin in Peshastin",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
    {
      imageUrl: "/images/dummyImage-2.png",
      title: "Property 1",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
    {
      imageUrl: "/images/dummyImage-3.png",
      title: "Cabin in Peshastin",
      ratings: "5.0",
      distance: "37 miles away",
      hrlyRate: "$12 /h",
      reviews: "1k+",
    },
  ]);
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const HomeSetup = () => {
    return (
      <div>
        <div className="px-4 space-y-2">
          <label>Type of space</label>
          <Tabs
            options={["Entire Home", "Private Room"]}
            selected={"Entire Home"}
          />
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Rooms and beds</div>
          <div>Bedrooms</div>
          <Tabs
            options={["0", "1", "2", "3", "4", "5", "6", "7", "8+"]}
            selected="1"
          />
          <div>Beds</div>
          <Tabs
            options={["0", "1", "2", "3", "4", "5", "6", "7", "8+"]}
            selected="1"
          />{" "}
          <div>Bathrooms</div>
          <Tabs
            options={["0", "1", "2", "3", "4", "5", "6", "7", "8+"]}
            selected="1"
          />{" "}
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <label>Property type</label>
          <div className="flex gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <>
                {index == 0
                  ? propertyTypeOptions("/icons/home-filled-icon.svg", "House")
                  : index == 1
                  ? propertyTypeOptions("/icons/building-icon.svg", "Apartment")
                  : index == 2
                  ? propertyTypeOptions(
                      "/icons/guest-house-icon.svg",
                      "Guesthouse"
                    )
                  : index == 3 &&
                    propertyTypeOptions("/icons/hotel-icon.svg", "Hotel")}
              </>
            ))}
          </div>
          <Accord type="single" collapsible>
            <AccordionItem className="border-none" value="item-1">
              <AccordionTrigger className="font-normal text-sm">
                Other property types
              </AccordionTrigger>
              <AccordionContent className="flex gap-3 flex-wrap">
                {Array.from({ length: 8 }, (_, index) => (
                  <>
                    {index == 0
                      ? propertyTypeOptions(
                          "/icons/home-filled-icon.svg",
                          "Barn"
                        )
                      : index == 1
                      ? propertyTypeOptions("/icons/building-icon.svg", "Boat")
                      : index == 2
                      ? propertyTypeOptions(
                          "/icons/guest-house-icon.svg",
                          "Camper"
                        )
                      : index == 3
                      ? propertyTypeOptions("/icons/hotel-icon.svg", "Castle")
                      : index == 4
                      ? propertyTypeOptions("/icons/hotel-icon.svg", "Cave")
                      : index == 5
                      ? propertyTypeOptions(
                          "/icons/hotel-icon.svg",
                          "Container"
                        )
                      : index == 6
                      ? propertyTypeOptions("/icons/hotel-icon.svg", "Farm")
                      : index == 7 &&
                        propertyTypeOptions("/icons/hotel-icon.svg", "Tent")}
                  </>
                ))}
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
          <Tabs
            options={[
              "All",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            selected="All"
          />
          <div>Days</div>
          <Tabs
            options={["All", "Only Working Days", "Only Weekends"]}
            selected="All"
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
    options: string[];
    selected: string;
    onSelect?: (option: string) => void;
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
                item === selected ? "bg-white" : ""
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const propertyTypeOptions = (imageUrl: string, text: string) => {
    return (
      <div className="space-y-3 border border-gray-300 px-4 py-3 rounded-lg w-[23%]">
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
          options={["Home Setup", "Gallery & Location", "Availability"]}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>
      <hr className="my-8" />

      {selectedTab === "Home Setup" ? (
        <HomeSetup />
      ) : selectedTab === "Gallery & Location" ? (
        <GallaryAndLocation />
      ) : (
        selectedTab === "Availability" && <Availability />
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
