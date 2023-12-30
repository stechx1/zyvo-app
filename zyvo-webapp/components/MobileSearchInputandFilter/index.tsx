import React from "react";
import Input from "../Input";
import Image from "next/image";

export default function MobileSearchAndFilter() {
  return (
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
  );
}
