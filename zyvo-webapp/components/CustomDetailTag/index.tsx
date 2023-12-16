import React from "react";

interface TagProps {
  icon?: React.ReactNode;
  text: string;
  type?: "sm" | "lg";
}

const CustomDetailTag: React.FC<TagProps> = ({ icon, text, type = "md" }) => {
  const getPadding = () => {
    switch (type) {
      case "sm":
        return "py-2";
      case "lg":
        return "py-3";
      default:
        return "py-2.5";
    }
  };

  const getBorderRadius = () => {
    switch (type) {
      case "sm":
        return "rounded-full";
      case "lg":
        return "rounded-xl";
      default:
        return "rounded-full";
    }
  };

  return (
    <div
      className={`flex items-center ${getPadding()} border ${getBorderRadius()} bg-[#fff] px-4`}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <div>{text}</div>
    </div>
  );
};

export default CustomDetailTag;
