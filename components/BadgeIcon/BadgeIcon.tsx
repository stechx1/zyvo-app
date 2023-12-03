import React from "react";
import Image from "next/image";
import { BadgeIconProps } from "@/types";
import Badge from "../Badge";

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  src,
  alt,
  width,
  height,
  badgeCount,
  onClick,
}) => {
  const showBadge = badgeCount > 0;

  return (
    <div className="relative inline-block" role="button" onClick={onClick}>
      <div className="relative">
        <Image src={src} alt={alt} width={width} height={height} />
        {showBadge && (
          <div className="absolute bottom-4 left-4">
            <Badge text={badgeCount} />
          </div>
        )}
      </div>
    </div>
  );
};
