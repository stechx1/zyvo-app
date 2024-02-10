import React from "react";
import Image from "next/image";
import { useCommonContext } from "@/context/CommonContext";

export const ProfileContactSection = ({}) => {
  const { user } = useCommonContext();
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
      <div className="flex items-center w-full justify-center sm:justify-start sm:space-x-3 flex-wrap">
        <div className="rounded-2xl bg-secondary-gray-600 text-center space-x-2 w-[90%] sm:w-[4.3rem] h-[4.3rem] flex items-center justify-center">
          <Image src={item.iconSrc} alt={"icon"} width={30} height={30} />
        </div>
        <div className="space-y-0">
          <div className="text-white text-[12.5px] sm:text-lg font-semibold">{item.title}</div>
          {item.isVerified ? (
            <div className="flex gap-2">
              <p className={`text-white text-xs sm:text-[18px] `}>Verified</p>
              <Image
                src={"/icons/check-mark-white-background.svg"}
                alt={"icon"}
                width={18}
                height={18}
                className="sm:w-[18px] w-[14px]"
              />
            </div>
          ) : (
            <div
              className={`text-white sm:mt-0 text-xs sm:text-[18px] font-thin opacity-[0.40] underline underline-offset-4 cursor-pointer`}
            >
              Confirm now
            </div>
          )}
        </div>
      </div>

      {index !== profileInfo.length - 1 && (
        <div className="h-[0.5px] hidden sm:block my-5 opacity-[0.20] bg-secondary-neutral-200"></div>
      )}
    </div>
  ));
};
