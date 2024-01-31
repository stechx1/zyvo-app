import React, { ReactNode } from "react";
import Input from "../Input";
import Image from "next/image";
import { FilterSearch } from "@/collections/FilterSearch/FilterSearch";
import { DynamicFilterDropdown } from "@/collections/FilterSearch/DynamicFilterDropdown/DynamicFilterDropdown";

interface props {
  type: "Search" | "Content" | "header";
  children?: ReactNode;
}

export default function MobileSearchAndFilter({ type, children }: props) {
  return (
    <>
      {type === "Search" ? (
        <div className="flex justify-between space-x-2">
          <div className="w-full">
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
      ) : type === "header" ? (
        <div className="flex justify-between items-center space-x-2">
          <Image
            role="button"
            src={"/icons/white-back-arrow.svg"}
            alt="tick"
            width={35}
            height={35}
            onClick={() => {
              // setSelectedBooking(null);
            }}
          />
          <div className="border border-gray-200 rounded-full flex w-full py-1 pl-3 pr-1 justify-between items-center">
            <div className="border-gray-200 cursor-pointer">
              <DynamicFilterDropdown label="Where" />
            </div>
            <div className="border-l border-gray-200 pl-2 cursor-pointer">
              <DynamicFilterDropdown label="Time" />
            </div>
            <div className="md:pr-7 border-l pl-2 cursor-pointer">
              <DynamicFilterDropdown label="Activity" />
            </div>
            <Image
              src={"/icons/filter-search-icon.svg"}
              className="cursor-pointer"
              alt="search-icon"
              width={35}
              height={35}
            />
          </div>
          <div className="border rounded-full px-2.5 py-2.5">
            <Image
              src={"/icons/filter-icon.svg"}
              alt="profile-pic"
              width={17}
              height={17}
            />
          </div>
        </div>
      ) : (
        type === "Content" && (
          <div className="flex justify-between space-x-2">
            <div className="w-full">{children}</div>
            <div className="border rounded-full px-3 py-3">
              <Image
                src={"/icons/filter-icon.svg"}
                alt="profile-pic"
                width={15}
                height={15}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}
