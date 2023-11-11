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
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
