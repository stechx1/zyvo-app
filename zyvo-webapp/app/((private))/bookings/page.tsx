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
import { User } from "@/types/profile";
import { getUserByRef } from "@/firebase/user";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import { getReviewsSnapshot } from "@/firebase/reviews";
import { Review } from "@/types/review";
import { CustomDialog } from "@/components/Dialog";
import ReviewModal from "@/collections/ReviewModal";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";

export default function Bookings() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>();
  const [selectedBookingPlace, setSelectedBookingPlace] = useState<Place>();
  const [selectedBookingPlaceUser, setSelectedBookingPlaceUser] =
    useState<User>();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
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
    if (!selectedBookingPlace) return;
    const unsubscribe = getReviewsSnapshot(
      selectedBookingPlace.placeId,
      (reviews) => {
        setReviews(reviews);
        console.log(reviews);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [selectedBookingPlace]);

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
    <>
      <div
        className={`xl:hidden lg:hidden md:hidden sm:hidden flex justify-between items-center border-t border-b py-3 ${
          !selectedBooking ? "space-x-0" : "space-x-2"
        }`}
      >
        <Image
          role="button"
          src={"/icons/white-back-arrow.svg"}
          alt="tick"
          width={35}
          height={35}
          className={`${!selectedBooking ? "hidden" : "block"}`}
          onClick={() => {
            setSelectedBooking(null);
          }}
        />
        <div className={`w-full`}>
          <MobileSearchAndFilter />
        </div>
      </div>

      <div className="sm:flex justify-between sm:space-x-4">
        <div
          className={`${
            selectedBooking ? "hidden" : "block"
          } w-[100%] sm:block sm:w-[40%] lg:w-[25%] h-[80vh] space-y-2`}
        >
          <div className="sm:flex hidden justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-lg">All Bookings</div>
              <Image
                src={"/icons/down.svg"}
                alt="down"
                width={13}
                height={13}
              />
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
                className={`flex mt-4 border justify-between px-2 py-2 rounded-xl ${
                  selectedBooking?.bookingId === booking.bookingId
                    ? "border-2 border-black"
                    : ""
                }`}
                role="button"
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex">
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
                </div>
                <div
                  className="h-[30px] flex items-center justify-center mr-2"
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
        <div className="flex sm:hidden justify-between items-center my-2">
          <div className="w-[48%]">
            <Button
              type="gray"
              text="Review Booking"
              bordered
              rounded
              full
              className="border-gray-700 my-2"
              onClick={() => setIsReviewModalOpen(true)}
            />
          </div>
          <div className="w-[48%]">
            <Button
              type="white"
              text="Message the host"
              bordered
              rounded
              full
              className="border-gray-700"
              onClick={() => {
                router.push(
                  "/messages?userId=" + selectedBookingPlaceUser?.userId
                );
              }}
            />
          </div>
        </div>

        {selectedBookingPlace && selectedBooking && (
          <div className={`sm:hidden`}>
            <PropertySideDetails
              imageURL={getImagesOnIndex(0)}
              price={selectedBookingPlace.pricePerHour * selectedBooking.hours}
              description={selectedBookingPlace.description}
              hours={selectedBooking.hours}
            />
          </div>
        )}

        <div
          className={`${
            !selectedBooking ? "hidden" : "block"
          } w-[100%] sm:w-[60%] w-full lg:w-[50%] sm:flex flex-col sm:border rounded-lg`}
        >
          {selectedBooking ? (
            <div>
              <div className="sm:flex justify-between items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="sm:text-base text-lg font-semibold">
                    {getPlace(places, selectedBooking.place?.id ?? "")
                      ?.description ?? "-"}
                  </div>
                  <span className="bg-[#4AEAB1] text-black px-2 py-1 rounded-full text-sm">
                    Finished
                  </span>
                </div>
                <div className="flex items-center my-[5px] sm:my-0">
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
              <div className="gap-2 px-2 lg:px-4 md:px-4 sm:px-3">
                <div className="flex space-x-2 w-full">
                  <Image
                    src={getImagesOnIndex(0)}
                    alt="detail-image"
                    className=" w-3/5 md:w-1/2 h-auto rounded-tl-[20px] rounded-bl-[20px]"
                    width={200}
                    height={470}
                  />
                  <div className="hidden md:flex md:flex-col md:w-1/4 gap-2">
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
                  <div className="flex flex-col  w-2/5 md:w-1/4 gap-2">
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
              <div className="px-2 lg:px-5 md:px-5 sm:px-3">
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
              <div className="px-2 lg:px-5 md:px-5 sm:px-3">
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
              <div className="px-2 lg:px-5 md:px-5 sm:px-3">
                <label>Rules</label>
                <div className="w-full">
                  <Accordion items={accordionItems} />
                </div>
              </div>
              <hr className="my-9" />
              <div className="px-2 lg:px-5 md:px-5 sm:px-3">
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
              <div className="px-2 lg:px-5 md:px-5 sm:px-3">
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
                {reviews.map((review) => (
                  <React.Fragment key={review.reviewId}>
                    <div className="flex justify-between py-2">
                      <div className="flex sm:px-2 space-x-2 sm:w-max w-full">
                        <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                          <Image
                            src={
                              review.user?.photoURL
                                ? review.user.photoURL
                                : "/icons/profile-icon.png"
                            }
                            alt="profile-pic"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div className="sm:w-max w-full">
                          <div className="flex justify-between">
                            <div className="text-sm md:text-md lg:text-base font-semibold">
                              {getFullName(review.user)}
                            </div>
                            <div className="xl:hidden space-y-2 text-sm md:text-md lg:text-base xl:text-base">
                              <div className="flex">
                                {Array.from(
                                  { length: review.placeRating },
                                  (_, index) => (
                                    <Image
                                      src={"/icons/starIcon.svg"}
                                      alt="star-icon"
                                      className="sm:w-[15px]"
                                      width={12}
                                      height={12}
                                    />
                                  )
                                )}
                                <div className="ml-2">
                                  {formatDate(review.createdAt.toISOString())}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm md:text-md lg:text-base xl:text-base w-max">
                            {review.comment}
                          </div>
                        </div>
                      </div>
                      <div className="hidden xl:block space-y-2">
                        <div className="flex justify-end">
                          {Array.from(
                            { length: review.placeRating },
                            (_, index) => (
                              <Image
                                key={index}
                                src={"/icons/starIcon.svg"}
                                alt="star-icon"
                                width={12}
                                height={12}
                                className="sm:w-[15px]"
                              />
                            )
                          )}
                        </div>
                        <div>{formatDate(review.createdAt.toISOString())}</div>
                      </div>
                    </div>
                    <hr className="my-3" />
                  </React.Fragment>
                ))}
                <div className="text-center flex justify-center my-5">
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
              showReviewButton={true}
              buttonText="Message the host"
              onReviewClick={() => setIsReviewModalOpen(true)}
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
        <CustomDialog open={isReviewModalOpen} onClose={setIsReviewModalOpen}>
          <ReviewModal />
        </CustomDialog>
      </div>
    </>
  );
}
