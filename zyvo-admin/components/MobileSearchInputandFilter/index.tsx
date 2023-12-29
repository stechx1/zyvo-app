import React from "react";
import Input from "../Input";
import Image from "next/image";

export default function MobileSearchAndFilter() {
  return (
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
  );
}
