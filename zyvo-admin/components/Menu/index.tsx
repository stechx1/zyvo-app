import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface props {
  dropDownLink: options[];
  setIsDropdownOpen: (isOpen: boolean) => void;
  isDropdownOpen: boolean;
}

interface options {
  name: string;
  route?: string;
  action?: (value: string) => void;
}

export default function CustomMenu({
  dropDownLink,
  setIsDropdownOpen,
  isDropdownOpen,
}: props) {
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="absolute py-4 px-4 mt-[15%] w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <ul>
        {dropDownLink.map((menuItem, index) => (
          <li
            className="px-4 py-[8px] text-left hover:bg-secondary-gray-100 place rounded-xl"
            key={index}
            onClick={() => {
              if (menuItem.action) {
                menuItem.action(menuItem.name);
              }
            }}
          >
            <Link
              onClick={toggleDropdown}
              href={menuItem.route ? menuItem.route : ""}
              className="text-black text-md font-normal"
            >
              {menuItem.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
