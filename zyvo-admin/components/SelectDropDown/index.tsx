import React, { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  icon?: ReactNode;
  options: SelectItem[];
  roundedFull?: boolean;
  placeholder?: string;
}

interface SelectItem {
  label: string;
  value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  icon,
  options,
  roundedFull,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 mr-5 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <Select>
        <SelectTrigger
          className={`SelectTrigger outline-0 ring-offset-0 outline-offset-0 ${roundedFull && "rounded-full"} ${icon ? "pl-10" : ""}`}
          style={{ boxShadow: 'none', ring: 'none' } as React.CSSProperties}
        >
          <SelectValue placeholder={placeholder ?? "Select..."} />
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
