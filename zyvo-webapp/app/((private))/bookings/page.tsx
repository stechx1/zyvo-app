"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getMyBookingsSnapshot } from "@/firebase/booking";
import { Booking } from "@/types/booking";
import { getPlaceByRef } from "@/firebase/place";
import { DocumentReference } from "firebase/firestore";
import { Place } from "@/types/place";
import { formatDate, formatTime, getFullName } from "@/lib/utils";
import HostProperties from "@/collections/HostProperties";
import PropertySideDetails from "@/collections/PropertySideDetails";
import { profileData } from "@/types/profile";
import { getUserByRef } from "@/firebase/user";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";

export default function Bookings() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [selectedBookingPlace, setSelectedBookingPlace] = useState<Place>();
  const [selectedBookingPlaceUser, setSelectedBookingPlaceUser] =
    useState<profileData>();
  const [places, setPlaces] = useState<Place[]>([]);
  function getStatusColor(status: string) {
    switch (status) {
      case "Finished":
        return "bg-[#4AEAB1]";
      case "Confirmed":
        return "bg-[#85d6ff]";
      case "Waiting payment":
        return "bg-[#fff178]";
      default:
        return "bg-stone-100";
    }
  }
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    const unsubscribe = getMyBookingsSnapshot(
      user.userId,
      (bookings) => {
        setBookings(bookings);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach((booking) => {
        if (booking.place)
          getPlaceByRef(booking.place).then(({ result }) => {
            if (result) {
              setPlaces((prev) => {
                if (prev.find((p) => p.placeId === result.placeId)) return prev;
                return [...prev, result];
              });
            }
          });
      });
      selectBooking(bookings[0].bookingId);
    }
  }, [bookings]);

  useEffect(() => {
    if (selectedBooking && places.length > 0) {
      const place = places.find(
        (p) => p.placeId === selectedBooking?.place?.id
      );
      setSelectedBookingPlace(place);
      if (place?.sender) getUser(place.sender);
    }
  }, [places, selectedBooking]);

  const selectBooking = (id: string) => {
    if (!selectedBooking) {
      setSelectedBooking(bookings[0]);
    }
  };

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setSelectedBookingPlaceUser(result);
    }
  };
  const rulesOptions = [
    { label: "Parking", value: "Parking" },
    { label: "Food", value: "Food" },
    { label: "System", value: "System" },
  ];

  const hotRulesOptions = [
    { label: "Host rules", value: "Host rules" },
    { label: "option b", value: "option b" },
  ];
  const getPlace = (places: Place[], id: string) => {
    return places.find((p) => p.placeId === id);
  };

  const getPlaceImage = (placeRef?: DocumentReference) => {
    const id = placeRef?.id ?? "";
    const place = getPlace(places, id);
    if (place && place.images?.length > 0) {
      return place.images[0];
    } else return "/images/no-image.jpg";
  };
  const getImagesOnIndex = (index: number) => {
    if (selectedBookingPlace) {
      if (
        selectedBookingPlace?.images?.length &&
        selectedBookingPlace?.images?.length > index
      ) {
        return selectedBookingPlace?.images[index];
      }
    }
    return "/images/no-image.jpg";
  };
  const bookingDetails = selectedBooking
    ? [
        {
          icon: "/icons/clock-icon.svg",
          iconAlt: "clock-icon",
          label: `${selectedBooking?.hours} Hour${
            selectedBooking?.hours > 1 ? "s" : ""
          }`,
          edit: false,
          id: 1,
        },
        {
          icon: "/icons/calendar-icon.svg",
          iconAlt: "calendar-icon",
          label: formatDate(selectedBooking?.date.toISOString()),
          edit: false,
          id: 2,
        },
        {
          icon: "/icons/clock-icon.svg",
          iconAlt: "clock-icon",
          label: `From ${formatTime(selectedBooking?.from)} to ${formatTime(
            selectedBooking?.to
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
      content:
        selectedBookingPlace?.parkingRules ?? "No parking rules defined!",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: selectedBookingPlace?.hostRules ?? "No host rules defined!",
    },
  ];
  return (
    <div className="flex justify-between space-x-4">
      <div className="w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-lg">All Bookings</div>
            <Image src={"/icons/down.svg"} alt="down" width={13} height={13} />
          </div>
          <div className="me-1">
            <Image
              src={"/icons/search.svg"}
              alt="search"
              width={18}
              height={18}
            />
          </div>
        </div>
        {bookings.map((booking) => {
          return (
            <div
              key={booking.bookingId}
              className="flex mt-4 border px-2 py-2 rounded-xl"
              role="button"
            >
              <Image
                src={getPlaceImage(booking.place)}
                alt="image"
                width={95}
                height={95}
                className="rounded-xl object-cover"
              />
              <div className="ml-4">
                <div className="text-lg">
                  {getPlace(places, booking.place?.id ?? "")?.description}
                </div>
                <div className="text-[#A4A4A4]">
                  {formatDate(booking.date.toISOString())}
                </div>
                <span
                  className={`inline-block mt-0.5 text-black px-2.5 py-2 text-sm leading-none ${getStatusColor(
                    "Confirmed"
                  )} rounded-full`}
                >
                  {"Confirmed"}
                </span>
              </div>
              <div
                className="h-[30px] flex items-center justify-center ml-6"
                role="button"
              >
                <Image
                  src={"/icons/dots.svg"}
                  alt="dots"
                  width={4}
                  height={4}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/******Booking Details*******/}
      <div className="w-[100%] sm:w-[60%] lg:w-[50%] sm:flex flex-col border rounded-lg">
        {selectedBooking ? (
          <div>
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-3">
                <div>
                  {getPlace(places, selectedBooking.place?.id ?? "")
                    ?.description ?? "-"}
                </div>
                <span className="bg-[#4AEAB1] text-black px-2 py-1 rounded-full text-sm">
                  Finished
                </span>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="flex space-x-2 text-sm">
                    <Image
                      src={"/icons/Share.svg"}
                      alt="share-icon"
                      width={17}
                      height={17}
                    />
                    <span>Share</span>
                    <Image
                      src={"/icons/heart.png"}
                      alt="favourite-icon"
                      width={25.59}
                      height={25}
                    />
                    <span>Favorite</span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" gap-2 px-4">
              <div className="flex space-x-4 w-full">
                <Image
                  src={getImagesOnIndex(0)}
                  alt="detail-image"
                  className=" w-3/5 md:w-1/2 h-auto rounded-tl-[20px] rounded-bl-[20px]"
                  width={200}
                  height={470}
                />
                <div className="hidden md:flex md:flex-col md:w-1/4 md:gap-4">
                  <Image
                    src={getImagesOnIndex(1)}
                    alt="detail-image"
                    className="w-full h-1/2"
                    width={200}
                    height={470}
                  />
                  <Image
                    src={getImagesOnIndex(2)}
                    alt="detail-image"
                    className="w-full h-1/2"
                    width={200}
                    height={470}
                  />
                </div>
                <div className="flex flex-col  w-2/5 md:w-1/4 gap-4">
                  <Image
                    src={getImagesOnIndex(3)}
                    alt="detail-image"
                    className="w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
                    width={200}
                    height={470}
                  />
                  <Image
                    src={getImagesOnIndex(4)}
                    alt="detail-image"
                    className="w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
                    width={200}
                    height={470}
                  />
                </div>
              </div>
            </div>
            <hr className="my-9" />
            <div className="px-5">
              <label>Booking Details</label>
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
                    <div className="text-black text-[13px] sm:text-md font-normal whitespace-nowrap">
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
            </div>
            <hr className="my-9" />
            <div className="px-5">
              <label>Included in your booking</label>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {selectedBookingPlace?.ameneties.map((am) => {
                  return (
                    <div
                      className={`flex items-center py-2 border rounded-full bg-[#fff] px-4`}
                    >
                      <div className="capitalize">{am.toLowerCase()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr className="my-9" />
            <div className="px-5">
              <label>Rules</label>
              <div className="w-full">
                <Accordion items={accordionItems} />
              </div>
            </div>
            <hr className="my-9" />
            <div className="px-5">
              <label>Address & Location</label>
              <div>
                <u>Midtown Manhattan, New York, NY</u>
              </div>
              <div className="mt-3">
                <Image
                  src={"/images/mapImage.png"}
                  alt="favourite-icon"
                  width={200}
                  height={200}
                  className="object-contain w-full h-full rounded-l-xl"
                />
              </div>
            </div>
            <hr className="my-9" />
            <div className="px-5">
              <label>Reviews</label>
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  <Image
                    src={"/icons/starIcon.svg"}
                    alt="star-icon"
                    width={15}
                    height={15}
                  />
                  <div className="ml-1">
                    <span className="text-[#FCA800]">
                      4.9 <span className="text-black"> 30 reviews</span>
                    </span>
                  </div>
                </div>
                <div>Sort by: Recent Reviews</div>
              </div>
              {Array.from({ length: 4 }, (_, i) => (
                <React.Fragment key={i}>
                  <div className="flex justify-between py-2">
                    <div className="flex px-2 space-x-2">
                      <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                        <Image
                          src={"/icons/profile-icon.png"}
                          alt="profile-pic"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <label>Emily James</label>
                        <div>Host was very helpful. thank you so much</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Image
                            key={index}
                            src={"/icons/starIcon.svg"}
                            alt="star-icon"
                            width={15}
                            height={15}
                          />
                        ))}
                      </div>
                      <div>Mar 09, 22</div>
                    </div>
                  </div>
                  <hr className="my-3" />
                </React.Fragment>
              ))}
              <div className="text-center my-5">
                <Button
                  roundedfull
                  className="border-gray-700"
                  bordered
                  type="white"
                  text="Show More Reviews"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[100%]">
            No Booking!
          </div>
        )}
      </div>

      {/****** Right side details ******/}
      <div className="hidden lg:block lg:w-[25%] space-y-4">
        {selectedBookingPlaceUser && (
          <HostProperties
            photoURL={selectedBookingPlaceUser?.photoURL ?? ""}
            fullName={
              selectedBookingPlaceUser
                ? getFullName(selectedBookingPlaceUser) ?? ""
                : ""
            }
            buttonText="Message the host"
            onClick={() => {
              router.push(
                "/messages?userId=" + selectedBookingPlaceUser?.userId
              );
            }}
          />
        )}
        {selectedBookingPlace && selectedBooking && (
          <PropertySideDetails
            imageURL={getImagesOnIndex(0)}
            price={selectedBookingPlace.pricePerHour * selectedBooking.hours}
            description={selectedBookingPlace.description}
            hours={selectedBooking.hours}
          />
        )}
      </div>
    </div>
  );
}
