"use client";
import CustomSelect from "@/components/SelectDropDown";
import Image from "next/image";
import React from "react";

export default function AdminDashboard() {
  function getStatusColor(status?: string) {
    switch (status) {
      case "Finished":
        return "bg-[#4AEAB1]";
      case "pending":
        return "bg-[#fff178]";
      default:
        return "bg-[#d7ebfa]";
    }
  }
  const TotalCountsBox = (
    title: string,
    value: string | number,
    imageUrl: string,
    iconBg: string
  ) => {
    return (
      <div className="py-3 px-2 flex border rounded-xl space-x-3 min-w-[23%]">
        <div
          className={`bg-[${iconBg}] rounded-xl justify-center items-center text-center py-3 px-3`}
        >
          <Image src={imageUrl} height={25} width={25} alt="dollar-icon" />
        </div>
        <div>
          <div>{title}</div>
          <div className="font-semibold font-medium">{value}</div>
        </div>
      </div>
    );
  };

  const UserDetailBar = (
    name: string,
    image: string,
    tagtext?: string,
    status?: string,
    userType?: string
  ) => {
    return (
      <div className="flex justify-between w-full border px-3 py-1.5 rounded-xl">
        <div className="flex items-center space-x-2">
          <Image
            src={image}
            height={30}
            width={30}
            alt="dollar-icon"
            className="rounded-full"
          />
          <div>{name}</div>
        </div>
        <div>
          <span
            className={`inline-block mt-0.5 text-black px-2.5 py-2 text-sm leading-none ${getStatusColor(
              status
            )} rounded-full`}
          >
            {tagtext}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        {TotalCountsBox(
          "Total Revenue",
          "$125,000.00",
          "/icons/admin/white-dollar-icon.svg",
          "#64CCC1"
        )}
        {TotalCountsBox(
          "Total Bookings",
          1235,
          "/icons/admin/white-calendar-icon.svg",
          "#389CE5"
        )}
        {TotalCountsBox(
          "Daily Customers",
          1568,
          "/icons/admin/white-profile-icon.svg",
          "#F5A43D"
        )}
        {TotalCountsBox(
          "Daily Host",
          "06",
          "/icons/admin/white-daily-host-icon.svg",
          "#DB72D6"
        )}
      </div>
      <div className="flex justify-between my-6">
        <div className="px-6 py-3 border rounded-xl w-[48.82%]">
          <div className="flex justify-between items-center">
            Recent Bookings
            <div className="min-w-[20%]">
              <CustomSelect
                roundedFull
                options={[
                  { label: "This week", value: "This week" },
                  { label: "This month", value: "This month" },
                ]}
              />
            </div>
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Today - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Today - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Tomorrow - 10:05AM"
            )}
          </div>
          <div className="my-2">
            {UserDetailBar(
              "Person Name",
              "/icons/profile-icon.png",
              "Wednesday - 10:05AM"
            )}
          </div>
        </div>
        <div className="px-3 py-3 border rounded-xl w-[48.82%]">
          <div className="flex justify-between items-center">
            <div>Recent Bookings</div>
            <div className="min-w-[20%]">
              <CustomSelect
                roundedFull
                options={[
                  { label: "This week", value: "This week" },
                  { label: "This month", value: "This month" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border rounded-xl w-[48.82%]">
        <div className="flex justify-between items-center">
          Recent Reports
          <div className="min-w-[20%]">
            <CustomSelect
              roundedFull
              options={[
                { label: "This week", value: "This week" },
                { label: "This month", value: "This month" },
              ]}
            />
          </div>
        </div>
        <div className="my-2">
          {UserDetailBar(
            "Person Name",
            "/icons/profile-icon.png",
            "Solved",
            "Finished"
          )}
        </div>
        <div className="my-2">
          {UserDetailBar(
            "Person Name",
            "/icons/profile-icon.png",
            "Solved",
            "Finished"
          )}
        </div>
        <div className="my-2">
          {UserDetailBar(
            "Person Name",
            "/icons/profile-icon.png",
            "Pending",
            "pending"
          )}
        </div>
        <div className="my-2">
          {UserDetailBar(
            "Person Name",
            "/icons/profile-icon.png",
            "Pending",
            "pending"
          )}
        </div>
      </div>
    </div>
  );
}
