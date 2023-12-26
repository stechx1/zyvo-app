"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import Input from "@/components/Input";
import { InputSectionProps } from "@/types";

const InputSection: React.FC<InputSectionProps> = ({
  title,
  inputName,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <>
    <Input
      name={inputName}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </>
);

const CheckoutPage = () => {

  const bookingDetails = [
    {
      icon: "/icons/clock-icon.svg",
      iconAlt: "clock-icon",
      label: "2 Hours",
      edit: true,
      id: 1,
    },
    {
      icon: "/icons/calendar-icon.svg",
      iconAlt: "calendar-icon",
      label: "October 22, 2023",
      edit: true,
      id: 2,
    },
    {
      icon: "/icons/clock-icon.svg",
      iconAlt: "clock-icon",
      label: "From 01pm to 03pm",
      edit: true,
      id: 3,
    },
  ];

  const costDetails = [
    {
      detail: "2 Hours",
      cost: "$300",
      id: 1,
    },
    {
      detail: "Zyvo Service Fee",
      cost: "$2",
      id: 2,
    },
    {
      detail: "Cleaning Fee",
      cost: "$20",
      id: 3,
    },
    {
      detail: "Taxes",
      cost: "$10",
      id: 4,
    },
  ];

  const accordionItems: AccordionItem[] = [
    {
      value: "parking",
      title: "Parking",
      icon: "/icons/gray-car-icon.svg",
      content: "Content for Parking accordion.",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: "Content for Host Rules accordion.",
    },
  ];

  const paymentMethods: AccordionItem[] = [
    {
      value: "months",
      title: "Month:",
      icon: "",
      content: "Content for Months.",
    },
    {
      value: "year",
      title: "Year:",
      icon: "",
      content: "Content for Years.",
    },
  ];

  const router = useRouter();
  const { user } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setAccountSettings((prev) => {
    //   return { ...prev, [name]: value };
    // });
  };

  return (
    <>
      <div className='flex sm:container sm:my-24 sm:px-14 md:px-10 sm:gap-2 flex-col'>

        <div className="sm:flex sm:gap-10">
          <div className="text-black text-lg sm:hidden font-normal font-Poppins">
            Checkout and Pay
          </div>
          <div className="sm:hidden h-[0.5px] mt-[10px] mb-[25px] opacity-[0.20] bg-secondary-gray-700"></div>
          <div className=" w-full sm:w-[30%] sm:order-2">
            <div className="flex flex-col gap-5">
              <div className="flex sm:flex-col sm:order-2 border rounded-lg p-3 sm:p-4 text-center ">
                <div className="flex flex-col basis-2/5 text-left">
                  <div className="text-black text-sm sm:text-base font-normal font-Poppins">Hosted By</div>
                  <div className="flex items-center justify-center py-2 space-x-1 sm:space-x-2 space-y-2">
                    <div className="rounded-full border-2 border-gray-200 p-[2px]">
                      <Image
                        src={"/icons/profile-icon.png"}
                        alt="profile-pic"
                        width={35}
                        height={35}
                        className="rounded-full w-[27px] h-[27]"
                      />
                    </div>
                    <div className="text-black text-base sm:text-lg font-normal font-Poppins">Mia J.</div>
                      <Image
                        src={"/icons/green-tick.svg"}
                        alt="tick"
                        width={20}
                        height={20}
                        className="w-[15px]"
                      />
                  </div>
                </div>
                <div className="hidden sm:block h-[0.5px] my-[15px] opacity-[0.20] bg-secondary-gray-700"></div>
                <div className="sm:hidden w-[0.5px] mx-[15px] opacity-[0.20] bg-secondary-gray-700"></div>
                <div className="flex flex-col basis-3/5 justify-center items-center">
                  <div className="sm:order-2 flex items-center justify-center space-x-2">
                    <Image src={"/icons/time.svg"} alt="time" width={15} height={15} />
                    <div className="sm:hidden text-black text-[13px] font-normal font-Poppins ">Responds within 1 hr</div>
                    <div className="hidden sm:block text-black text-[14px] font-normal font-Poppins ">Typically responds within 1 hr</div>
                  </div>
                  <Button
                    type="white"
                    text="Message the host"
                    bordered
                    rounded
                    full
                    className="sm:order-1 border-gray-700 text-black text-[15px] font-normal px-2 py-1 whitespace-nowrap font-Poppins my-[8px]"
                  />
                </div>

              </div>
              <div className=" sm:order-1 border rounded-lg w-full">
                <div className="flex m-3 gap-4">
                  <div className="w-[30%]">
                    <Image
                      src={"/images/dummyImage-1.png"}
                      alt="detail-image"
                      className="rounded-[15px] w-full h-full"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col w-[70%]">
                    <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
                      Cabin in Peshastin
                    </div>
                    <div className="flex space-x-2">
                      <p className="flex items-center text-[10px] text-base sm:text-[14px] text-primary-amber-500 mr-0 font-Poppins">
                        <Image
                          src={"/icons/orange-star-icon.svg"}
                          alt="star-icon"
                          width={14}
                          height={14}
                          className="mr-1"
                        />
                        {"5.0"}
                      </p>
                      <p className=" sm:text-[14px] text-[10px] text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${1}k+)`}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Image
                        src={"/icons/gray-location-icon.svg"}
                        alt="location-icon"
                        width={14}
                        height={14}
                      />
                      <p className=" sm:text-[14px] text-[10px] text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins whitespace-nowrap">{`37 miles away`}</p>
                    </div>
                  </div>
                </div>
                <div className="h-[0.5px] m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
                {costDetails.map((item) => (
                  <div className={`flex flex-row justify-between my-[10px] mx-[20px]`} key={item.id}>
                    <div className="text-black text-base font-normal font-Poppins whitespace-nowrap">{item.detail}</div>
                    <div className="text-black text-base font-normal font-Poppins  whitespace-nowrap">{item.cost}</div>
                  </div>
                ))}
                <div className="h-[0.5px] m-[20px] opacity-[0.20] bg-secondary-gray-700"></div>
                <div className={`flex flex-row justify-between my-[10px] mx-[20px]`}>
                  <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">Total</div>
                  <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">$322</div>
                </div>

              </div>


            </div>
          </div>
          {/* =================================Left Section=================================== */}

          <div className="w-full sm:w-[70%] sm:order-1" >
            <div className="flex flex-col sm:gap-3">
              <div className="flex flex-row items-center">
                <div
                  role="button"
                  onClick={() => { }}
                  className="hidden sm:block"
                >
                  <Image
                    src="/icons/back-arrow.svg"
                    alt="back-arrow"
                    width={35}
                    height={35}
                    className="cursor-pointer mr-3"
                  />
                </div>
                <div className="hidden sm:block text-black text-lg sm:text-4xl font-normal font-Poppins">
                  Checkout and Pay
                </div>
              </div>
              <div className=" h-[0.5px] my-6 sm:mb-[50px] opacity-[0.20] bg-secondary-gray-700"></div>
              {/* =================================Booking Details=================================== */}
              <div className="text-black text-lg sm:text-2xl font-normal font-Poppins">
                Booking Details
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                {bookingDetails.map((tag) => (
                  <div className={`border border-neutral-200 rounded-full py-2 px-3 gap-3 w-fit flex items-center`} key={tag.id}>
                    <Image
                      src={tag.icon}
                      alt={tag.iconAlt}
                      width={20}
                      height={20}
                      className="w-[15px]"
                    />
                    <div className="text-black text-[13px] sm:text-lg font-normal whitespace-nowrap">{tag.label}</div>
                    <div
                      role="button"
                      onClick={() => { }}
                    >
                      <Image
                        src="/icons/pen-icon.svg"
                        alt="pen-icon"
                        width={30}
                        height={30}
                        className="cursor-pointer w-[20px]"
                      />
                    </div>
                  </div>
                ))}

              </div>
              <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
              {/* ================================= Payment Method=================================== */}

              <div className="flex-col flex gap-2 sm:gap-7">
                <div className="flex flex-row justify-between">
                  <p className="font-Poppins text-lg sm:text-2xl font-medium">
                    Payment Method
                  </p>
                  <div className="flex space-x-1">
                    <Image
                      src="/icons/amex-icon.svg"
                      alt="visa-card-icon"
                      width={40}
                      height={40}
                      className="w-[30px]"
                    />
                    <Image
                      src="/icons/pay-icon.svg"
                      alt="visa-card-icon"
                      width={40}
                      height={40}
                      className="w-[30px]"
                    />
                    <Image
                      src="/icons/master-card-icon.svg"
                      alt="visa-card-icon"
                      width={40}
                      height={40}
                      className="w-[30px]"
                    />
                    <Image
                      src="/icons/visa-card-icon.svg"
                      alt="visa-card-icon"
                      width={40}
                      height={40}
                      className="w-[30px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-[100%]">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4">
                    <InputSection
                      title="Card Name"
                      inputName="cardName"
                      type="lock"
                      value={""}
                      placeholder="Card Name:"
                      onChange={handleChange}
                    />
                    <InputSection
                      title="Card Number"
                      inputName="cardNumber"
                      type="lock"
                      value={""}
                      placeholder="Card number:"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-4">
                    <InputSection
                      title="Security code"
                      inputName="securityCode"
                      type="lock"
                      value={""}
                      placeholder="Security code:"
                      onChange={handleChange}
                    />
                    <div className="flex flex-row justify-between md:gap-4 gap-4">
                      <InputSection
                        title="Month"
                        inputName="month"
                        type="year"
                        value={""}
                        placeholder="Month:"
                        onChange={handleChange}
                      />
                      <InputSection
                        title="Year"
                        inputName="year"
                        type="year"
                        value={""}
                        placeholder="Year:"
                        onChange={handleChange}
                      />

                    </div>
                  </div>

                </div>
              </div>
              <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
              <div className="text-black text-lg sm:text-2xl font-normal font-Poppins">
                Refund Policies
              </div>
              <div className={` rounded-3xl `}>
                <div className="text-black text-sm sm:text-lg font-normal">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a galley
                  of type and scrambled it to make a type specimen book. It has
                  survived not only...
                </div>
              </div>
            </div>
            <p className="text-primary-emerald-300 text-[15px] sm:text-lg mt-4 hover:underline cursor-pointer w-fit">
              Read more...
            </p>
            <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>

            {/* ================================= Rules Accordion=================================== */}
            <div className="flex-col flex gap-2 sm:gap-7">
              <p className="hidden sm:block font-Poppins text-2xl font-medium">Rules</p>
              <p className="sm:hidden font-Poppins text-lg font-medium">Included in your booking</p>
              <div className="w-full">
                <Accordion items={accordionItems} />
              </div>
            </div>
            <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>
            <div className="w-fit flex gap-1">
              <Button
                className="px-8"
                text="Confirm & Pay"
                // onClick={}
                type="green"
                roundedfull
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
