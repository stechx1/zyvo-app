import React from "react";

export default function Badge({ text }: { text: number }) {
  return (
    text > 0 && (
      <div className="text-black w-[20px] p-0.5 sm:w-[25px] rounded-full sm:px-1 text-center sm:py-1 text-xs font-semibold bg-secondary-green">
        {text}
      </div>
    )
  );
}
