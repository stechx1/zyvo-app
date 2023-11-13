import { IconTagProps } from "@/types";
import React from "react";
import Image from "next/image";

export const IconTag: React.FC<IconTagProps> = ({
  icon,
  iconAlt,
  closable,
  onRemoveTag,
  roundedBorder,
  tagId,
  label,
}) => {
  const tagStyle = `border rounded-${roundedBorder} py-3 px-5 gap-3 w-fit flex items-center`;

  return (
    <div className={tagStyle} key={tagId}>
      <Image
        src={icon}
        alt={iconAlt}
        width={20}
        height={20}
        className={icon === "/icons/bed-icon.svg" ? "opacity-20" : ""}
      />

      <div className="text-black text-lg font-normal">{label}</div>

      {closable && (
        <Image
          src="/icons/close-icon-grey-background.svg"
          alt="close-icon"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={() => onRemoveTag && onRemoveTag(tagId)}
        />
      )}
    </div>
  );
};
