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
      isVerified: false,
    },
    {
      title: "Verify Identity",
      iconSrc: "/icons/gray-profile-icon.svg",
      isVerified: false,
    },
  ];
  return profileInfo.map((item, index) => (
    <div key={index}>
      <div className="flex flex-col sm:flex-row sm:justify-center justify-start items-center sm:items-start  mr-3 sm:mr-4">
        <div className="rounded-2xl bg-secondary-gray-600 w-[93px] h-[78px] sm:w-16 sm:h-16 flex items-center justify-center">
          <Image src={item.iconSrc} alt={"icon"} width={30} height={30} />
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-3">
          <p className="text-white text-[12px] sm:text-lg font-medium">
            {item.title}
          </p>
          {item.isVerified ? (
            <div className="flex gap-2">
              <p className={`text-white text-[12px] sm:text-[18px] `}>
                Verified
              </p>
              <Image
                src={"/icons/check-mark-white-background.svg"}
                alt={"icon"}
                width={18}
                height={18}
              />
            </div>
          ) : (
            <p
              className={`text-white text-[12px] sm:text-[18px]  opacity-[0.40] underline cursor-pointer`}
            >
              Confirm Now
            </p>
          )}
        </div>
      </div>

      {index !== profileInfo.length - 1 && (
        <div className="h-[0.5px] my-5 opacity-[0.20] bg-secondary-neutral-200 hidden sm:block"></div>
      )}
    </div>
  ));
};
