import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import { FilterSearch } from "../FilterSearch/FilterSearch";
import { BadgeIcon } from "@/components/BadgeIcon/BadgeIcon";

export const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-secondary-gray-700 sticky top-0 z-[5] shadow border border-bottom">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center md:space-x-6">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={140} height={55} />
          </Link>
        </div>
        <FilterSearch />
        <div className="hidden items-center space-x-6 md:flex">
          <BadgeIcon
            src="/icons/clock-icon.svg"
            alt="Clock Icon"
            width={28}
            height={28}
            badgeCount={1}
          />
          <BadgeIcon
            src="/icons/chat-icon.svg"
            alt="Chat Icon"
            width={28}
            height={28}
            badgeCount={1}
          />
          <BadgeIcon
            src="/icons/bell-icon.svg"
            alt="Bell Icon"
            width={26}
            height={26}
            badgeCount={4}
          />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};
