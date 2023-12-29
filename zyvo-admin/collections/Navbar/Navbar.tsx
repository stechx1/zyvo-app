import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown/ProfileDropdown";
import { FilterSearch } from "../FilterSearch/FilterSearch";
import { BadgeIcon } from "@/components/BadgeIcon/BadgeIcon";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

export const Navbar = () => {
  const router = useRouter();
  const { user, mode } = useAuthContext();

  return (
    <nav className="px-8 hidden lg:block md:block xl:block sm:px-14 md:px-20 lg:px-20 xl:px-32 bg-white py-4 text-secondary-gray-700 sticky top-0 z-[5] shadow border border-bottom">
      <div className="flex justify-between items-center">
        <div className="hidden md:flex items-center md:space-x-6">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={55}
              className="md:w-[110px] lg:w-[140px]"
            />
          </Link>
        </div>
        <div className="hidden items-center space-x-6 md:flex">
          <BadgeIcon
            src="/icons/gray-cutout-pie-icon.svg"
            alt="Clock Icon"
            width={30}
            height={30}
          />
          <BadgeIcon
            src="/icons/white-background-info-icon.svg"
            alt="Clock Icon"
            width={28}
            height={28}
            badgeCount={2}
          />
          <BadgeIcon
            src="/icons/gray-checklist-icon.svg"
            alt="Chat Icon"
            width={27}
            height={27}
          />
          <BadgeIcon
            src="/icons/bell-icon.svg"
            alt="Bell Icon"
            width={25}
            height={25}
            badgeCount={4}
          />
          <ProfileDropdown
            photoURL={user?.photoURL ?? "/icons/profile-icon.png"}
          />
        </div>
      </div>
    </nav>
  );
};
