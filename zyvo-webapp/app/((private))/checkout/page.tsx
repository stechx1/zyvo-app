"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import Input from "@/components/Input";
import { InputSectionProps } from "@/types";
import { BookingDetailsType } from "../property-details/[id]/page";
import { useEffect, useState } from "react";
import { profileData } from "@/types/profile";
import { Place } from "@/types/place";
import { getPlaceSnapshot } from "@/firebase/place";
import { DocumentReference } from "firebase/firestore";
import { getUserByRef } from "@/firebase/user";
import HostProperties from "@/collections/HostProperties";
import { formatDate, formatTime, getFullName } from "@/lib/utils";
import { addUpdateBooking } from "@/firebase/booking";
import toast from "react-hot-toast";
import { Booking } from "@/types/booking";
import PropertySideDetails from "@/collections/PropertySideDetails";

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

const CheckoutPage = ({ searchParams }: { searchParams: { data: string } }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [place, setPlace] = useState<Place | null>(null);
  const [placeUser, setPlaceUser] = useState<null | profileData>();
  const [isLoading, setIsLoading] = useState(false);
  const details = JSON.parse(searchParams.data) as BookingDetailsType;

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (!searchParams.data) {
      router.back();
    }
    const unsubscribe = getPlaceSnapshot(
      details.placeId,
      (place) => {
        setPlace(place);
        if (place.sender) getUser(place.sender);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setPlaceUser(result);
    }
  };
  const bookingDetails = [
    {
      icon: "/icons/clock-icon.svg",
      iconAlt: "clock-icon",
      label: `${details.hours} Hour${details.hours > 1 ? "s" : ""}`,
      edit: false,
      id: 1,
    },
    {
      icon: "/icons/calendar-icon.svg",
      iconAlt: "calendar-icon",
      label: formatDate(details.date),
      edit: false,
      id: 2,
    },
    {
      icon: "/icons/clock-icon.svg",
      iconAlt: "clock-icon",
      label: `From ${formatTime(details.from)} to ${formatTime(details.to)}`,
      edit: false,
      id: 3,
    },
  ];

  const accordionItems: AccordionItem[] = [
    {
      value: "parking",
      title: "Parking",
      icon: "/icons/gray-car-icon.svg",
      content: place?.parkingRules ?? "No parking rules defined!",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: place?.hostRules ?? "No host rules defined!",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const getImagesOnIndex = (index: number) => {
    if (place?.images?.length && place?.images?.length > index) {
      return place?.images[index];
    }
    return "/images/no-image.jpg";
  };
  const onSubmitHandler = () => {
    if (!user) return;
    setIsLoading(true);
    const booking: Booking = {
      bookingId: "",
      date: new Date(details.date),
      from: details.from,
      to: details.to,
      hours: details.hours,
    };
    addUpdateBooking(booking, user?.userId, details.placeId).then(
      ({ result, error }) => {
        if (error) {
          toast.error("error booking property!");
        } else {
          router.push("confirmation/" + result);
        }
        setIsLoading(false);
      }
    );
  };
  return (
    <>
      <div className="flex sm:container sm:my-24 sm:px-14 md:px-10 sm:gap-2 flex-col">
        <div className="sm:flex sm:gap-10">
          <div className="text-black text-lg sm:hidden font-normal font-Poppins">
            Checkout and Pay
          </div>
          <div className="sm:hidden h-[0.5px] mt-[10px] mb-[25px] opacity-[0.20] bg-secondary-gray-700"></div>
          <div className=" w-full sm:w-[30%] sm:order-2">
            <div className="flex flex-col gap-5">
              {placeUser && (
                <HostProperties
                  photoURL={placeUser?.photoURL ?? ""}
                  fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
                  buttonText="Message the host"
                  onClick={() => {
                    router.push("/messages?userId=" + placeUser?.userId);
                  }}
                />
              )}
              {place && (
                <PropertySideDetails
                  imageURL={getImagesOnIndex(0)}
                  price={place.pricePerHour * details.hours}
                  description={place.description}
                  hours={details.hours}
                />
              )}
            </div>
          </div>
          {/* =================================Left Section=================================== */}

          <div className="w-full sm:w-[70%] sm:order-1">
            <div className="flex flex-col sm:gap-3">
              <div className="flex flex-row items-center">
                <div
                  role="button"
                  onClick={() => {
                    router.push("/");
                  }}
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
                  <div
                    className={`border border-neutral-200 rounded-full py-2 px-3 gap-3 w-fit flex items-center`}
                    key={tag.id}
                  >
                    <Image
                      src={tag.icon}
                      alt={tag.iconAlt}
                      width={20}
                      height={20}
                      className="w-[15px]"
                    />
                    <div className="text-black text-[13px] sm:text-lg font-normal whitespace-nowrap">
                      {tag.label}
                    </div>
                    {tag.edit && (
                      <div role="button" onClick={() => {}}>
                        <Image
                          src="/icons/pen-icon.svg"
                          alt="pen-icon"
                          width={30}
                          height={30}
                          className="cursor-pointer w-[20px]"
                        />
                      </div>
                    )}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only...
                </div>
              </div>
            </div>
            <p className="text-primary-emerald-300 text-[15px] sm:text-lg mt-4 hover:underline cursor-pointer w-fit">
              Read more...
            </p>
            <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>

            {/* ================================= Rules Accordion=================================== */}
            <div className="flex-col flex gap-2 sm:gap-7">
              <p className="hidden sm:block font-Poppins text-2xl font-medium">
                Rules
              </p>
              <p className="sm:hidden font-Poppins text-lg font-medium">
                Included in your booking
              </p>
              <div className="w-full">
                <Accordion items={accordionItems} />
              </div>
            </div>
            <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>
            <div className="w-fit flex gap-1">
              <Button
                className="px-8"
                text="Confirm & Pay"
                onClick={onSubmitHandler}
                type="green"
                roundedfull
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;