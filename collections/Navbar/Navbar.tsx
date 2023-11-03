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
  const { user } = useAuthContext();

  return (
    <nav className="bg-white p-4 text-secondary-gray-700 sticky top-0 z-[5] shadow border border-bottom">
      <div className="flex justify-between items-center container mx-auto">
        <div className="hidden md:flex items-center md:space-x-6">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={55}
              className="sm:w-[95px] lg:w-[140px]"
            />
          </Link>
        </div>
        <FilterSearch />

        {user ? (
          <>
            <div className="border border-gray-200 rounded-full p-[10px] xxs:flex md:hidden">
              <Image
                src={"/icons/filter-icon.svg"}
                alt="filter-icon"
                width={20}
                height={20}
              />
            </div>
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
              <ProfileDropdown photoURL={user.photoURL ?? ""} />
            </div>
          </>
        ) : (
          <div className="hidden items-center space-x-6 md:flex">
            <Button text="About Us" onClick={() => {}} type="white" />
            <Button
              text="Register"
              onClick={() => {
                router.push("/signup");
              }}
              type="green"
              rounded
            />
          </div>
        )}
      </div>
    </nav>
  );
};
