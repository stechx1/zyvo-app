import React from "react";
import Image from "next/image";
import { BadgeIconProps } from "@types";

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  src,
  alt,
  width,
  height,
  badgeCount,
}) => {
  const showBadge = badgeCount > 0;

  return (
    <div className="relative inline-block">
      <div className="relative">
        <Image src={src} alt={alt} width={width} height={height} />
        {showBadge && (
          <div className="absolute top-0 right-0 bg-primary-emerald-300 text-black rounded-full px-2 py-1 text-xs font-semibold grid place-items-center translate-x-[0.5rem] translate-y-[-0.75rem]">
            {badgeCount}
          </div>
        )}
      </div>
    
    </div>
  );
};
