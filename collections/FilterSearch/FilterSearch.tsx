"use client"
import Image from "next/image";
import { DynamicFilterDropdown } from "./DynamicFilterDropdown/DynamicFilterDropdown";

export const FilterSearch = () => {
  return (
    <div className="flex items-center">
      <div className="border border-gray-200 rounded-full flex items-center py-[2px] px-5 space-x-3 w-[398px]">
        <div className="border-r border-gray-200 pr-14 cursor-pointer">
          <DynamicFilterDropdown label="Where" />
        </div>
        <div className="border-r border-gray-200 pr-14 cursor-pointer">
          <DynamicFilterDropdown label="Time" />
        </div>
        <div className="pr-14 cursor-pointer">
          <DynamicFilterDropdown label="Price" />
        </div>
        <Image
          src={"/icons/filter-search-icon.svg"}
          className="cursor-pointer"
          alt="search-icon"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};
