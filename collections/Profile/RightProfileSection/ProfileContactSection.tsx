import { ProfileContactBoxProps } from "@/types";
import React from "react";
import Image from "next/image";

export const ProfileContactSection: React.FC<ProfileContactBoxProps> = ({
  profileInfo,
}) => {
  return (
      <div className="flex items-center">
        <div className="rounded-2xl bg-secondary-gray-600 w-16 h-16 flex items-center justify-center mr-4">
          <Image
            src={profileInfo.iconSrc}
            alt={profileInfo.iconAlt}
            width={30}
            height={30}
          />
        </div>
        <div>
          <p className="text-white text-lg font-medium">{profileInfo.title}</p>
          <div className="flex gap-2">
            <p
              className={`text-white text-[18px] ${
                profileInfo.isLink && `opacity-[0.40] underline cursor-pointer`
              } `}
            >
              {profileInfo.subTitle}
            </p>
            {profileInfo.subTitleIcon && (
              <Image
                src={profileInfo.subTitleIcon}
                alt={profileInfo.iconAlt}
                width={18}
                height={18}
              />
            )}
          </div>
        </div>
      </div>
  );
};
