import React from "react";
type props = {
  type: "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};
export default function Input({ type, value, placeholder, onChange }: props) {
  return (
    <input
      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-800 w-full sm:text-sm border-gray-300 rounded-full focus:outline-none text-gray-600"
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
