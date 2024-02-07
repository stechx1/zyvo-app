"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
type props = {
  name?: string;
  type:
    | "email"
    | "password"
    | "text"
    | "search"
    | "lock"
    | "month"
    | "year"
    | "edit";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  invalidMessage?: string;
  prefixIcon?: string;
  size?: "sm" | "lg"
};
export default function Input({
  name,
  type,
  value,
  placeholder,
  onChange,
  invalidMessage = "",
  prefixIcon,
  size
}: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleBlur = () => {
    setIsEdit(false);
  };

  const handlePenIconClick = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      if (inputRef.current) {
        inputRef?.current.focus();
      }
    }
  }, [isEdit]);

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center">
        {prefixIcon && (
          <Image
            src={prefixIcon}
            className="cursor-pointer absolute my-2 left-[5%]"
            alt={prefixIcon}
            width={20}
            height={20}
          />
        )}
        <input
          id="Input"
          ref={inputRef}
          name={name}
          className={`px-5 py-2 lg:py-3 border rounded-full focus:outline-none text-gray-600 w-full text-sm ${
            invalidMessage ? " focus:border-red-500" : " focus:border-gray-500 "
          }${invalidMessage ? " border-red-300 " : " border-gray-300 "} ${
            type === "lock"
              ? "placeholder-gray-950"
              : type === "year" && "placeholder-gray-950"
          } ${prefixIcon && "pl-11"} ${type === "edit" && "disabled:bg-[#fff]"} 
          ${size==="sm" ? "xl:py-2 md:text-[16px]" : "xl:py-3 md:text-h3"}
          `}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onBlur={handleBlur}
          disabled={type === "edit" && !isEdit}
        />
        {type === "search" ? (
          <Image
            src={"/icons/filter-search-icon.svg"}
            className="cursor-pointer absolute top-[5px] sm:top-[3.5px] xl:top-[7px] lg:top-[7px] right-1"
            alt="search-icon"
            width={32}
            height={32}
          />
        ) : type === "lock" ? (
          <Image
            src={"/icons/lock.svg"}
            className="cursor-pointer md:w-[20px] md:h-[20px] absolute my-1.5 right-4"
            alt="lock-icon"
            width={13}
            height={13}
          />
        ) : (
          type === "edit" &&
          !isEdit && (
            <Image
              src={"/icons/pen-icon.svg"}
              className="cursor-pointer absolute my-2 right-2"
              alt="lock-icon"
              width={32}
              height={32}
              onClick={() => handlePenIconClick()}
            />
          )
        )}
      </div>
      {invalidMessage && (
        <label className="text-red-500 text-sm">{invalidMessage} </label>
      )}
    </div>
  );
}
