import React from "react";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";

export const ProfileContactSection = ({}) => {
  const { user } = useAuthContext();
  const profileInfo = [
    {
      title: "Email Address",
      iconSrc: "/icons/white-email-icon.svg",
      isVerified: !!user?.emailVerified,
    },
    {
      title: "Phone Number",
      iconSrc: "/icons/white-phone-icon.svg",
      isVerified: !!user?.phoneNumberVerified,
    },
    {
      title: "Verify Identity",
      iconSrc: "/icons/gray-profile-icon.svg",
      isVerified: false,
    },
  ];
  return profileInfo.map((item, index) => (
    <div key={index}>
      <div className="flex items-center">
        <div className="rounded-2xl bg-secondary-gray-600 w-16 h-16 flex items-center justify-center mr-4">
          <Image src={item.iconSrc} alt={"icon"} width={30} height={30} />
        </div>
        <div>
          <p className="text-white text-lg font-medium">{item.title}</p>
          {item.isVerified ? (
            <div className="flex gap-2">
              <p className={`text-white text-[18px] `}>Verified</p>
              <Image
                src={"/icons/check-mark-white-background.svg"}
                alt={"icon"}
                width={18}
                height={18}
              />
            </div>
          ) : (
            <p
              className={`text-white text-[18px]  opacity-[0.40] underline cursor-pointer`}
            >
              Confirm Now
            </p>
          )}
        </div>
      </div>

      {index !== profileInfo.length - 1 && (
        <div className="h-[0.5px] my-5 opacity-[0.20] bg-secondary-neutral-200"></div>
      )}
    </div>
  ));
};
