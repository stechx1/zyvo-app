"use client";
import Button from "@/components/Button";
import React, { useState } from "react";
import Image from "next/image";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";

export default function Bookings() {
  interface bookings {
    title: string;
    date: string;
    status: string;
    image: string;
    property: Property[];
  }

  interface Property {
    parking?: boolean;
    wifi?: boolean;
    rooms?: "1 room" | "2 rooms" | "3 rooms";
    kitchen?: boolean;
    tables?: boolean;
    chairs?: boolean;
  }

  const [bookings, setBookings] = useState<bookings[]>([
    {
      title: "Cabin in Peshastin",
      date: "October 22, 2023",
      status: "Finished",
      image: "/images/dummyImage-1.png",
      property: [
        { parking: true },
        { wifi: true },
        { rooms: "2 rooms" },
        { kitchen: true },
        { tables: true },
        { chairs: true },
      ],
    },
    {
      title: "Cabin in Peshastin",
      date: "October 26, 2023",
      status: "Confirmed",
      image: "/images/dummyImage-2.png",
      property: [
        { parking: true },
        { wifi: true },
        { rooms: "2 rooms" },
        { kitchen: true },
        { tables: true },
        { chairs: true },
      ],
    },
    {
      title: "Cabin in Peshastin",
      date: "October 29, 2023",
      status: "Waiting payment",
      image: "/images/dummyImage-3.png",
      property: [
        { parking: true },
        { wifi: true },
        { rooms: "2 rooms" },
        { kitchen: true },
        { tables: true },
        { chairs: true },
      ],
    },
    {
      title: "Cabin in Peshastin",
      date: "October 30, 2023",
      status: "Canceled",
      image: "/images/dummyImage-4.png",
      property: [
        { parking: true },
        { wifi: true },
        { rooms: "2 rooms" },
        { kitchen: true },
        { tables: true },
        { chairs: true },
      ],
    },
    {
      title: "Cabin in Peshastin",
      date: "October 30, 2023",
      status: "Finished",
      image: "/images/dummyImage-5.png",
      property: [
        { parking: true },
        { wifi: true },
        { rooms: "2 rooms" },
        { kitchen: true },
        { tables: true },
        { chairs: true },
      ],
    },
  ]);

  function getStatusColor(status: string) {
    switch (status) {
      case "Finished":
        return "bg-[#4AEAB1]";
      case "Confirmed":
        return "bg-[#85d6ff]";
      case "Waiting payment":
        return "bg-[#fff178]";
      default:
        return "bg-stone-100";
    }
  }

  const rulesOptions = [
    { label: "Parking", value: "Parking" },
    { label: "Food", value: "Food" },
    { label: "System", value: "System" },
  ];

  const hotRulesOptions = [
    { label: "Host rules", value: "Host rules" },
    { label: "option b", value: "option b" },
  ];

  return (
    <div className="flex justify-between space-x-4">
      <div className="w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-lg">All Bookings</div>
            <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
          </div>
          <div className="me-1">
            <Image
              src={"/icons/search.svg"}
              alt="search"
              width={18}
              height={18}
            />
          </div>
        </div>
        {bookings.map((res) => {
          return (
            <div
              className="flex mt-4 border px-2 py-2 rounded-xl"
              role="button"
            >
              <Image
                src={res.image}
                alt="image"
                width={95}
                height={95}
                className="rounded-xl object-cover"
              />
              <div className="ml-4">
                <div className="text-lg">{res.title}</div>
                <div className="text-[#A4A4A4]">{res.date}</div>
                <span
                  className={`inline-block mt-0.5 text-black px-2.5 py-2 text-sm leading-none ${getStatusColor(
                    res.status
                  )} rounded-full`}
                >
                  {res.status}
                </span>
              </div>
              <div
                className="h-[30px] flex items-center justify-center ml-6"
                role="button"
              >
                <Image
                  src={"/icons/dots.svg"}
                  alt="dots"
                  width={4}
                  height={4}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/******Booking Details*******/}
      <div className="w-[100%] sm:w-[60%] lg:w-[50%] sm:flex flex-col border rounded-lg">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div>Cabin in Peshastin</div>
            <span className="bg-[#4AEAB1] text-black px-2 py-1 rounded-full text-sm">
              Finished
            </span>
          </div>
          <div className="flex items-center">
            <div>
              <div className="flex space-x-2 text-sm">
                <Image
                  src={"/icons/Share.svg"}
                  alt="share-icon"
                  width={17}
                  height={17}
                />
                <span>Share</span>
                <Image
                  src={"/icons/heart.png"}
                  alt="favourite-icon"
                  width={25.59}
                  height={25}
                />
                <span>Favorite</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-flow-col gap-2 px-4">
          {bookings.map((res, index) => {
            return (
              <div className={`${index === 0 ? "row-span-2 h-52" : ""}`}>
                <Image
                  src={res.image}
                  alt="favourite-icon"
                  width={100}
                  height={100}
                  className={`${
                    index === 0
                      ? "object-cover w-full h-full rounded-l-xl"
                      : "object-contain w-full h-full"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <hr className="my-9" />
        <div className="px-5">
          <label>Booking Details</label>
          <div className="flex items-center space-x-3 mt-2">
            <CustomDetailTag
              type="sm"
              text="October 22, 2023"
              icon={
                <Image
                  src={"/icons/calendarIcon.svg"}
                  alt="profile-pic"
                  width={18}
                  height={18}
                />
              }
            />
            <CustomDetailTag
              type="sm"
              text="2 Hours | From 01pm to 03pm"
              icon={
                <Image
                  src={"/icons/clock-icon.svg"}
                  alt="profile-pic"
                  width={18}
                  height={18}
                />
              }
            />
            <CustomDetailTag type="sm" text="30" icon={<div>$</div>} />
          </div>
        </div>
        <hr className="my-9" />
        <div className="px-5">
          <label>Included in your booking</label>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {bookings[0].property.map((res) => {
              return (
                <CustomDetailTag
                  type="lg"
                  text={
                    res.parking
                      ? "Parking"
                      : res.chairs
                      ? "Chairs"
                      : res.kitchen
                      ? "Kitchen"
                      : res.rooms
                      ? res.rooms
                      : res.tables
                      ? "Tables"
                      : res.wifi
                      ? "Wifi"
                      : ""
                  }
                  icon={
                    <Image
                      src={
                        res.parking
                          ? "/icons/gray-parking-icon.svg"
                          : res.chairs
                          ? "/icons/gray-chair-icon.svg"
                          : res.kitchen
                          ? "/icons/gray-kitchen-icon.svg"
                          : res.rooms
                          ? "/icons/gray-table-icon.svg"
                          : res.tables
                          ? "/icons/gray-table-icon.svg"
                          : res.wifi
                          ? "/icons/gray-wifi-icon.svg"
                          : "/icons/gray-wifi-icon.svg"
                      }
                      alt="profile-pic"
                      width={19}
                      height={19}
                    />
                  }
                />
              );
            })}
          </div>
        </div>
        <hr className="my-9" />
        <div className="px-5">
          <label>Rules</label>
          <div className="items-center space-y-3 mt-2">
            <CustomSelect
              icon={
                <Image
                  src={"/icons/gray-parking-icon.svg"}
                  alt="favourite-icon"
                  width={20}
                  height={20}
                />
              }
              options={rulesOptions}
            />
            <CustomSelect
              icon={
                <Image
                  src={"/icons/gray-warning-icon.svg"}
                  alt="favourite-icon"
                  width={20}
                  height={20}
                />
              }
              options={hotRulesOptions}
            />
          </div>
        </div>
        <hr className="my-9" />
        <div className="px-5">
          <label>Address & Location</label>
          <div>
            <u>Midtown Manhattan, New York, NY</u>
          </div>
          <div className="mt-3">
            <Image
              src={"/images/mapImage.png"}
              alt="favourite-icon"
              width={200}
              height={200}
              className="object-contain w-full h-full rounded-l-xl"
            />
          </div>
        </div>
        <hr className="my-9" />
        <div className="px-5">
          <label>Reviews</label>
          <div className="flex items-center justify-between mb-3">
            <div className="flex">
              <Image
                src={"/icons/starIcon.svg"}
                alt="star-icon"
                width={15}
                height={15}
              />
              <div className="ml-1">
                <span className="text-[#FCA800]">
                  4.9 <span className="text-black"> 30 reviews</span>
                </span>
              </div>
            </div>
            <div>Sort by: Recent Reviews</div>
          </div>
          {Array.from({ length: 4 }, (_, i) => (
            <>
              <div className="flex justify-between py-2">
                <div className="flex px-2 space-x-2">
                  <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                    <Image
                      src={"/icons/profile-icon.png"}
                      alt="profile-pic"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <label>Emily James</label>
                    <div>Host was very helpful. thank you so much</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Image
                        src={"/icons/starIcon.svg"}
                        alt="star-icon"
                        width={15}
                        height={15}
                      />
                    ))}
                  </div>
                  <div>Mar 09, 22</div>
                </div>
              </div>
              <hr className="my-3" />
            </>
          ))}
          <div className="text-center my-5">
            <Button
              roundedfull
              className="border-gray-700"
              bordered
              type="white"
              text="Show More Reviews"
            />
          </div>
        </div>
      </div>

      {/****** Right side details ******/}
      <div className="hidden lg:block lg:w-[25%] space-y-4">
        <div className="border rounded-2xl p-4 text-center space-y-2">
          <div>Hosted by</div>
          <div className="flex items-center justify-center space-x-1">
            <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
              <Image
                src={"/icons/profile-icon.png"}
                alt="profile-pic"
                width={35}
                height={35}
                className="rounded-full"
              />
            </div>
            <div className="text-lg">Mia J.</div>
            <Image
              src={"/icons/green-tick.svg"}
              alt="tick"
              width={20}
              height={20}
            />
          </div>
          <hr />
          <div>
            <Button
              type="gray"
              text="Review Booking"
              bordered
              rounded
              full
              className="border-gray-700 my-2"
            />
            <Button
              type="white"
              text="Message the host"
              bordered
              rounded
              full
              className="border-gray-700"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={"/icons/information-button.png"}
              alt="info"
              width={23}
              height={23}
            />
            <div className="ml-0.5">I need help</div>
          </div>
        </div>
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex">
            <Image
              src={"/images/dummyImage-1.png"}
              alt="image"
              width={95}
              height={95}
              className="rounded-xl object-cover"
            />
            <div className="ml-4">
              <div className="text-xl">Cabin in Peshastin</div>
              <div className="flex">
                <Image
                  src={"/icons/starIcon.svg"}
                  alt="star-icon"
                  width={15}
                  height={15}
                />
                <div className="ml-1">
                  <span className="text-[#FCA800]">
                    5,0 <span className="text-[#A4A4A4]"> (1k+)</span>
                  </span>
                </div>
              </div>
              <div className="flex mt-1">
                <Image
                  src={"/icons/path0.svg"}
                  alt="star-icon"
                  width={15}
                  height={15}
                />
                <div className="ml-1 text-[#A4A4A4] text-sm">
                  <span>37 miles away</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between items-center">
            <div>2 Hours</div>
            <div>$300</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Zyvo Service Fee</div>
            <div>$2</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Cleaning Fee</div>
            <div>$20</div>
          </div>
          <div className="flex justify-between items-center">
            <div>Taxes</div>
            <div>$10</div>
          </div>
          <hr />
          <div className="flex justify-between items-center text-xl">
            <div>Total</div>
            <div>$322</div>
          </div>
        </div>
      </div>
    </div>
  );
}
