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
}: {
  hours: number;
  price: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  availableMonths: number[];
  availableDays: number[];
  onCheckOutClick: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <div className="w-[320px] p-5 text-center">
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
      {selectedTab === 1 && (
        <Tab1
          hours={hours}
          setHours={setHours}
          price={price}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === 2 && (
        <Tab2
          availableMonths={availableMonths}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onCheckOutClick={onCheckOutClick}
          availableDays={availableDays}
        />
      )}
    </div>
  );
}
const Tab1 = ({
  hours,
  setHours,
  price,
  setSelectedTab,
}: {
  hours: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  price: number;
}) => {
  return (
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
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
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
      <div className="mt-3 text-gray-600">Cancel for free within 24 hours</div>
    </>
  );
};
const Tab2 = ({
  availableMonths,
  availableDays,
  selectedDate,
  setSelectedDate,
  onCheckOutClick,
}: {
  onCheckOutClick: () => void;
  availableMonths: number[];
  availableDays: number[];
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  function disabledDays(date: Date) {
    const targetMonth = getMonth(date);
    const targetWeekday = getDay(date);

    const isMonthDisabled = !availableMonths.includes(targetMonth);
    const isDayDisabled = !availableDays.includes(targetWeekday);
    const isPast = differenceInCalendarDays(date, new Date()) < 0;
    return isPast || isMonthDisabled || isDayDisabled;
  }
  return (
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
          options={timeArray}
          value={""}
          onValueChange={(value) => {
            // setPlace((prev) => {
            //   return { ...prev, availableHoursFrom: value };
            // });
          }}
          roundedFull
        />
        <CustomSelect
          icon="/icons/clock-icon.svg"
          options={timeArray}
          value={""}
          onValueChange={(value) => {
            // setPlace((prev) => {
            //   return { ...prev, availableHoursFrom: value };
            // });
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
      <div className="mt-3 text-gray-600">Cancel for free within 24 hours</div>
    </>
  );
};
