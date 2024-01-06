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
          ? "bg-secondary-green"
          : type === "white"
          ? "bg-white"
          : type === "gray"
          ? "bg-secondary-gray-700 text-white"
          : ""
      } text-gray-950 xl:py-2 lg:py-2 md:py-2 sm:py-2 py-1.5 xl:px-4 lg:px-4 md:px-4 sm:px-4 px-3 
      ${roundedfull ? "rounded-full" : ""}
      ${rounded ? "rounded-md" : ""}
      ${full ? "w-full" : ""}
      ${bordered ? "border" : ""}
      ${className}
      text-sm xl:text-base lg:text-base md:text-base sm:text-base
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {icon && (
        <Image
          src={icon}
          alt="clock-icon"
          width={18}
          height={18}
          className="mr-2"
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
