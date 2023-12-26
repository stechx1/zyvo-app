import React, { useState } from "react";

interface toggleProps {
  isToggled: boolean;
  handleToggle: ()=>void
}
export const CustomToggleBtn: React.FC<toggleProps> = ({ isToggled,handleToggle }) => {
  
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="hidden"
          checked={isToggled}
          onChange={handleToggle}
        />
        <div
          className={`toggle__line w-10 bg-gray-400 rounded-full shadow-inner ${
            isToggled ? "bg-blue-400" : ""
          }`}
          style={{ height: "1.3rem" }}
        ></div>
        <div
          className={`toggle__dot absolute w-4 h-4 bg-white rounded-full shadow inset-y-0.5 left-1 ${
            isToggled ? "transform translate-x-full left-auto right-5" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};
