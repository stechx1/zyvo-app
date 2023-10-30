import React from "react";

type Props = {
  text: string;
  rounded?: boolean;
  onClick?: () => void;
  type: "custom-primary" | "custom-secondary" | "custom-transparent";
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
      className={`bg-${type} text-gray-950 py-2 px-4 ${
        rounded && "rounded-full"
      }
      ${full && "w-full"}
      ${bordered && "border"}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
