import React, { Dispatch, SetStateAction, useState } from "react";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import { Calendar } from "../ui/calendar";
import Image from "next/image";

export default function DatePicker({
  selectedDates,
  setSelectedDates,
}: {
  selectedDates?: Date[];
  setSelectedDates: Dispatch<SetStateAction<Date[] | undefined>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const getDatesText = () => {
    if (selectedDates && selectedDates?.length > 0) {
      const sortedDates = selectedDates.sort(
        (a, b) => a.getTime() - b.getTime()
      );
      let first = "";
      let second = "";
      let year = "";
      first = sortedDates[0].toLocaleString("en-US", { month: "short" });
      first += " " + sortedDates[0].getDate();
      year = sortedDates[0].toLocaleString("en-US", { year: "numeric" })+" (EST)";
      if (sortedDates.length == 1) {
        return first + " " + year;
      } else {
        second = sortedDates[sortedDates.length - 1].toLocaleString("en-US", {
          month: "short",
        });
        second += " " + sortedDates[sortedDates.length - 1].getDate();
        return first + " - " + second + " " + year;
      }
    } else return "Select dates";
  };

  return (
    <div>
      <div
        className="border border-neutral-200 space-x-2 rounded-full py-2 px-3 w-max sm:w-max flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-row gap-1 sm:gap-3">
          <Image
            src="/icons/gray-calendar-icon.svg"
            alt="gray-calendar-icon"
            width={30}
            height={30}
            className="sm:w-[30px] w-[15px]"
          />
          <div className="text-black mt-0.5 text-[10px] sm:text-lg font-bold font-Poppins">
            {getDatesText()}
          </div>
        </div>
        <div className="mr-0">
          <Image src={"/icons/down.svg"} className="sm:w-[13px] sm:h-[13px]" alt="down" width={10} height={10} />
        </div>
      </div>
      <CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <Calendar
          mode="multiple"
          selected={selectedDates ?? []}
          onSelect={setSelectedDates}
          fixedWeeks
        />
      </CustomDropdown>
    </div>
  );
}
