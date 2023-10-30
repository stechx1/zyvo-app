import React from "react";
type props = {
  name?: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      {invalidMessage && (
        <label className="text-red-500 text-sm">{invalidMessage} </label>
      )}
    </div>
  );
}
