"use client";
import Button from "@/components/Button";
import React, { useState } from "react";
import Image from "next/image";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";

export default function Reports() {
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

  return (
    <div className="flex justify-between space-x-4">
      <div className="w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-lg">All Reports</div>
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
              className="flex mt-4 border px-2 justify-between py-2 rounded-xl"
              role="button"
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

      {/******Booking Details*******/}
      <div className="w-[100%] sm:w-[60%] lg:w-[50%] sm:flex flex-col border rounded-lg">
        <div className="flex items-center p-4 space-x-3">
          <div className="text-lg">User sent spam on inbox</div>
          <span className="bg-[#4AEAB1] text-black px-2 py-1 rounded-full text-sm">
            Solved
          </span>
        </div>
        <hr />
        <div className="pt-5 px-4 space-y-2">
          <div className="text-lg">Report Detail</div>
          <div className="flex gap-3">
            <CustomDetailTag text="Spam" type="sm" />
            <CustomDetailTag text="Unapproved images" type="sm" />
          </div>
        </div>
        <hr className="my-9" />
        <div className="px-5 space-y-2">
          <label>Report Message</label>
          <div>
            <textarea
              rows={4}
              value={
                "User shared images that violate a platform's guidelines or "
              }
              placeholder="Description"
              className="px-2 focus:outline-none focus:border-gray-500 focus:border-1 rounded-lg py-1 text-black w-full border"
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
