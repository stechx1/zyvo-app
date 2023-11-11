import { DescriptionProps } from "@/types";
import React from "react";

export const Description: React.FC<DescriptionProps> = ({
  title,
  content,
  showBorder,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-black text-2xl font-normal font-Poppins">
        {title}
      </div>
      <div
        className={`${
          showBorder ? "border border-neutral-200 p-6" : ""
        } rounded-3xl `}
      >
        <div className="text-black text-lg font-normal">{content}</div>
      </div>
    </div>
  );
};
