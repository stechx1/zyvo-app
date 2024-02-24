"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DocumentReference } from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Accordion from "@/components/Accordion/Accordion";
import { Map } from "@/components/Maps";
import { AccordionItem } from "@/types";
import { User } from "@/types/user";
import { Review } from "@/types/review";
import { Place } from "@/types/place";
import { useCommonContext } from "@/context/CommonContext";
import { getPlaceSnapshot } from "@/firebase/place";
import { getReviewsSnapshot } from "@/firebase/reviews";
import { getUserByRef, updateFavourites } from "@/firebase/user";
import HostProperties from "@/collections/HostProperties";
import AvailabilitySelection from "@/collections/AvailabilitySelection";
import {
  formatDate,
  getFullName,
  mergeDateAndTime,
  timeArray,
} from "@/lib/utils";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";
import { format } from "date-fns";
import { addUpdateBooking } from "@/firebase/booking";
import { BookingStatusType } from "@/types/booking";

export type BookingDetailsType = {
  placeId: string;
  hours: number;
  date: string;
  from: string;
  to: string;
};

const PropertyDetailsPage = ({ params }: { params: { id: string } }) => {
  const { user, setUser, mode } = useCommonContext();
  const [place, setPlace] = useState<Place | null>(null);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [placeUser, setPlaceUser] = useState<null | User>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedavailableHoursTo, setSelectedavailableHoursTo] =
    useState<string>();
  const [selectedavailableHoursFrom, setSelectedavailableHoursFrom] =
    useState<string>();
  const [hours, setHours] = useState(2);
  const [width] = useScreenDimensions();

  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (mode == "HOST") {
      router.push("/my-places");
      return;
    }
    const unsubscribe = getPlaceSnapshot(
      params.id,
      (place) => {
        setPlace(place);
        if (place.userRef) getUser(place.userRef);
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
    if (!place) return;
    const unsubscribe = getReviewsSnapshot(
      (reviews) => {
        setReviews(reviews);
      },
      place.placeId,
      undefined,
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [place]);

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setPlaceUser(result);
    }
  };

  const onCheckOutClick = () => {
    if (!place) return;
    const availableHoursFromIndex = timeArray.findIndex(
      (t) => t.value === selectedavailableHoursFrom
    );
    const availableHoursToIndex = timeArray.findIndex(
      (t) => t.value === selectedavailableHoursTo
    );
    if (!selectedDate) {
      toast.error("Select date of booking to checkout!");
    } else if (!selectedavailableHoursFrom || !selectedavailableHoursTo) {
      toast.error("Select time of booking to checkout!");
    } else if (availableHoursFromIndex >= availableHoursToIndex) {
      toast.error("Select valid time of booking to checkout!");
    } else {
      if (!user || !place?.userRef) return;
      setIsLoading(true);
      const to = mergeDateAndTime(selectedDate, selectedavailableHoursTo);
      const from = mergeDateAndTime(selectedDate, selectedavailableHoursFrom);
      if (to && from) {
        const booking = {
          from,
          to,
          hours,
          status: "WAITING PAYMENT" as BookingStatusType,
        };
        addUpdateBooking(booking, {
          userId: user?.userId,
          placeId: place?.placeId,
          hostId: place.userRef.id,
        }).then(({ result, error }) => {
          if (error) {
            toast.error("error booking property!");
          } else {
            router.push("/checkout?bookingId=" + result);
          }
          setIsLoading(false);
        });
      }
      // router.push("/checkout?data=" + JSON.stringify(data));
    }
  };

  const accordionItems: AccordionItem[] = [
    {
      value: "parking",
      title: "Parking",
      icon: "/icons/gray-car-icon.svg",
      content: place?.parkingRules ? place.parkingRules : "No rules!",
    },
    {
      value: "hostRules",
      title: "Host Rules",
      icon: "/icons/gray-warning-icon.svg",
      content: place?.hostRules ? place.hostRules : "No rules!",
    },
  ];

  const getImagesOnIndex = (index: number) => {
    if (place?.images?.length && place?.images?.length > index) {
      return place?.images[index];
    }
    return "/images/no-image.jpg";
  };
  const handleFavoriteChange = async () => {
    if (!user || !place) return;
    const { result } = await updateFavourites(user?.userId, place?.placeId);
    if (result) setUser({ ...user, favoritePlaces: result });
  };
  return (
    <div className="flex sm:container sm:mx-auto my-2 md:my-[3.4rem] sm:px-14 md:px-0 lg:px-14 gap-2 flex-col">
      <div className="sm:hidden border-b mx-[-19px] px-2 pb-3">
        <MobileSearchAndFilter type="header" />
      </div>
      <div className="flex flex-row sm:mt-0 mt-8">
        <div className="text-black text-[19px] md:leading-10 sm:text-[21px] md:text-3xl font-normal">
          {place?.description}
        </div>
        <div className="sm:hidden flex space-x-1 ml-2 items-center">
          <p className="flex items-center text-[13px] sm:text-[16px] text-primary-amber-500 mr-0">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {place?.rating?.toFixed(1)}
          </p>
          <p className=" md:text-[16px] text-[12px] mr-0 sm:mr-2">{`(${
            place?.reviewsCount ?? 0
          } reviews)`}</p>
        </div>
      </div>

      {/* Icon's Details */}
      <div className="flex justify-between mb-3">
        {/* =================================== Left Description =============================  */}
        <div className="items-center flex flex-wrap gap-[1rem] sm:gap-4">
          <div className="space-x-4 md:space-x-1 hidden sm:flex">
            <p className="flex items-center text-[13px] md:text-[22px] text-primary-amber-500 mr-0">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={18}
                height={18}
                className="mr-1 md:w-[22px] md:text-h3"
              />
              {place?.rating?.toFixed(1)}
            </p>
            <p className=" md:text-h4 mt-0.5 text-[11px] mr-0 md:mr-2">{`(${
              place?.reviewsCount ?? 0
            } reviews)`}</p>
          </div>
          <div className="flex items-center justify-center space-x-1 sm:text-base">
            <Image
              src={"/icons/time.svg"}
              alt="time"
              width={20}
              height={20}
              className="opacity-70 md:w-[25px] md:h-[25px]"
            />
            <div className="md:text-h4 text-xs">{place?.minHours} hr min</div>
          </div>
          {place?.size && (
            <div className="flex items-center justify-center space-x-1 sm:text-base">
              <Image
                src={"/icons/square-fit-icon.svg"}
                alt="square-fit"
                width={17}
                height={17}
                className="sm:w-[21px] sm:h-[21px]"
              />
              <div className="text-xs md:text-h4">{place?.size} sqft</div>
            </div>
          )}
          {place?.instantBook && (
            <div className="sm:flex hidden items-center justify-center space-x-1 sm:text-base">
              <Image
                src={"/icons/green-instant-icon.svg"}
                alt="square-fit"
                width={17}
                height={17}
                className="sm:w-[21px] sm:h-[21px]"
              />
              <div className="text-xs md:text-h4">Instant book</div>
            </div>
          )}
        </div>

        {/* =================================== Right Description =============================  */}
        {place && user && (
          <div className="flex space-x-4 sm:space-x-6">
            <div className="flex items-center justify-center space-x-2  sm:text-base">
              <Image
                src={"/icons/gray-share-icon.svg"}
                alt="share-icon"
                width={19}
                height={19}
                className="sm:w-[27px] sm:h-[27px]"
              />
              <div className="text-xs md:text-h4">Share</div>
            </div>
            <div className="flex items-center justify-center space-x-2 sm:text-base">
              {!user.favoritePlaces?.includes(place.placeId) ? (
                <Image
                  src={"/icons/heart-icon-gray.svg"}
                  alt="heart-icon"
                  width={22}
                  height={22}
                  className="opacity-50 cursor-pointer sm:w-[30px] sm:h-[30px]"
                  onClick={handleFavoriteChange}
                />
              ) : (
                <Image
                  src={"/icons/heart-icon-red.svg"}
                  alt="heart-icon"
                  width={22}
                  height={22}
                  className="opacity-80 cursor-pointer sm:w-[30px] sm:h-[30px]"
                  onClick={handleFavoriteChange}
                />
              )}
              <div className="text-xs md:text-h4">Favorite</div>
            </div>
          </div>
        )}
      </div>

      {/* Pictures of Property*/}
      <div className="flex xl:space-x-3 lg:space-x-3 md:space-x-2 sm:space-x-3 space-x-2 w-full">
        <Image
          src={getImagesOnIndex(0)}
          alt="detail-image"
          className="w-[60%] sm:w-[60%] xl:h-[24rem] lg:h-[20rem] md:h-[19.7rem] sm:h-[15rem] h-[14.5rem] md:w-[50%] bg-gray-100 object-cover rounded-tl-[20px] rounded-bl-[20px]"
          width={200}
          height={170}
        />
        <div className="hidden md:flex md:flex-col md:w-1/4 gap-2 md:gap-2 xl:gap-3 lg:gap-3 sm:gap-3">
          <Image
            src={getImagesOnIndex(1)}
            alt="detail-image"
            className="object-cover w-full xl:h-[11.6rem] lg:h-[9.6rem] md:h-[9.6rem] sm:h-[7.6rem]"
            width={200}
            height={470}
          />
          <Image
            src={getImagesOnIndex(2)}
            alt="detail-image"
            className="object-cover w-full xl:h-[11.6rem] lg:h-[9.6rem] md:h-[9.6rem] sm:h-[7.6rem]"
            width={200}
            height={470}
          />
        </div>
        <div className="w-[48%] flex flex-col w-2/5 md:w-1/4 gap-2 xl:gap-3 lg:gap-3 md:gap-2 sm:gap-3">
          <Image
            src={getImagesOnIndex(3)}
            alt="detail-image"
            className="object-cover w-full xl:h-[11.6rem] lg:h-[9.6rem] md:h-[9.6rem] sm:h-[7.2rem] h-[7rem] rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
          <Image
            src={getImagesOnIndex(4)}
            alt="detail-image"
            className="object-cover w-full xl:h-[11.6rem] lg:h-[9.6rem] md:h-[9.6rem] sm:h-[7.2rem] h-[7rem] rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
        </div>
      </div>

      {place && (
        <div className="md:hidden lg:hidden xl:hidden block mt-7 border rounded-lg p-4 text-center space-y-2 mb-8">
          <div className="text-2xl">${place?.pricePerHour}/hr</div>
          <div className="text-sm text-gray-800">
            {place?.minHours} hr minimum
          </div>

          <hr />

          <div className="flex items-center justify-between space-x-2">
            <div className="text-sm text-gray-800">
              {place?.discountedMinHours}+ hour discount
            </div>
            <div className="text-sm text-gray-800">
              {place?.discountPercentage}% off
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden block border border-gray-700 rounded-xl">
        {width <= 768 && place?.status === "ACTIVE" && (
          <AvailabilitySelection
            hours={hours}
            availableHoursFrom={place?.availableHoursFrom}
            availableHoursTo={place?.availableHoursTo}
            selectedAvailableHoursFrom={selectedavailableHoursFrom}
            selectedAvailableHoursTo={selectedavailableHoursTo}
            setSelectedAvailableHoursTo={setSelectedavailableHoursTo}
            setSelectedAvailableHoursFrom={setSelectedavailableHoursFrom}
            setHours={setHours}
            price={place?.pricePerHour ?? 0}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableMonths={place?.availableMonths ?? []}
            availableDays={place?.availableDays ?? []}
            onCheckOutClick={onCheckOutClick}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="my-9 block md:hidden lg:hidden xl:hidden">
        <HostProperties
          mode={mode}
          cardStyle="mobile"
          bottomText="Respond within 1 hr"
          bottomTextIcon="/icons/time.svg"
          photoURL={placeUser?.photoURL ?? ""}
          fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
          isVerified={placeUser?.emailVerified}
          onMessageClick={() => {
            router.push("/messages?userId=" + placeUser?.userId);
          }}
          onProfileClick={() =>
            router.push("/profile?userId=" + placeUser?.userId)
          }
        />
      </div>

      <div className="sm:flex sm:gap-10 sm:my-20">
        {/* =================================Left Section=================================== */}

        <div className="w-full sm:w-[100%] md:w-[60%] lg:w-[66.5%]">
          <div className="flex flex-col gap-3">
            <div className="text-black text-[18px] md:text-2xl font-medium ">
              About the Space
            </div>
            <div className={`${!readMore && "line-clamp-3"}`}>
              <div className="text-black text-[14px] md:text-h4 font-normal">
                {place?.description ? place.description : "No Description!"}
              </div>
            </div>
          </div>
          <p
            onClick={() => setReadMore(!readMore)}
            className={`text-primary-emerald-300 text-[15px] sm:text-lg mt-4 hover:underline cursor-pointer w-fit`}
          >
            {place?.description && place?.description?.length > 200
              ? !readMore
                ? "Read more..."
                : "Read less..."
              : null}
          </p>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Included in the booking=================================== */}

          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-3">
            <p className=" text-[18px] md:text-2xl font-medium">
              Included in your booking
            </p>
            <div className="flex flex-wrap xl:gap-6 lg:gap-6 md:gap-6 sm:gap-6 gap-2">
              {place?.ameneties.map((amenety) => (
                <div
                  className={`bg-white border rounded-xl xl:py-2.5 lg:py-3 md:py-3 sm:py-3 py-1 px-2 xl:px-5 lg:px-5 md:px-5 sm:px-4 xl:gap-3 lg:gap-3 gap-3 w-fit md:min-w-[11rem] flex items-center`}
                  key={amenety}
                >
                  <Image
                    src={"/icons/amenety-icon.png"}
                    alt={"icon"}
                    width={40}
                    height={40}
                    className="xl:w-[50] lg:w-[50] md:w-[40] sm:w-[40] w-[2rem] xl:h-[45] "
                  />

                  <div className="text-black text-[14px] md:text-h3 font-normal capitalize">
                    {amenety.toLowerCase()}
                  </div>
                </div>
              ))}
              {place?.ameneties.length === 0 && <div>No Ameneties</div>}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Rules Accordion=================================== */}
          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-2">
            <p className=" text-[18px] md:text-2xl font-medium">Rules</p>
            <div className="w-full">
              <Accordion items={accordionItems} />
            </div>
          </div>
          <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>

          {/* ================================= Add-ons from the host =================================== */}

          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-2">
            <div className="flex flex-col xl:gap-2 lg:gap-2 md:gap-2">
              <p className=" text-[18px] md:text-2xl font-medium">
                Add-ons from the host
              </p>
              <p className="text-[14px] md:text-h3">
                Host provided services, items or options. Available at checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {place?.addOns.map((addOn, index) => (
                <div
                  className="flex items-center rounded-xl border border-secondary-neutral-200 xl:py-3 lg:py-3 md:py-3 sm:py-3 p-2 xl:px-4 lg:px-4 md:px-4 sm:px-4"
                  key={index}
                >
                  <div className="rounded-xl bg-gray-100 xl:p-4 lg:p-4 md:p-4 sm:p-4 p-2 flex items-center justify-center mr-4">
                    <Image
                      src={"/icons/addon-icon.png"}
                      alt={addOn.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="text-sm sm:text-sm md:text-md lg:text-base xl:text-base">
                    <p className="font-medium text-[13px] md:text-h4">
                      {addOn.name}
                    </p>
                    <div className="flex gap-2">
                      <p>${addOn.price} / item</p>
                    </div>
                  </div>
                </div>
              ))}
              {place?.addOns.length === 0 && (
                <div className="text-[14px] md:text-h3">No Add Ons Added!</div>
              )}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-2">
            <div className="flex flex-col xl:gap-2 lg:gap-2 md:gap-2">
              <p className=" text-[18px] md:text-2xl font-medium">
                Address & Location
              </p>
              {place && (
                <p className="text-[14px] md:text-h3 underline underline-offset-4">
                  {`${place?.street ?? ""} ${place?.city ?? ""} ${
                    place?.state ?? ""
                  } ${place?.country ?? ""}`}
                </p>
              )}
            </div>
            {place?.coordinates && (
              <div className="mt-3">
                <Map coords={place.coordinates} />
              </div>
            )}
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-2">
            {reviews.length > 0 && (
              <>
                <div className="lg:px-5 md:px-5 sm:px-3">
                  <div
                    className={`lg:flex items-center flex-wrap justify-between`}
                  >
                    <div className="lg:flex items-center">
                      <div className="text-[18px] md:text-2xl font-medium">
                        Reviews
                        <span className="text-black ms-2 me-3 text-[16px] md:text-xl font-medium">
                          {place?.reviewsCount
                            ? "(" + place?.reviewsCount + ")"
                            : 0}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Image
                          src={"/icons/starIcon.svg"}
                          alt="star-icon"
                          width={15}
                          height={15}
                          className="sm:w-[22px] sm:h-[22px] mb-0.5"
                        />
                        <div className="ml-1">
                          <span className="text-[#FCA800] text-base mx-1">
                            {place?.rating?.toFixed(2) ?? 0}
                          </span>
                        </div>
                        <span className="mx-1 text-black sm:text-lg">
                          Rating
                        </span>
                        <div className="lg:hidden flex justify-end w-full sm:text-lg">
                          Sort by: Recent Reviews
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block sm:text-lg">
                      Sort by: Recent Reviews
                    </div>
                  </div>
                  {reviews.map((review) => (
                    <React.Fragment key={review.reviewId}>
                      <div className="flex justify-between py-6">
                        <div className="flex sm:px-2 items-center space-x-2 xl:w-max w-full">
                          <div className="rounded-full border-2 border-gray-200 p-1 mr-1">
                            <Image
                              src={
                                review.user?.photoURL
                                  ? review.user.photoURL
                                  : "/icons/profile-icon.png"
                              }
                              alt="profile-pic"
                              width={50}
                              height={50}
                              className="rounded-full sm:w-[65px]"
                            />
                          </div>
                          <div className="w-full">
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
                                    {format(review.createdAt, "MMM d, yyyy")}
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
        </div>
        <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[34.5%] hidden md:block lg:block xl:block">
          {place && (
            <div className="border rounded-2xl py-4 px-5 text-center mb-8 bg-white">
              <div className="sm:text-[34px]">${place?.pricePerHour}/hr</div>
              <div className="text-sm md:text-h4 text-gray-800">
                {place?.minHours} hr minimum
              </div>

              <hr className="my-5" />

              <div className="flex items-center justify-between space-x-2 px-4">
                <div className="text-sm md:text-h4 text-gray-800">
                  {place?.discountedMinHours}+ hour discount
                </div>
                <div className="text-sm md:text-h4 text-gray-800">
                  {place?.discountPercentage}% off
                </div>
              </div>
            </div>
          )}

          {user && placeUser && user?.userId !== placeUser?.userId && (
            <>
              {place?.status === "ACTIVE" && (
                <div className="sm:block md:block lg:block xl:block hidden min-w-max border-2 border-gray-700 rounded-xl bg-white">
                  <AvailabilitySelection
                    hours={hours}
                    availableHoursFrom={place?.availableHoursFrom}
                    availableHoursTo={place?.availableHoursTo}
                    selectedAvailableHoursFrom={selectedavailableHoursFrom}
                    selectedAvailableHoursTo={selectedavailableHoursTo}
                    setSelectedAvailableHoursTo={setSelectedavailableHoursTo}
                    setSelectedAvailableHoursFrom={
                      setSelectedavailableHoursFrom
                    }
                    setHours={setHours}
                    price={place?.pricePerHour ?? 0}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    availableMonths={place?.availableMonths ?? []}
                    availableDays={place?.availableDays ?? []}
                    onCheckOutClick={onCheckOutClick}
                    isLoading={isLoading}
                  />
                </div>
              )}
              <div className="my-8 hidden sm:block md:block lg:block xl:block">
                <HostProperties
                  mode={mode}
                  bottomText="Typically responds within 1 hr"
                  bottomTextIcon="/icons/time.svg"
                  photoURL={placeUser?.photoURL ?? ""}
                  fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
                  isVerified={placeUser?.emailVerified}
                  onMessageClick={() => {
                    router.push("/messages?userId=" + placeUser?.userId);
                  }}
                  onProfileClick={() =>
                    router.push("/profile?userId=" + placeUser?.userId)
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
