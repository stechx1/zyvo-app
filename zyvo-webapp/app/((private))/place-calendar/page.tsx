"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

const date = [
  { val: "10 - Mon" },
  { val: "11 - Tue" },
  { val: "12 - Wed" },
  { val: "13 - Thu" },
  { val: "14 - Fri" },
  { val: "15 - Sat" },
  { val: "16 - Sun" },
];

const time = [
  { val: "" },
  { val: "PM 01:00" },
  { val: "PM 02:00" },
  { val: "PM 03:00" },
  { val: "PM 04:00" },
  { val: "PM 05:00" },
  { val: "PM 06:00" },
];
const reminder = [
  {
    name: "Katelyn Francy",
    reminder: "Fineshid",
    val: "01:00 - 02:00",
  },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  {
    name: "Mia Williams",
    reminder: "Waiting payment",
    val: "03:00 - 04:00",
  },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  {
    name: "Emily James",
    reminder: "Confirmed",
    val: "05:00 - 06:00",
  },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
  { val: "" },
];

const PlaceCalendarPage = () => {
  return (
    <div className="flex flex-col my-8 sm:flex-row gap-5 sm:gap-7">
      <div className="sm:hidden flex items-center justify-between">
        <div className="sm:hidden border border-neutral-200 rounded-full p-2">
          <Image
            src="/icons/back-arrow-icon.svg"
            alt="back-arrow-icon"
            width={15}
            height={15}
          />
        </div>
        <div className="border border-neutral-200 rounded-full py-2 px-3 w-[200px] sm:w-[300px] flex items-center justify-between">
          <div className="flex flex-row gap-1 sm:gap-3">
            <Image
              src="/icons/gray-calendar-icon.svg"
              alt="gray-calendar-icon"
              width={30}
              height={30}
              className="sm:w-[30px] w-[20px]"
            />
            <div className="text-black text-[13px] sm:text-lg font-normal font-Poppins">
              Mar 11 - 17 2023 (EST)
            </div>
          </div>
          <div className="mr-0">
            <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
          </div>
        </div>
        <div className="border border-neutral-200 rounded-full py-2 px-3 gap-1 sm:gap-3 w-fit flex items-center justify-between">
          <Image
            src={"/icons/filter-icon.svg"}
            alt="filter-icon"
            width={20}
            height={20}
            className="sm:w-[20px] w-[15px]"
          />
          <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
            Filter
          </div>
        </div>
      </div>
      <div className="sm:hidden h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className="w-full xl:w-[22%] lg:w-[30%] md:w-[35%] flex flex-col gap-7 sm:gap-10 sm:order-2">
        <div className="w-full rounded-[18px] border border-secondary-neutral-200 p-2 sm:p-[1.15rem] flex flex-col gap-1 sm:gap-3 sm:order-1">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <Image
                src={"/images/dummyImage-1.png"}
                alt="detail-image"
                className="rounded-[18px] w-full h-[17rem] object-cover"
                width={50}
                height={50}
              />
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col pl-3 mt-2">
                <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
                  Cabin in Peshastin
                </div>
                <div className="flex text-lg flex-row gap-4">
                  <div className="flex space-x-1">
                    <p className="flex items-center text-base text-primary-amber-500 mr-0 font-Poppins">
                      <Image
                        src={"/icons/orange-star-icon.svg"}
                        alt="star-icon"
                        width={18}
                        height={18}
                        className="mr-1"
                      />
                      {"5.0"}
                    </p>
                    <p className="text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${1}k+)`}</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="flex items-center text-base text-black mr-0 font-Poppins">
                      <Image
                        src={"/icons/dark-gray-clock-icon.svg"}
                        alt="dark-gray-clock-icon"
                        width={18}
                        height={18}
                        className="mr-1"
                      />
                      {"$12 / h"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1 mt-1">
                  <Image
                    src={"/icons/gray-location-icon.svg"}
                    alt="location-icon"
                    width={20}
                    height={20}
                    className="mb-[-5px]"
                  />
                  <p className=" text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins whitespace-nowrap">{`37 miles away`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-2 h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
          <div className="flex flex-row justify-center sm:flex-col my-2 gap-2">
            <Button 
            text="Pause Bookings"
            type="gray"
            rounded
            className="text-xl h-11"
            />
            <Button
            text="Edit Place"
            type="white"
            rounded
            className="text-xl h-11 border border-gray-600"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 xl:w-[78%] overflow-auto pb-3 flex flex-col gap-7 sm:order-1">
        <div className="hidden sm:flex items-center justify-between">
          <div className="border border-neutral-200 rounded-full py-2 px-3 w-[200px] sm:w-[300px] flex items-center justify-between">
            <div className="flex flex-row gap-1 sm:gap-3">
              <Image
                src="/icons/gray-calendar-icon.svg"
                alt="gray-calendar-icon"
                width={30}
                height={30}
                className="sm:w-[30px] w-[20px]"
              />
              <div className="text-black text-[13px] sm:text-lg font-normal font-Poppins">
                Mar 11 - 17 2023 (EST)
              </div>
            </div>
            <div className="mr-0">
              <Image
                src={"/icons/down.svg"}
                alt="down"
                width={13}
                height={13}
              />
            </div>
          </div>
          <div className="border border-neutral-200 rounded-full py-2 px-3 gap-1 sm:gap-3 w-fit flex items-center justify-between">
            <Image
              src={"/icons/filter-icon.svg"}
              alt="filter-icon"
              width={20}
              height={20}
              className="sm:w-[20px] w-[15px]"
            />
            <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
              Filter
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="grid  text-black items-center gap-2">
            {time.map((data, key) => {
              return (
                <div
                  key={key}
                  className="text-[13px] text-[#373B63] py-[11px] font-Poppins bg-[#EFF2F5] px-2 font-semibold min-h-[54px] w-[60px] rounded-xl flex flex-col text-center items-center"
                >
                  <span>{data.val.split(" ")[0]}</span>
                  <span className="text-[11px]">{data.val.split(" ")[1]}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col w-full min-w-[30rem]">
            <div className="grid grid-cols-7 text-black gap-[0.35rem] w-full h-[60px]">
              {date.map((data, key) => {
                return (
                  <div
                    key={key}
                    className=" text-[14px] font-semibold text-[#373B63] bg-[#EFF2F5] min-w-[4rem] h-[92%] rounded-xl flex items-center justify-center"
                  >
                    {data.val}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-7 text-black gap-[0.45rem] w-full">
              {reminder.map((data, key) => {
                return (
                  <div
                    key={key}
                    className={`pl-2 font-Poppins border border-neutral-200 ${
                      data.name ? "border-l-[3px] border-l-[#4AEAB1]" : "border-x"
                    } h-[60px] rounded-xl flex justify-items-center justify-center flex-col overflow-hidden`}
                  >
                    <div className="text-[12px] font-bold ">{data.name}</div>
                    <div className=" text-[11px] text-[#4AEAB1]">
                      {data.reminder}
                    </div>
                    <div className="text-[11px]">{data.val}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCalendarPage;
