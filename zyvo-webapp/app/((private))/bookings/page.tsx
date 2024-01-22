"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomDetailTag from "@/components/CustomDetailTag";
import CustomSelect from "@/components/SelectDropDown";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getMyBookingsSnapshot, updateStatusBooking } from "@/firebase/booking";
import { Booking, BookingStatusType } from "@/types/booking";
import { getPlaceByRef } from "@/firebase/place";
import { DocumentReference } from "firebase/firestore";
import { Place } from "@/types/place";
import { formatDate, formatTime, getFullName } from "@/lib/utils";
import HostProperties from "@/collections/HostProperties";
import PropertySideDetails from "@/collections/PropertySideDetails";
import { User } from "@/types/user";
import { getUserByRef } from "@/firebase/user";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import { addReview, getReviewsSnapshot } from "@/firebase/reviews";
import { Review } from "@/types/review";
import { CustomDialog } from "@/components/Dialog";
import ReviewModal from "@/collections/ReviewModal";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";
import toast from "react-hot-toast";
import Map from "@/components/Maps";

export default function Bookings() {
  const { user, mode } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedBookingPlace, setSelectedBookingPlace] =
    useState<Place | null>(null);
  const [selectedBookingPlaceUser, setSelectedBookingPlaceUser] =
    useState<User | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    setBookings([]);
    setSelectedBooking(null);
    setSelectedBookingPlace(null);
    setSelectedBookingPlaceUser(null);
    setReviews([]);
    const unsubscribe = getMyBookingsSnapshot(
      mode,
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
  }, [user, mode]);

  useEffect(() => {
    if (!selectedBookingPlace && !selectedBooking) return;
    const unsubscribe = getReviewsSnapshot(
      (reviews) => {
        setReviews(reviews);
      },
      mode === "GUEST" ? selectedBookingPlace?.placeId : undefined,
      mode === "HOST" ? selectedBooking?.userRef.id : undefined,
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [selectedBookingPlace, mode]);

  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach((booking) => {
        if (booking.placeRef)
          getPlaceByRef(booking.placeRef).then(({ result }) => {
            if (result) {
              setPlaces((prev) => {
                if (prev.find((p) => p.placeId === result.placeId)) return prev;
                return [...prev, result];
              });
            }
          });
      });
      selectBooking();
    }
  }, [bookings]);

  useEffect(() => {
    if (selectedBooking?.placeRef) {
      fetchSelectedBookingPlace(selectedBooking.placeRef);
    }
  }, [selectedBooking]);

  const fetchSelectedBookingPlace = (placeRef: DocumentReference) => {
    getPlaceByRef(placeRef).then(({ result }) => {
      if (result) {
        setSelectedBookingPlace({ ...result });
        if (result?.userRef) getUser(result.userRef);
      }
    });
  };

  const submitReview = ({
    comment,
    placeRating,
    communicationRating,
    responseRating,
  }: {
    comment: string;
    placeRating: number;
    communicationRating: number;
    responseRating: number;
  }) => {
    if (selectedBookingPlace && user) {
      addReview({
        comment,
        communicationRating,
        placeId: mode === "GUEST" ? selectedBookingPlace.placeId : undefined,
        guestId: mode === "HOST" ? selectedBooking?.userRef.id : undefined,
        userId: user.userId,
        placeRating,
        responseRating,
      }).then(({ result, error }) => {
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Your Review Added successfully!");
          if (selectedBooking?.placeRef)
            fetchSelectedBookingPlace(selectedBooking.placeRef);
          setIsReviewModalOpen(false);
        }
      });
    }
  };
  const submitBookingStatus = (status: BookingStatusType) => {
    if (selectedBooking && user && mode === "HOST") {
      updateStatusBooking(selectedBooking.bookingId, status).then(
        ({ result, error }) => {
          if (error) {
            toast.error(error.message);
          } else {
            toast.success(
              `Booking ${
                status === "DECLINED"
                  ? "Declind"
                  : status === "CONFIRMED"
                  ? "Approved"
                  : ""
              } successfully!`
            );
          }
        }
      );
    }
  };

  const selectBooking = () => {
    if (!selectedBooking) {
      setSelectedBooking(bookings[0]);
    } else {
      setSelectedBooking(
        bookings.find((b) => b.bookingId === selectedBooking.bookingId) ?? null
      );
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
      content: selectedBookingPlace?.parkingRules
        ? selectedBookingPlace?.parkingRules
        : "No parking rules defined!",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: selectedBookingPlace?.hostRules
        ? selectedBookingPlace?.hostRules
        : "No host rules defined!",
    },
  ];
  const showReviewButton =
    selectedBooking?.status === "FINISHED" &&
    (mode === "GUEST"
      ? !selectedBooking.placeReviewRef
      : !selectedBooking.guestReviewRef);
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
                    src={getPlaceImage(booking.placeRef)}
                    alt="image"
                    width={95}
                    height={95}
                    className="rounded-xl object-cover"
                  />
                  <div className="ml-4">
                    <div className="text-lg">
                      {
                        getPlace(places, booking.placeRef?.id ?? "")
                          ?.description
                      }
                    </div>
                    <div className="text-[#A4A4A4]">
                      {formatDate(booking.date.toISOString())}
                    </div>
                    {mode === "HOST" && booking.status === "REQUESTED" ? (
                      <>
                        <span
                          className={`inline-block mt-0.5 text-[#00BF7B] px-2.5 py-2 text-sm leading-none rounded-full capitalize border border-[#00BF7B] me-1`}
                          onClick={() => {
                            submitBookingStatus("CONFIRMED");
                          }}
                        >
                          Approve
                        </span>
                        <span
                          className={`inline-block mt-0.5 text-[#FF1A00] px-2.5 py-2 text-sm leading-none  rounded-full capitalize border border-[#FF1A00]`}
                          onClick={() => {
                            submitBookingStatus("DECLINED");
                          }}
                        >
                          Decline
                        </span>
                      </>
                    ) : (
                      <BookingStatus status={booking.status} />
                    )}
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
          {bookings.length === 0 && (
            <div className="flex justify-center items-center h-[100%]">
              No Bookings!
            </div>
          )}
        </div>

        {/******Booking Details*******/}
        <div className="flex sm:hidden justify-between space-x-3 items-center my-2">
          {showReviewButton && (
            <Button
              type="gray"
              text="Review Booking"
              bordered
              rounded
              full
              className="border-gray-700 my-2"
              onClick={() => setIsReviewModalOpen(true)}
            />
          )}
          <Button
            type="white"
            text={`Message the ${mode === "GUEST" ? "host" : "guest"}`}
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

        {selectedBookingPlace && selectedBooking && (
          <div className={`sm:hidden`}>
            <PropertySideDetails
              rating={selectedBookingPlace.rating}
              reviewsCount={selectedBookingPlace.reviewsCount}
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
          }  sm:w-[60%] w-full lg:w-[50%] sm:flex flex-col sm:border rounded-lg`}
        >
          {selectedBooking ? (
            <div>
              <div className="sm:flex justify-between items-center p-4">
                <div className="flex items-center space-x-3">
                  <div className="sm:text-base text-lg font-semibold">
                    {getPlace(places, selectedBooking.placeRef?.id ?? "")
                      ?.description ?? "-"}
                  </div>
                  <BookingStatus status={selectedBooking.status} />
                </div>
                <div className="flex items-center my-[5px] sm:my-0">
                  <div>
                    <div className="flex space-x-2 text-sm">
                      {/* <Image
                        src={"/icons/Share.svg"}
                        alt="share-icon"
                        width={17}
                        height={17}
                      />
                      <span>Share</span> */}
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
                  {selectedBookingPlace?.ameneties.map((am, i) => {
                    return (
                      <div
                        key={i}
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
              <div className="px-2 lg:px-5 md:px-5 sm:px-3 my-2">
                <label>Address & Location</label>
                <div>
                  <u>Midtown Manhattan, New York, NY</u>
                </div>
                <div className="mt-3">
                  <Map coords={selectedBookingPlace?.coordinates} />
                </div>
              </div>
              {reviews.length > 0 && (
                <>
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
                            {mode === "GUEST"
                              ? selectedBookingPlace?.rating?.toFixed(2) ?? 0
                              : selectedBookingPlaceUser?.rating?.toFixed(2) ??
                                0}
                            <span className="text-black ms-2">
                              {mode === "GUEST"
                                ? selectedBookingPlace?.reviewsCount ?? 0
                                : selectedBookingPlaceUser?.reviewsCount ??
                                  0}{" "}
                              reviews
                            </span>
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
                                          key={index}
                                          src={"/icons/starIcon.svg"}
                                          alt="star-icon"
                                          className="sm:w-[15px]"
                                          width={12}
                                          height={12}
                                        />
                                      )
                                    )}
                                    <div className="ml-2">
                                      {formatDate(
                                        review.createdAt.toISOString()
                                      )}
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
                            <div>
                              {formatDate(review.createdAt.toISOString())}
                            </div>
                          </div>
                        </div>
                        <hr className="my-3" />
                      </React.Fragment>
                    ))}
                    {/* <div className="text-center flex justify-center my-5">
                  <Button
                    roundedfull
                    className="border-gray-700"
                    bordered
                    type="white"
                    text="Show More Reviews"
                  />
                </div> */}
                  </div>
                </>
              )}
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
              mode={mode}
              photoURL={selectedBookingPlaceUser?.photoURL ?? ""}
              fullName={
                selectedBookingPlaceUser
                  ? getFullName(selectedBookingPlaceUser) ?? ""
                  : ""
              }
              showReviewButton={showReviewButton}
              onReviewClick={() => setIsReviewModalOpen(true)}
              onMessageClick={() => {
                router.push(
                  "/messages?userId=" + selectedBookingPlaceUser?.userId
                );
              }}
            />
          )}
          {selectedBookingPlace && selectedBooking && (
            <PropertySideDetails
              rating={selectedBookingPlace.rating}
              reviewsCount={selectedBookingPlace.reviewsCount}
              imageURL={getImagesOnIndex(0)}
              price={selectedBookingPlace.pricePerHour * selectedBooking.hours}
              description={selectedBookingPlace.description}
              hours={selectedBooking.hours}
            />
          )}
        </div>
        <CustomDialog open={isReviewModalOpen} onClose={setIsReviewModalOpen}>
          <ReviewModal handleSubmit={submitReview} />
        </CustomDialog>
      </div>
    </>
  );
}
const BookingStatus = ({ status }: { status: BookingStatusType }) => {
  function getStatusColor(status: string) {
    switch (status) {
      case "FINISHED":
        return "bg-[#4AEAB1]";
      case "CONFIRMED":
        return "bg-[#85d6ff]";
      case "WAITING PAYMENT":
        return "bg-[#fff178]";
      case "DECLINED":
        return "bg-[#FF1A00]";
      default:
        return "bg-stone-100";
    }
  }
  return (
    <span
      className={`inline-block mt-0.5 text-black px-2.5 py-2 text-sm leading-none ${getStatusColor(
        status
      )} rounded-full capitalize`}
    >
      {status?.toLowerCase()}
    </span>
  );
};
