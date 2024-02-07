import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  text: string;
  roundedfull?: boolean;
  rounded?: boolean;
  onClick?: () => void;
  type: "green" | "white" | "gray";
  full?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  icon?: string;
};

export default function Button({
  text,
  onClick,
  type,
  rounded,
  roundedfull,
  full,
  bordered,
  disabled = false,
  isLoading = false,
  className,
  icon,
}: Props) {
  return (
    <button
      className={`
      flex flex-nowrap items-center justify-center ${
        type === "green"
          ? "bg-secondary-green text-[#3A4B4C]"
          : type === "white"
          ? "bg-white text-gray-950"
          : type === "gray"
          ? "bg-secondary-gray-700 text-white"
          : ""
      }  xl:py-3 lg:py-2 md:py-2 sm:py-2 py-2 xl:px-4 lg:px-4 md:px-4 sm:px-4 px-3 
      ${roundedfull ? "rounded-full" : ""}
      ${rounded ? "rounded-md" : ""}
      ${full ? "w-full" : ""}
      ${bordered ? "border" : ""}
      text-[14px] xl:text-[18px] font-Poppins lg:text-base md:text-base sm:text-base
      ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon}
          alt="btn-icon"
          width={18}
          height={18}
          className="mr-[5px] sm:w-[21px] sm:h-[21px]"
        />
      )}
      {isLoading ? (
        <div className="flex items-center justify-center">
          Please wait...
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
