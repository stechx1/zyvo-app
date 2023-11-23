import Image from "next/image";
import React from "react";
type props = {
  name?: string;
  type: "email" | "password" | "text" | "search";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  invalidMessage?: string;
};
export default function Input({
  name,
  type,
  value,
  placeholder,
  onChange,
  invalidMessage = "",
}: props) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          name={name}
          className={`px-4 py-2 border rounded-full focus:outline-none text-gray-600 w-full sm:text-sm ${
            invalidMessage ? " focus:border-red-500" : " focus:border-gray-500 "
          }${invalidMessage ? " border-red-300 " : " border-gray-300 "}`}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {type === "search" && (
          <Image
            src={"/icons/filter-search-icon.svg"}
            className="cursor-pointer absolute top-[3px] right-1"
            alt="search-icon"
            width={32}
            height={32}
          />
        )}
      </div>
      {invalidMessage && (
        <label className="text-red-500 text-sm">{invalidMessage} </label>
      )}
    </div>
  );
}
