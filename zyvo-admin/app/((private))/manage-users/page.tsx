"use client";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";
import React, { useEffect, useState } from "react";
import DataTable from "./Components/UsersTable";
import Image from "next/image";
import Input from "@/components/Input";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
import Button from "@/components/Button";
import { CustomDialog } from "@/components/Dialog";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export default function ManageUsers() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [width] = useScreenDimensions();
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
  }, [user]);
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
    {
      user: "John Cena",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Inactive",
      strikes: 0,
      lastBooking: "June 22, 2023",
    },
    {
      user: "John Elena",
      id: Math.random(),
      paymentMethod: "Visa **** 1234",
      status: "Suspended",
      strikes: 0,
      lastBooking: "June 22, 2023",
    },
  ];

  return (
    <div>
      {width < 640 && (
        <div className="border border-x-0 border-t-0 py-4 mb-3 flex justify-between">
          <div className="w-[86%]">
            <Input type="search" placeholder="Search..." />
          </div>
          <div className="border rounded-full px-3 py-3">
            <Image
              src={"/icons/filter-icon.svg"}
              alt="profile-pic"
              width={15}
              height={15}
            />
          </div>
        </div>
      )}
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
