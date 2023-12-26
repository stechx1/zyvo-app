import Image from "next/image";
import { DynamicFilterDropdown } from "./DynamicFilterDropdown/DynamicFilterDropdown";

export const FilterSearch = () => {
  return (
    <div className="flex items-center">
      <div className="border border-gray-200 rounded-full flex items-center py-[2px] md:px-5 pl-5 pr-1 space-x-3 md:w-[398px] w-full">
        <div className="border-r border-gray-200 md:pr-14 xxs:pr-6 pr-4 cursor-pointer">
          <DynamicFilterDropdown label="Where" />
        </div>
        <div className="border-r border-gray-200 md:pr-14 xxs:pr-6 pr-4 cursor-pointer">
          <DynamicFilterDropdown label="Time" />
        </div>
        <div className="md:pr-14 xxs:pr-6 pr-4 cursor-pointer">
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
