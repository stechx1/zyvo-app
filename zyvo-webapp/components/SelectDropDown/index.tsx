import React, { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface CustomSelectProps {
  icon?: string;
  options: SelectItem[];
  roundedFull?: boolean;
  onValueChange: (value: string) => void;
  value: string;
  size?: "sm" | "lg";
}

interface SelectItem {
  label: string;
  value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  icon,
  options,
  roundedFull,
  onValueChange,
  value,
  size = "sm",
}) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Image
            src={icon}
            alt="icon"
            width={20}
            height={20}
            className="md:w-[22px] md:h-[22px]"
          />
        </div>
      )}
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={`outline-0 ring-offset-0 outline-offset-0 text-sm  md:text-base lg:text-base xl:h-[50px] lg:h-max md:h-max sm:h-max ${
            roundedFull && "rounded-full"
          } ${icon ? "pl-[41px]" : ""}
          ${
            size === "sm" ? "xl:text-[16px]" : size === "lg" && "xl:text-[18px]"
          }
          `}
          style={{ boxShadow: "none", ring: "none" } as React.CSSProperties}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
