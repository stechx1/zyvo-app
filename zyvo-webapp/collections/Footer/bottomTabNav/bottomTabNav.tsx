import { BadgeIcon } from "@/components/BadgeIcon/BadgeIcon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

interface Props {}

function BottomTabNav(props: Props) {
  const {} = props;
  const router = useRouter();
  const pathname = usePathname();
  const { user, conversations, mode } = useAuthContext();

  const Navigations = [
    {
      title: "Discover",
      icon: "/icons/gray-dicover-icon.svg",
      selectedicon: "/icons/gray-discover-icon.svg",
      count: 0,
      id: 0,
      route: "/",
    },
    {
      title: "Inbox",
      icon: "/icons/gray-border-chat-icon.svg",
      selectedicon: "/icons/chat-icon.svg",
      count: conversations.reduce((total, conversation) => {
        return total + conversation.lastMessage.sender.userId !== user?.userId
          ? conversation.unreadCount
          : 0;
      }, 0),
      id: 1,
      route: "/messages",
    },
    {
      title: "Bookings",
      icon: "/icons/gray-border-booking-icon.svg",
      selectedicon: "/icons/gray-clip-icon.svg",
      count: 0,
      id: 2,
      route: "/bookings",
    },
    {
      title: "Wishlists",
      icon: "/icons/gray-border-heart.svg",
      selectedicon: "",
      count: 0,
      id: 3,
      route: "",
    },
    {
      title: "Profile",
      icon: "/icons/gray-broder-profile.svg",
      selectedicon: "/icons/black-border-user-icon.svg",
      count: 0,
      id: 4,
      route: "/profile",
    },
  ];

  return (
    <div className="sm:hidden w-full fixed bottom-0 bg-white border-t-2 flex justify-around p-3 text-xs text-[#B0B7B7]">
      {Navigations.map((res, i) => {
        return (
          <div
            key={i}
            className={`${
              pathname === res.route && "text-gray-900 "
            } text-center space-y-1 flex flex-col items-center`}
          >
            <BadgeIcon
              src={pathname === res.route ? res.selectedicon : res.icon}
              height={25}
              width={25}
              alt=""
              title={res.title}
              badgeCount={res.count}
              onClick={() => {
                console.log("route", res.route);
                if (res.route) {
                  router.push(res.route);
                }
              }}
            />
            <div>{res.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomTabNav;
