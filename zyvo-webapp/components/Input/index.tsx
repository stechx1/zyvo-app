import { time } from "console";
import Image from "next/image";
import React, { useRef, useState } from "react";
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
};
export default function Input({
  name,
  type,
  value,
  placeholder,
  onChange,
  invalidMessage = "",
}: props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleBlur = () => {
    setIsEdit(false);
  };

  const handlePenIconClick = () => {
    setIsEdit(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef?.current.focus();
      }
    }, 100);
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center">
        <input
          id="Input"
          ref={inputRef}
          name={name}
          className={`px-4 py-2 xl:py-3 lg:py-3 border rounded-full focus:outline-none text-gray-600 w-full sm:text-sm ${
            invalidMessage ? " focus:border-red-500" : " focus:border-gray-500 "
          }${invalidMessage ? " border-red-300 " : " border-gray-300 "} ${
            type === "lock"
              ? "placeholder-gray-950"
              : type === "year" && "placeholder-gray-950"
          }`}
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
            className="cursor-pointer absolute top-[9px] xl:top-[13.5px] lg:top-[13.5px] right-4"
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
