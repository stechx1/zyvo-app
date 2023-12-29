"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
import OrderAmountBox from "./components/orderAmountBox";
import CustomMenu from "@/components/Menu";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";
import { CustomDialog } from "@/components/Dialog";

export default function Reports() {
  interface bookings {
    id: number;
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

  const [width] = useScreenDimensions();
  const [bookings, setBookings] = useState<bookings[]>([
    {
      id: Math.random(),
      title: "Katelyn Francy",
      date: "October 22, 2023",
      status: "Solved",
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
      id: Math.random(),
      title: "Mia Williams",
      date: "October 29, 2023",
      status: "Pending",
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
      id: Math.random(),
      title: "Emily James",
      date: "October 30, 2023",
      status: "Blocked",
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
      id: Math.random(),
      title: "Michael Kenny",
      date: "October 30, 2023",
      status: "Solved",
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
  const [detailView, setDetailView] = useState(true);
  const [selectionView, setSelectionView] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reportsType, setReportType] = useState<string>("All Reports");
  const [selectedReport, setSelectedReport] = useState<bookings>();

  useEffect(() => {
    if (width < 640) {
      setDetailView(false);
      setSelectionView(true);
    } else {
      setDetailView(true);
      setSelectionView(true);
    }
  }, [width]);

  function getStatusColor(status: string) {
    switch (status) {
      case "Solved":
        return "bg-[#4AEAB1]";
      case "Confirmed":
        return "bg-[#85d6ff]";
      case "Pending":
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

  const handleReportTypeChange = (value: string) => {
    console.log("changing state");
    setReportType(value);
  };

  return (
    <>
      {width < 640 && selectionView && <MobileSearchAndFilter />}
      <div className="flex justify-between space-x-4">
        {selectionView && (
          <div className="w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`">
            <div className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="text-lg" role="button">
                  {reportsType}
                </div>
                <Image
                  src={"/icons/down.svg"}
                  alt="down"
                  width={13}
                  height={13}
                />
                {isDropdownOpen && (
                  <CustomMenu
                    dropDownLink={[
                      {
                        name: "All Reports",
                        action: (value) => handleReportTypeChange(value),
                      },
                      {
                        name: "Users Reported",
                        action: (value) => handleReportTypeChange(value),
                      },
                      {
                        name: "Users blocked",
                        action: (value) => handleReportTypeChange(value),
                      },
                      {
                        name: "Solved",
                        action: (value) => handleReportTypeChange(value),
                      },
                      {
                        name: "Pending",
                        action: (value) => handleReportTypeChange(value),
                      },
                    ]}
                    setIsDropdownOpen={setIsDropdownOpen}
                    isDropdownOpen={isDropdownOpen}
                  />
                )}
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
                  className={`flex mt-4 border px-2 justify-between py-2 rounded-xl ${
                    selectedReport?.id === res.id && "border-[#3A4B4C]"
                  } `}
                  role="button"
                  onClick={() => {
                    setSelectedReport(res);
                    if (width < 768) {
                      setDetailView(true);
                      setSelectionView(false);
                    }
                  }}
                >
                  <div className="flex">
                    <div className="flex items-center">
                      <div className="rounded-full border-2 border-gray-200 p-1 h-20 w-20">
                        <img
                          src={res.image}
                          alt="profile-pic"
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    </div>
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
        )}

        {/******Booking Details*******/}
        {detailView && (
          <div className="w-[100%] sm:w-[60%] lg:w-[50%] sm:flex flex-col md:border lg:border sm:border rounded-lg">
            {!selectionView && (
              <div className="space-y-2">
                <div className="border border-x-0 flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={"/icons/white-back-arrow.svg"}
                      alt="tick"
                      width={30}
                      height={30}
                      onClick={() => {
                        setSelectionView(true);
                        setDetailView(false);
                      }}
                    />
                    <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                      <Image
                        src={"/icons/profile-icon.png"}
                        alt="profile-pic"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex items-center space-x-1">
                      <div>Katelyn</div>
                      <Image
                        src={"/icons/starIcon.svg"}
                        alt="tick"
                        width={15}
                        height={15}
                      />
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>
                  <div className="h-8 w-0.5 bg-gray-200"></div>
                  <div className="flex items-center justify-center text-center">
                    <Image
                      src={"/icons/information-button.png"}
                      alt="info"
                      width={23}
                      height={23}
                    />
                    <div className="ml-0.5">User Activity</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-[48%]">
                    <Button
                      type="gray"
                      text="Apply Warning"
                      bordered
                      rounded
                      full
                      className="border-gray-700 my-2"
                    />
                  </div>
                  <div className="w-[48%]">
                    <Button
                      type="white"
                      text="Block User"
                      bordered
                      rounded
                      full
                      className="border-gray-700"
                    />
                  </div>
                </div>
                <OrderAmountBox />
              </div>
            )}
            <div className="flex items-center lg:p-4 md:p-4 sm:p-3 p-2 py-5 space-x-3">
              <div className="text-lg">User sent spam on inbox</div>
              <span className="bg-[#4AEAB1] text-black px-2 py-1 rounded-full text-sm">
                Solved
              </span>
            </div>
            <hr />
            <div className="pt-5 md:px-4 lg:px-4 sm:px-3 md:px-3 px-2 space-y-2">
              <div className="text-lg">Report Detail</div>
              <div className="flex gap-3">
                <CustomDetailTag text="Spam" type="sm" />
                <CustomDetailTag text="Unapproved images" type="sm" />
              </div>
            </div>
            <hr className="my-9" />
            <div className="md:px-5 sm:px-3 md:px-3 px-2 space-y-2">
              <div className="text-lg">Report Message</div>
              <div>
                <textarea
                  rows={width > 640 ? 4 : 2}
                  value={
                    "User shared images that violate a platform's guidelines or "
                  }
                  placeholder="Description"
                  className="px-2 focus:outline-none focus:border-gray-500 focus:border-1 rounded-lg py-2 text-black w-full border"
                />
              </div>
            </div>
            <hr className="my-9" />
            <div className="px-2 lg:px-5 md:px-5 sm:px-3">
              <label className="text-lg">Reviews</label>
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  <Image
                    src={"/icons/starIcon.svg"}
                    alt="star-icon"
                    width={15}
                    height={15}
                  />
                  <div className="ml-1 text-md md:text-md lg:text-base">
                    <span className="text-[#FCA800]">
                      4.9 <span className="text-black"> 30 reviews</span>
                    </span>
                  </div>
                </div>
                <div className="text-md md:text-md lg:text-base">
                  Sort by: Recent Reviews
                </div>
              </div>
              {Array.from({ length: 4 }, (_, i) => (
                <>
                  <div className="flex justify-between py-2">
                    <div className="flex px-2 space-x-2 w-full xl:w-9/12 items-center">
                      <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                        <Image
                          src={"/icons/profile-icon.png"}
                          alt="profile-pic"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div className="text-sm md:text-md lg:text-base font-semibold">
                            Emily James
                          </div>
                          <div className="xl:hidden space-y-2 text-sm md:text-md lg:text-base xl:text-base">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, index) => (
                                <Image
                                  src={"/icons/starIcon.svg"}
                                  alt="star-icon"
                                  width={width > 640 ? 15 : 12}
                                  height={width > 640 ? 15 : 12}
                                />
                              ))}
                              <div className="ml-2">Mar 09, 22</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm md:text-md lg:text-base xl:text-base w-max">
                          Host was very helpful. thank you so much
                        </div>
                      </div>
                    </div>
                    <div className="hidden xl:block space-y-2">
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
        )}

        {/****** Right side details ******/}
        {detailView && (
          <div className="hidden lg:block lg:w-[25%] space-y-4">
            <div className="border rounded-2xl p-4 text-center space-y-2">
              <div>Guest</div>
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
                <div className="flex">
                  <Image
                    src={"/icons/starIcon.svg"}
                    alt="tick"
                    width={15}
                    height={15}
                  />
                  <span>5.0</span>
                </div>
              </div>
              <hr />
              <div>
                <Button
                  type="gray"
                  text="Apply Warning"
                  bordered
                  rounded
                  full
                  className="border-gray-700 my-2"
                />
                <Button
                  type="white"
                  text="Block User"
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
                <div className="ml-0.5">Generate User Activity</div>
              </div>
            </div>
            <OrderAmountBox />
          </div>
        )}
      </div>
    </>
  );
}
