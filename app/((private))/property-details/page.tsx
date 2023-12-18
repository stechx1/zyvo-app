"use client";
import React from "react";
import Image from "next/image";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";

const PropertyDetailsPage = () => {
  const bookingSpecifications = [
    {
      icon: "/icons/gray-car-icon.svg",
      iconAlt: "car-icon",
      label: "Parking",
      id: 1,
    },
    {
      icon: "/icons/gray-wifi-icon.svg",
      iconAlt: "wifi-icon",
      label: "Wifi",
      id: 2,
    },
    {
      icon: "/icons/bed-icon.svg",
      iconAlt: "bed-icon",
      label: "2 Rooms",
      id: 3,
    },
    {
      icon: "/icons/gray-kitchen-icon.svg",
      iconAlt: "kitchen-icon",
      label: "Kitchen",
      id: 4,
    },
    {
      icon: "/icons/gray-table-icon.svg",
      iconAlt: "table-icon",
      label: "Tables",
      id: 5,
    },
    {
      icon: "/icons/gray-chair-icon.svg",
      iconAlt: "chair-icon",
      label: "Chairs",
      id: 6,
    },
  ];

  const accordionItems: AccordionItem[] = [
    {
      value: "parking",
      title: "Parking",
      icon: "/icons/gray-car-icon.svg",
      content: "Content for Parking accordion.",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: "Content for Host Rules accordion.",
    },
  ];

  const addOnItems = [
    {
      icon: "/icons/gray-monitor-icon.svg",
      title: "Computer Screen",
      price: "$10 / item",
    },
    {
      icon: "/icons/gray-bedsheet-icon.svg",
      title: "Bed Sheets",
      price: "$30 / item",
    },
    {
      icon: "/icons/gray-battery-icon.svg",
      title: "Phone Charger",
      price: "$3 / item",
    },
    {
      icon: "/icons/gray-ringlight-icon.svg",
      title: "Ring Light",
      price: "$3 / item",
    },
  ];

  return (
    <div className="flex sm:container sm:mx-auto sm:my-24 sm:px-14 md:px-10 gap-2 flex-col">
      <div className="flex flex-row ">
      <div className="text-black text-[18px] sm:text-4xl font-normal font-Poppins">
        Cabin in Peshastin
      </div>
      <div className="sm:hidden flex space-x-2 ml-2 items-center">
        <p className="flex items-center text-[13px] sm:text-[16px] text-primary-amber-500 mr-0 font-Poppins">
          <Image
            src={"/icons/orange-star-icon.svg"}
            alt="star-icon"
            width={14}
            height={14}
            className="mr-1"
          />
          {"5.0"}
        </p>
        <p className=" sm:text-[16px] text-[13px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${30} reviews)`}</p>
      </div>
      </div>

      {/* Icon's Details */}
      <div className="flex justify-between mb-3">
        {/* =================================== Left Description =============================  */}
        <div className="items-center flex gap-[1rem] sm:gap-4">
          <div className="space-x-4 sm:space-x-2 hidden sm:flex">
            <p className="flex items-center text-[11px] sm:text-[16px] text-primary-amber-500 mr-0 text-lg font-Poppins">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={14}
                height={14}
                className="mr-1"
              />
              {"5.0"}
            </p>
            <p className=" sm:text-[16px] text-[11px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins text-lg">{`(${30} reviews)`}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[12px] sm:text-lg">
            <Image
              src={"/icons/time.svg"}
              alt="time"
              width={20}
              height={20}
              className="opacity-70"
            />
            <div>2 hr min</div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[12px] sm:text-lg">
            <Image
              src={"/icons/square-fit-icon.svg"}
              alt="square-fit"
              width={18}
              height={18}
            />
            <div>323 sqft</div>
          </div>
        </div>

        {/* =================================== Right Description =============================  */}

        <div className="flex space-x-4">
          <div className="flex items-center justify-center space-x-2 font-Poppins text-[12px] sm:text-lg">
            <Image
              src={"/icons/gray-share-icon.svg"}
              alt="share-icon"
              width={18}
              height={18}
            />
            <div>Share</div>
          </div>
          <div className="flex items-center justify-center space-x-2 font-Poppins text-[12px] sm:text-lg">
            <Image
              src={"/icons/gray-heart-icon.svg"}
              alt="heart-icon"
              width={20}
              height={20}
              className="opacity-50"
            />
            <div>Favorite</div>
          </div>
        </div>
      </div>

      {/* Pictures of Property*/}
      <div className="flex space-x-4 w-full">
        <Image
          src={"/images/dummyImage-1.png"}
          alt="detail-image"
          className=" w-3/5 md:w-1/2 h-auto rounded-tl-[20px] rounded-bl-[20px]"
          width={200}
          height={470}
        />
        <div className="hidden md:flex md:flex-col md:w-1/4 md:gap-4">
          <Image
            src={"/images/dummyImage-2.png"}
            alt="detail-image"
            className="w-full h-1/2"
            width={200}
            height={470}
          />
          <Image
            src={"/images/dummyImage-3.png"}
            alt="detail-image"
            className="w-full h-1/2"
            width={200}
            height={470}
          />
        </div>
        <div className="flex flex-col  w-2/5 md:w-1/4 gap-4">
          <Image
            src={"/images/dummyImage-4.png"}
            alt="detail-image"
            className="w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
          <Image
            src={"/images/dummyImage-5.png"}
            alt="detail-image"
            className="w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
        </div>
      </div>
      <div className="sm:flex sm:gap-10 my-10 sm:my-20">
        {/* =================================Left Section=================================== */}

        <div className="w-full sm:w-[70%]">
          <div className="flex flex-col gap-3">
            <div className="text-black text-[18px] sm:text-2xl font-normal font-Poppins">
              About the Space
            </div>
            <div className={` rounded-3xl `}>
              <div className="text-black text-[14px] sm:text-lg font-normal">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only...
              </div>
            </div>
          </div>
          <p className="text-primary-emerald-300 text-[15px] sm:text-lg mt-4 hover:underline cursor-pointer w-fit">
            Read more...
          </p>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Included in the booking=================================== */}

          <div className="flex-col flex gap-7">
            <p className="font-Poppins text-[18px] sm:text-2xl font-medium">
              Included in your booking
            </p>
            <div className="flex flex-wrap gap-6">
              {bookingSpecifications.map((tag) => (
                <div
                  className={`border rounded-xl py-3 px-5 gap-3 w-fit flex items-center`}
                  key={tag.id}
                >
                  <Image
                    src={tag.icon}
                    alt={tag.iconAlt}
                    width={20}
                    height={20}
                    className={
                      tag.icon === "/icons/bed-icon.svg" ? "opacity-20" : ""
                    }
                  />

                  <div className="text-black text-[14px] sm:text-lg font-normal">
                    {tag.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Rules Accordion=================================== */}
          <div className="flex-col flex gap-7">
            <p className="font-Poppins text-[18px] sm:text-2xl font-medium">Rules</p>
            <div className="w-full">
              <Accordion items={accordionItems} />
            </div>
          </div>
          <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>

          {/* ================================= Add-ons from the host =================================== */}

          <div className="flex-col flex gap-7">
            <div className="flex flex-col gap-2">
              <p className="font-Poppins text-[18px] sm:text-2xl font-medium">
                Add-ons from the host
              </p>
              <p className="text-[14px] sm:text-lg">
                Host provided services, items or options. Available at checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {addOnItems.map((addOn, index) => (
                <div
                  className="flex items-center rounded-xl border border-secondary-neutral-200 py-3 px-4"
                  key={index}
                >
                  <div className="rounded-xl bg-gray-100 w-16 h-16 flex items-center justify-center mr-4">
                    <Image
                      src={addOn.icon}
                      alt={addOn.title}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <p className="text-[14px] sm:text-lg font-medium">{addOn.title}</p>
                    <div className="flex gap-2">
                      <p>{addOn.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
        </div>
        <div className="w-full sm:w-[30%]"></div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
