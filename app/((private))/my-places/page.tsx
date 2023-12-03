"use client";
import Button from "@/components/Button";
import { CustomToggleBtn } from "@/components/CustomToggle";
import { CustomDialog } from "@/components/Dialog";
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

export default function MyPlaces() {
  interface CardProps {
    imageUrl: string;
    title: string;
    ratings: string;
    distance: string;
    hrlyRate: string;
    reviews: string;
  }

  interface modalDetails {
    spaces: string;
    bedrooms: number | string;
    beds: number | string;
  }

  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [modalContentState, setModalContentState] =
    useState<string>("Home Setup");
  const [modalDetails, setModalDetails] = useState<modalDetails>({
    spaces: "Entire Home",
    bedrooms: "0",
    beds: "0",
  });

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

  const handleSave = () => {
    setModalContentState("");
  };

  const modalBody = () => {
    return (
      <div
        className="flex-column w-full overflow-auto"
        style={{ height: "40rem" }}
      >
        <div className="px-4 space-y-3">
          <div>Manage your place</div>
          <span>Setup places, availability, prices and more.</span>
          {CustomSwitchButton(
            ["Home Setup", "Gallery & Location", "Availability"],
            true
          )}
        </div>
        <hr className="my-8" />

        {modalContentState === "Home Setup"
          ? modalBodyOne()
          : modalContentState === "Gallery & Location"
          ? modalBodyTwo()
          : modalContentState === "Availability" && modalBodyThird()}

        <hr className="my-8" />
        <div className="flex justify-between px-4">
          <Button
            text="Cancel"
            onClick={() => setModalContentState("Home Setup")}
            bordered
            roundedfull
            type="white"
          />
          <Button
            text="Save & Continue"
            roundedfull
            type="green"
          />
        </div>
      </div>
    );
  };

  const modalBodyOne = () => {
    return (
      <div>
        <div className="px-4 space-y-2">
          <label>Type of space</label>
          {CustomSwitchButton(["Entire Home", "Private Room"])}
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <div>Rooms and beds</div>
          <div>Bedrooms</div>
          {CustomSwitchButton(["0", "1", "2", "3", "4", "5", "6", "7", "8+"])}
          <div>Beds</div>
          {CustomSwitchButton(["0", "1", "2", "3", "4", "5", "6", "7", "8+"])}
          <div>Bathrooms</div>
          {CustomSwitchButton(["0", "1", "2", "3", "4", "5", "6", "7", "8+"])}
        </div>
        <hr className="my-8" />
        <div className="px-4 space-y-3">
          <label>Property type</label>
          <div className="flex gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <>
                {index == 0
                  ? propertyTypeOptions("/icons/home-icon.svg", "House")
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
                      ? propertyTypeOptions("/icons/home-icon.svg", "Barn")
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

  const modalBodyTwo = () => {
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

  const modalBodyThird = () => {
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
          {CustomSwitchButton([
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
          ])}
          <div>Days</div>
          {CustomSwitchButton(["All", "Only Working Days", "Only Weekends"])}
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

  const CustomSwitchButton = (options: string[], changeAble?: boolean) => {
    return (
      <div className="flex justify-between text-center bg-gray-200 px-2 py-2 rounded-full">
        {options.map((item) => {
          return (
            <div
              role="button"
              onClick={() => {
                changeAble && setModalContentState(item);
              }}
              className={`w-[45%] py-1 rounded-full ${
                item === modalContentState ||
                item === modalDetails?.spaces ||
                item === modalDetails.bedrooms ||
                item === modalDetails.beds
                  ? "bg-white"
                  : ""
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
        {properties.map((items, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] overflow-hidden"
          >
            <div className="relative">
              <img
                src={items.imageUrl}
                alt={"title"}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute top-0 right-0 p-4 text-white">
                <div
                  className="text-black border rounded-full bg-white px-1"
                  role="button"
                >
                  &#8226;&#8226;&#8226;
                </div>
              </div>
            </div>
            <div className="py-1 px-0.5">
              <div className="flex justify-between font-normal">
                {items.title}
                <div className="flex space-x-1">
                  <Image
                    width={15}
                    height={15}
                    alt="clock-icon"
                    src={"/icons/dark-gray-clock-icon.svg"}
                  />
                  <span>{items.hrlyRate}</span>
                </div>
              </div>
              <div className="flex text-gray-700 text-base text-[#A4A4A4]">
                <span className="text-[#FCA800] mr-1">{items.ratings}</span>
                <span>({items.reviews})</span>
                <Image
                  src={"/icons/path0.svg"}
                  alt="star-icon"
                  width={15}
                  height={15}
                  className="ml-2 mr-1"
                />
                <span>{items.distance}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="w-full justify-center flex items-center h-64 sm:w-[48%] md:w-[30%] lg:w-[23.85%] xl:w-[24%] relative rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-center my-50">
            <CustomDialog
              button={
                <Button text="+" type="gray" roundedfull className="text-xl" />
              }
              body={modalBody()}
            />
            <p className="text-sm mt-2">Add new Place</p>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="border-t-4 border-l-4 border-r-4 border-transparent rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
