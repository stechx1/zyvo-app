"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { getBookingSnapshot } from "@/firebase/booking";
import { Booking } from "@/types/booking";
import { DocumentReference } from "firebase/firestore";
import { getUserByRef } from "@/firebase/user";
import { User } from "@/types/profile";
import HostProperties from "@/collections/HostProperties";
import { formatDate, formatTime, getFullName } from "@/lib/utils";
import { Place } from "@/types/place";
import { getPlaceByRef } from "@/firebase/place";
import PropertySideDetails from "@/collections/PropertySideDetails";

const ConfirmationPage = ({ params }: { params: { id: string } }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [placeUser, setPlaceUser] = useState<null | User>();
  const [bookingPlace, setBookingPlace] = useState<null | Place>();

  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    const unsubscribe = getBookingSnapshot(
      params.id,
      (booking) => {
        setBooking(booking);
        if (booking.placeRef) getPlace(booking.placeRef);
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
  const getPlace = async (place: DocumentReference) => {
    const { result } = await getPlaceByRef(place);
    if (result) {
      setBookingPlace(result);
      if (result.userRef) getUser(result.userRef);
    }
  };
  const bookingDetails = booking
    ? [
        {
          icon: "/icons/clock-icon.svg",
          iconAlt: "clock-icon",
          label: `${booking.hours} Hour${booking.hours > 1 ? "s" : ""}`,
          edit: false,
          id: 1,
        },
        {
          icon: "/icons/calendar-icon.svg",
          iconAlt: "calendar-icon",
          label: formatDate(booking.date.toISOString()),
          edit: false,
          id: 2,
        },
        {
          icon: "/icons/clock-icon.svg",
          iconAlt: "clock-icon",
          label: `From ${formatTime(booking.from)} to ${formatTime(
            booking.to
          )}`,
          edit: false,
          id: 3,
        },
      ]
    : [];

  const accordionItems: AccordionItem[] = [
    {
      value: "parking",
      title: "Parking",
      icon: "/icons/gray-car-icon.svg",
      content: bookingPlace?.parkingRules ?? "No parking rules defined!",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: bookingPlace?.hostRules ?? "No host rules defined!",
    },
  ];

  const getImagesOnIndex = (index: number) => {
    if (bookingPlace?.images?.length && bookingPlace?.images?.length > index) {
      return bookingPlace?.images[index];
    }
    return "/images/no-image.jpg";
  };
  return (
    <>
      <div className="flex sm:container sm:my-24 sm:px-14 md:px-10 sm:gap-2 flex-col">
        <div className="sm:flex sm:gap-10">
          <div className="text-black text-lg sm:hidden font-normal font-Poppins">
            New Booking Confirmed
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
              {bookingPlace && booking && (
                <PropertySideDetails
                  rating={bookingPlace.rating}
                  reviewsCount={bookingPlace.reviewsCount}
                  imageURL={getImagesOnIndex(0)}
                  price={bookingPlace.pricePerHour * booking.hours}
                  description={bookingPlace.description}
                  hours={booking.hours}
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
                  New Booking Confirmed
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
                  </div>
                ))}
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
                text="My Bookings"
                onClick={() => router.push("/bookings")}
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

export default ConfirmationPage;
