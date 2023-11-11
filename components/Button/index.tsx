import React from "react";

type Props = {
  text: string;
  rounded?: boolean;
  onClick?: () => void;
  type: "green" | "white" | "gray";
  full?: boolean;
  bordered?: boolean;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  type,
  rounded,
  full,
  bordered,
  disabled = false,
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
      } text-gray-950 py-2 px-4 ${rounded ? "rounded-full" : ""}
      ${full ? "w-full" : ""}
      ${bordered ? "border" : ""}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
