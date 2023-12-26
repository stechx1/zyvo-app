import React from "react";

export default function Badge({ text }: { text: number }) {
  return (
    text > 0 && (
      <div className="text-black w-[25px] rounded-full px-1 text-center py-1 text-xs font-semibold bg-secondary-green">
        {text}
      </div>
    )
  );
}
