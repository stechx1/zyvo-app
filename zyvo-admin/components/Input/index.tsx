import { time } from "console";
import Image from "next/image";
import React from "react";
type props = {
  name?: string;
  type: "email" | "password" | "text" | "search" | "lock" | "month" | "year";
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
      <div className="relative flex">
        <input
          name={name}
          className={`px-4 py-2 border rounded-full focus:outline-none text-gray-600 w-full text-[14px] sm:text-sm ${
            invalidMessage ? " focus:border-red-500" : " focus:border-gray-500 "
          }${invalidMessage ? " border-red-300 " : " border-gray-300 "} ${type === "lock" ? "placeholder-gray-950" : type === "year" && "placeholder-gray-950"  }`
        }
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
        {type === "search" ? (
          <Image
            src={"/icons/filter-search-icon.svg"}
            className="cursor-pointer absolute top-[3px] right-1"
            alt="search-icon"
            width={32}
            height={32}
          />
        ): type === "lock" && (
          <Image
            src={"/icons/lock.svg"}
            className="cursor-pointer absolute top-[9px] right-4"
            alt="lock-icon"
            width={13}
            height={13}
          />
        )}
      </div>
      {invalidMessage && (
        <label className="text-red-500 text-sm">{invalidMessage} </label>
      )}
    </div>
  );
}
