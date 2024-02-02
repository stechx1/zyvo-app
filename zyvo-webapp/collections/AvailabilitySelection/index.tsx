import CircularSlider from "@fseehawer/react-circular-slider";
import React, { useState } from "react";
import { Tabs } from "../../components/Tabs";
import CustomSelect from "../../components/SelectDropDown";
import Button from "../../components/Button";
import { Calendar } from "@/components/ui/calendar";
import { timeArray } from "@/lib/utils";
import { getMonth, differenceInCalendarDays, getDay } from "date-fns";

export default function AvailabilitySelection({
  hours,
  price,
  setHours,
  selectedDate,
  setSelectedDate,
  availableMonths,
  availableDays,
  onCheckOutClick,
  availableHoursFrom,
  availableHoursTo,
  setSelectedAvailableHoursFrom,
  setSelectedAvailableHoursTo,
  selectedAvailableHoursFrom,
  selectedAvailableHoursTo,
}: {
  hours: number;
  price: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  availableMonths: number[];
  availableDays: number[];
  onCheckOutClick: () => void;
  availableHoursFrom?: string;
  availableHoursTo?: string;
  selectedAvailableHoursFrom?: string;
  selectedAvailableHoursTo?: string;
  setSelectedAvailableHoursTo: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSelectedAvailableHoursFrom: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) {
  const [selectedTab, setSelectedTab] = useState(1);
  function disabledDays(date: Date) {
    const targetMonth = getMonth(date);
    const targetWeekday = getDay(date);

    const isMonthDisabled = !availableMonths.includes(targetMonth);
    const isDayDisabled = !availableDays.includes(targetWeekday);
    const isPast = differenceInCalendarDays(date, new Date()) < 0;
    return isPast || isMonthDisabled || isDayDisabled;
  }
  const availableHoursFromIndex = timeArray.findIndex(
    (t) => t.value === availableHoursFrom
  );
  const availableHoursToIndex = timeArray.findIndex(
    (t) => t.value === availableHoursTo
  );
  return (
    <div className="p-5 text-center">
      <Tabs
        options={[
          { name: "Choose Hours", value: 1 },
          { name: "Choose Days", value: 2 },
        ]}
        selected={selectedTab}
        onSelect={(option) => {
          setSelectedTab(+option.value);
        }}
      />
      {/* ================================================== Tab1 ============================================== */}
      {selectedTab === 1 && (
        <>
          <div className="mt-4">
            <CircularSlider
              width={200}
              label="Hours"
              labelFontSize="20px"
              labelColor="#005a58"
              knobColor="#fff"
              knobSize={30}
              progressColorFrom="#4AEAB1"
              progressColorTo="#4AEAB1"
              progressSize={30}
              trackColor="#eeeeee"
              trackSize={30}
              data={[
                2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24,
              ]}
              min={2}
              dataIndex={hours - 1}
              onChange={(value: number) => {
                setHours(value);
              }}
            />
          </div>
          <hr />
          <div className="flex justify-center space-x-2 my-4">
            <Button
              className="pe-8"
              type="white"
              text={hours + " hour"}
              roundedfull
              bordered
              icon="/icons/clock-icon.svg"
              full
            />
            <Button
              className="pe-8"
              type="white"
              text={"$" + price * hours}
              roundedfull
              bordered
              icon="/icons/dollar-icon.svg"
              full
            />
          </div>
          <div className="fle justify-cente">
            <Button
              type="green"
              text="Start Booking"
              roundedfull
              bordered
              full
              onClick={() => setSelectedTab(2)}
            />
          </div>
          <div className="mt-3 text-gray-600">
            Cancel for free within 24 hours
          </div>
        </>
      )}
      {/* ================================================== Tab2 ============================================== */}
      {selectedTab === 2 && (
        <>
          <div className="mb-4 align-middle">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              fixedWeeks
            />
          </div>
          <hr />
          <div className="flex justify-center space-x-2 my-4">
            <CustomSelect
              icon={"/icons/clock-icon.svg"}
              options={timeArray.slice(
                availableHoursFromIndex,
                availableHoursToIndex
              )}
              value={selectedAvailableHoursFrom ?? ""}
              onValueChange={(value) => {
                setSelectedAvailableHoursFrom(value);
              }}
              roundedFull
            />
            <CustomSelect
              icon="/icons/clock-icon.svg"
              options={timeArray.slice(
                availableHoursFromIndex,
                availableHoursToIndex
              )}
              value={selectedAvailableHoursTo ?? ""}
              onValueChange={(value) => {
                setSelectedAvailableHoursTo(value);
              }}
              roundedFull
            />
          </div>
          <div className="fle justify-cente">
            <Button
              type="green"
              text="Proceed to Checkout"
              roundedfull
              bordered
              full
              onClick={onCheckOutClick}
            />
          </div>
          <div className="mt-3 text-gray-600">
            Cancel for free within 24 hours
          </div>
        </>
      )}
    </div>
  );
}
