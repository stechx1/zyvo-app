"use client"
import React, { useState, useRef, useEffect } from "react";
import { PriceFilter } from "../PriceFilter/PriceFilter";
import { PlaceFilter } from "../PlaceFilter/PlaceFilter";
import { DynamicFilterDropdownProps } from "@/types";

export const DynamicFilterDropdown: React.FC<DynamicFilterDropdownProps> = ({
  label,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);
  // Content specific to each label
  let content = null;
  switch (label) {
    case "Where":
      content = <PlaceFilter/>;
      break;
    case "Time":
      content = <div>Time</div>;
      break;
    case "Price":
      content = <PriceFilter />;
      break;
  }
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div
      className="relative cursor-pointer"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span className="text-md cursor-pointer">{label}</span>
      {isDropdownOpen && (
        <div
          className="absolute bg-white rounded-xl shadow-lg mt-[8px] w-52 left-[-42px] sm:left-0"
          onClick={stopPropagation}
        >
          {content}
        </div>
      )}
    </div>
  );
};
