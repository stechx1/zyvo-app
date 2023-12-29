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
}) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 mr-5 flex items-center pointer-events-none">
          <Image src={icon} alt="icon" width={20} height={20} />
        </div>
      )}
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger
          className={` ${roundedFull && "rounded-full"} ${icon ? "pl-10" : ""}`}
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
