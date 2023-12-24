import { Loader2 } from "lucide-react";
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
}: Props) {
  return (
    <button
      className={`${
        type === "green"
          ? "bg-secondary-green"
          : type === "white"
          ? "bg-white"
          : type === "gray"
          ? "bg-secondary-gray-700 text-white"
          : ""
      } text-gray-950 py-2 px-4 
      ${roundedfull ? "rounded-full" : ""}
      ${rounded ? "rounded-md" : ""}
      ${full ? "w-full" : ""}
      ${bordered ? "border" : ""}
      ${className}
      text-sm md:text-md lg:text-base
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
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
