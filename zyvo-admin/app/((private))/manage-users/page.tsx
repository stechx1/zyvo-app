"use client";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";
import React from "react";
import DataTable from "./Components/UsersTable";
import Image from "next/image";

export default function ManageUsers() {
  const tableData = [
    {
      user: "John Doe",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Active",
      strikes: 0,
      lastBooking: "June 26, 2023",
    },
    {
      user: "John Doe",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Active",
      strikes: 3,
      lastBooking: "Oct 26, 2023",
    },
    {
      user: "John Doe",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Inactive",
      strikes: 0,
      lastBooking: "June 22, 2023",
    },
    {
      user: "John Doe",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Suspended",
      strikes: 0,
      lastBooking: "June 22, 2023",
    },
    {
      user: "John Doe",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Inactive",
      strikes: 0,
      lastBooking: "June 22, 2023",
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <div className="lg:w-40 w-28">
            <CustomSelect
              roundedFull
              options={[{ label: "All Users", value: "All Users" }]}
            />
          </div>
          <div className="lg:w-40">
            <CustomSelect
              roundedFull
              options={[{ label: "All Status", value: "All Status" }]}
            />
          </div>
        </div>
        <div>
          <CustomDetailTag
            icon={
              <Image
                src={"/icons/filter-icon.svg"}
                alt="profile-pic"
                width={15}
                height={15}
              />
            }
            text="Filters"
            type="sm"
          />
        </div>
      </div>
      <div className="my-4">
        <DataTable data={tableData} />
      </div>
    </div>
  );
}
