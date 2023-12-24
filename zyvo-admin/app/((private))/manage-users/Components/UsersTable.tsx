"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useScreenDimensions } from "@/hooks/useScreenDimension";

interface TableRowProps {
  user: string;
  id: number;
  paymentMethod: string;
  status: string;
  strikes: number;
  lastBooking: string;
}

interface TableProps {
  data: TableRowProps[];
}

const TableRow: React.FC<TableRowProps> = ({
  user,
  id,
  paymentMethod,
  status,
  strikes,
  lastBooking,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  function getStatusColor(status: string) {
    switch (status) {
      case "Active":
        return "bg-[#4AEAB1]";
      case "Suspended":
        return "bg-[#d7ebfa]";
      case "Inactive":
        return "bg-[#fff178]";
      default:
        return "bg-stone-100";
    }
  }

  return (
    <tr
      className={`border rounded-xl ${isSelected ? "bg-gray-200" : "bg-white"}`}
    >
      <td className="p-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => setIsSelected(!isSelected)}
        />
      </td>
      <td className="p-2 flex items-center">
        <div className="rounded-full border-2 border-gray-200 mr-3 min-w-[30px]">
          <Image
            src={"/icons/profile-icon.png"}
            alt="profile-pic"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        {user}
      </td>
      <td className="p-2">#{id}</td>
      <td className="p-2">{paymentMethod}</td>
      <td className="p-2">
        <span
          className={`inline-block mt-0.5 text-black px-2.5 py-2 text-sm leading-none ${getStatusColor(
            status
          )} rounded-full`}
        >
          {status}
        </span>
      </td>
      <td className="p-2">{strikes}</td>
      <td className="p-2">{lastBooking}</td>
      <td className="p-2 text-center">
        <span className="cursor-pointer">
          <div
            className="h-[30px] flex items-center justify-center ml-6"
            role="button"
          >
            <Image src={"/icons/dots.svg"} alt="dots" width={4} height={4} />
          </div>
        </span>
      </td>
    </tr>
  );
};

const DataTable: React.FC<TableProps> = ({ data }) => {
  const [width] = useScreenDimensions();
  return (
    <div
      style={{
        width: "100%",
        overflowX: width < 768 ? "auto" : "hidden",
      }}
    >
      <table className="w-full">
        <thead className={`whitespace-nowrap ${width < 768 ? `bg-[#EFF2F5]` : "bg-[#fff]"}`}>
          <tr>
            <th className="px-2 py-3 text-left font-normal"></th>
            <th className="px-2 py-3 text-left font-normal">User</th>
            <th className="px-2 py-3 text-left font-normal">ID</th>
            <th className="px-2 py-3 text-left font-normal">Payment Method</th>
            <th className="px-2 py-3 text-left font-normal">Status</th>
            <th className="px-2 py-3 text-left font-normal">Strikes</th>
            <th className="px-2 py-3 text-left font-normal">Last Booking</th>
            <th className="px-2 py-3 text-left font-normal"></th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {data.map((rowData, index) => (
            <TableRow key={index} {...rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
