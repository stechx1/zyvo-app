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
    <nav className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 bg-white py-4 text-secondary-gray-700 sticky top-0 z-[5] shadow border border-bottom">
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

        {user ? (
          <>
            <FilterSearch />
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
                onClick={() => router.push("/messages")}
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
              <ProfileDropdown
                photoURL={user.photoURL ?? "/icons/profile-icon.png"}
              />
            </div>
          </>
        ) : (
          <div className="hidden items-center space-x-6 md:flex">
            <Button
              text="About Us"
              onClick={() => {
                router.push("/about");
              }}
              type="white"
            />
            <Button
              text="Register"
              onClick={() => {
                router.push("/signup");
              }}
              type="green"
              roundedfull
            />
          </div>
        )}
      </div>
    </nav>
  );
};
