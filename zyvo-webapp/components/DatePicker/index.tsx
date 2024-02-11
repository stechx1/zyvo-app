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
      year = sortedDates[0].toLocaleString("en-US", { year: "numeric" });
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
        className="border border-neutral-200 rounded-full py-2 px-3 w-[200px] sm:w-[300px] flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-row gap-1 sm:gap-3">
          <Image
            src="/icons/gray-calendar-icon.svg"
            alt="gray-calendar-icon"
            width={30}
            height={30}
            className="sm:w-[30px] w-[20px]"
          />
          <div className="text-black text-[13px] sm:text-lg font-normal font-Poppins">
            {getDatesText()}
          </div>
        </div>
        <div className="mr-0">
          <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
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
