import React from "react";
import Image from "next/image";
import { PaginationProps } from "@/types";

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center space-x-4 place-content-center">
      <button
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
        className="cursor-pointer border border-secondary-gray-700 w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full flex items-center justify-center"
      >
        <Image
          src={"/icons/left-arrow-icon.svg"}
          alt="left-arrow-icon"
          width={10}
          height={10}
          className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
        />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`border border-secondary-gray-700 w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full  text-[16px] md:text-lg font-semibold ${
            pageNumber === currentPage
              ? "bg-secondary-gray-700 text-white"
              : "bg-white text-secondary-gray-700"
          } cursor-pointer`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => {
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
        className="cursor-pointer border border-secondary-gray-700 w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full flex items-center justify-center"
      >
        <Image
          src={"/icons/right-arrow-icon.svg"}
          alt="left-arrow-icon"
          width={10}
          height={10}
          className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
        />
      </button>
    </div>
  );
};
