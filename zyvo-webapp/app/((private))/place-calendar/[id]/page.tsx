"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import {
  getMyBookingsSnapshot,
  getPlaceBookingsSnapshot,
} from "@/firebase/booking";
import { getRouteDetails } from "@/lib/actions";
import { Place } from "@/types/place";
import {
  getPlaceByRef,
  getPlaceSnapshot,
  updatePlaceStatus,
} from "@/firebase/place";
import { User } from "@/types/user";
import { getUserByRef } from "@/firebase/user";
import { DocumentReference } from "firebase/firestore";
import { useCommonContext } from "@/context/CommonContext";
import { useRouter } from "next/navigation";
import { Booking } from "@/types/booking";
import DatePicker from "@/components/DatePicker";
import { timeArray } from "@/lib/utils";
import toast from "react-hot-toast";

const PlaceCalendarPage = ({ params }: { params: { id: string } }) => {
  const { user, setUser, mode, currentCoordinates } = useCommonContext();
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(
    getCurrentWeekDates()
  );
  const [place, setPlace] = useState<Place | null>(null);
  const [placeDistance, setPlaceDistance] = useState<number | null>(null);

  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guests, setGuests] = useState<User[]>([]);

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (mode == "GUEST") {
      router.push("/");
      return;
    }
    const unsubscribe = getPlaceSnapshot(
      params.id,
      (place) => {
        setPlace(place);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [user, mode, params.id]);

  useEffect(() => {
    if (!params.id) {
      return;
    }
    const unsubscribe = getPlaceBookingsSnapshot(
      params.id,
      (bookings) => {
        setBookings([...bookings]);
      },
      (e) => {
        console.log(e);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [params.id]);

  useEffect(() => {
    getGuests();
    async function getGuests() {
      if (bookings.length > 0) {
        let newGuests: User[] = [];
        for (let index = 0; index < bookings.length; index++) {
          if (bookings[index].userRef) {
            const { result } = await getUserByRef(bookings[index].userRef);
            if (result) {
              if (!newGuests.find((g) => g.userId === result.userId)) {
                newGuests = [...newGuests, result];
              }
            }
          }
        }
        setGuests(newGuests);
      }
    }
  }, [bookings]);
  useEffect(() => {
    if (!place) return;
    getDistance();
    async function getDistance() {
      if (currentCoordinates && place?.coordinates) {
        const routes = await getRouteDetails(
          currentCoordinates,
          place?.coordinates
        );
        if (routes) setPlaceDistance(routes.distance);
        else setPlaceDistance(null);
      } else setPlaceDistance(null);
    }
  }, [currentCoordinates, place]);

  function getCurrentWeekDates() {
    return Array.from(Array(7).keys()).map((idx) => {
      const d = new Date();
      d.setDate(d.getDate() - d.getDay() + idx);
      return d;
    });
  }
  const getBookingByDate = (date: Date) => {
    return bookings.find((b) => b.date.getDate() === date.getDate());
  };
  const getGuestName = (guestRef?: DocumentReference) => {
    if (guests) {
      const foundGuest = guests.find((g) => g.userId == guestRef?.id);
      if (foundGuest)
        return (
          (foundGuest.firstName ?? "") + " " + (foundGuest?.lastName ?? "")
        );
    }
    return "";
  };
  const submitPlaceStatus = (status: String) => {
    if (user && place && mode === "HOST") {
      updatePlaceStatus(place?.placeId, status).then(({ result, error }) => {
        if (error) {
          toast.error(error.message);
        } else {
          toast.success(
            `Bookings ${
              status === "PAUSED"
                ? "Paused"
                : status === "ACTIVE"
                ? "Activated"
                : ""
            } successfully!`
          );
        }
      });
    }
  };

  return (
    <div className="flex flex-col my-8 sm:flex-row gap-5 sm:gap-7">
      <div className="sm:hidden flex items-center justify-between">
        <div className="sm:hidden border border-neutral-200 rounded-full p-2">
          <Image
            src="/icons/back-arrow-icon.svg"
            alt="back-arrow-icon"
            width={15}
            height={15}
          />
        </div>
        <DatePicker
          setSelectedDates={setSelectedDates}
          selectedDates={selectedDates}
        />

        <div className="border border-neutral-200 rounded-full py-2 px-3 gap-1 sm:gap-3 w-fit flex items-center justify-between">
          <Image
            src={"/icons/filter-icon.svg"}
            alt="filter-icon"
            width={20}
            height={20}
            className="sm:w-[20px] w-[15px]"
          />
          <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
            Filter
          </div>
        </div>
      </div>
      <div className="sm:hidden h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
      <div className="w-full xl:w-[22%] lg:w-[30%] md:w-[35%] flex flex-col gap-7 sm:gap-10 sm:order-2">
        {place && (
          <div className="w-full rounded-[18px] border bg-white border-secondary-neutral-200 p-2 sm:p-[1.15rem] flex flex-col gap-1 sm:gap-3 sm:order-1">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <Image
                  src={
                    place?.images.length > 0
                      ? place.images[0]
                      : "/images/no-image.jpg"
                  }
                  alt="detail-image"
                  className="rounded-[18px] w-full h-[17rem] object-cover"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col pl-3 mt-2">
                  <div className="text-black text-lg font-normal font-Poppins whitespace-nowrap">
                    {place.description}
                  </div>
                  <div className="flex text-lg flex-row gap-4">
                    <div className="flex space-x-1">
                      <p className="flex items-center text-base text-primary-amber-500 mr-0 font-Poppins">
                        <Image
                          src={"/icons/orange-star-icon.svg"}
                          alt="star-icon"
                          width={18}
                          height={18}
                          className="mr-1"
                        />
                        {place.rating}
                      </p>
                      <p className="text-base text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${place.reviewsCount})`}</p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="flex items-center text-base text-black mr-0 font-Poppins">
                        <Image
                          src={"/icons/dark-gray-clock-icon.svg"}
                          alt="dark-gray-clock-icon"
                          width={18}
                          height={18}
                          className="mr-1"
                        />
                        {"$" + place.pricePerHour + " / h"}
                      </p>
                    </div>
                  </div>
                  {placeDistance && (
                    <p className="flex items-center  text-[10px] sm:text-[16px] text-secondary-neutral-400">
                      <Image
                        src={"/icons/gray-location-icon.svg"}
                        alt="location-icon"
                        width={14}
                        height={14}
                        className="mr-1"
                      />
                      {placeDistance} miles away
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className=" mt-2 h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
            <div className="flex flex-row justify-center sm:flex-col my-2 gap-2">
              <Button
                onClick={() => {
                  place.status == "ACTIVE"
                    ? submitPlaceStatus("PAUSED")
                    : submitPlaceStatus("ACTIVE");
                }}
                text={`${
                  place.status == "ACTIVE" ? "Pause" : "Activate"
                } Bookings`}
                type="gray"
                rounded
                className="text-xl h-11"
              />
              <Button
                onClick={() => {
                  router.push("/my-places");
                }}
                text="Edit Place"
                type="white"
                rounded
                className="text-xl h-11 border border-gray-600"
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 xl:w-[78%] overflow-auto pb-3 flex flex-col gap-7 sm:order-1">
        <div className="hidden sm:flex items-center justify-between">
          <DatePicker
            setSelectedDates={setSelectedDates}
            selectedDates={selectedDates}
          />

          <div className="border border-neutral-200 rounded-full py-2 px-3 gap-1 sm:gap-3 w-fit flex items-center justify-between">
            <Image
              src={"/icons/filter-icon.svg"}
              alt="filter-icon"
              width={20}
              height={20}
              className="sm:w-[20px] w-[15px]"
            />
            <div className="text-black text-[15px] sm:text-lg font-normal font-Poppins">
              Filter
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-auto max-h-[80vh] pb-4">
          {[
            { label: "", value: "" },
            ...timeArray.filter((t) =>
              bookings.find(
                (b) =>
                  b.from === t.value &&
                  selectedDates?.find((d) => d.getDate() == b.date.getDate())
              )
            ),
          ].map((time, i) => {
            return (
              <div className="flex gap-2">
                {i == 0 ? (
                  <Time />
                ) : (
                  <Time
                    a={time.label.split(" ")[1]}
                    b={time.label.split(" ")[0]}
                  />
                )}
                {selectedDates?.map((date, j) => {
                  return i == 0 ? (
                    <DateView date={date} />
                  ) : getBookingByDate(date)?.from === time.value ? (
                    <Card
                      name={getGuestName(getBookingByDate(date)?.userRef)}
                      status={getBookingByDate(date)?.status}
                      time={
                        getBookingByDate(date)
                          ? getBookingByDate(date)?.from +
                            " - " +
                            getBookingByDate(date)?.to
                          : ""
                      }
                    />
                  ) : (
                    <Card />
                  );
                })}
              </div>
            );
          })}
        </div>
        {!bookings.find((b) =>
          selectedDates?.find((d) => d.getDate() == b.date.getDate())
        ) && <div className="text-center">No Bookings found</div>}
      </div>
    </div>
  );
};

export default PlaceCalendarPage;
const Card = ({
  name,
  status,
  time,
}: {
  name?: string;
  status?: string;
  time?: string;
}) => {
  return (
    <div
      className={`pl-2 border border-neutral-200 bg-white ${
        name ? "border-l-[3px] border-l-[#4AEAB1]" : "border-x"
      } h-[60px] min-w-[6rem] rounded-xl flex justify-items-center justify-center flex-col overflow-hidden`}
    >
      <div className="text-[12px] font-bold ">{name}</div>
      <div className=" text-[11px] text-[#4AEAB1] capitalize">
        {status?.toLowerCase()}
      </div>
      <div className="text-[11px]">{time}</div>
    </div>
  );
};

const Time = ({ a, b }: { a?: string; b?: string }) => {
  return (
    <div className="text-[13px] text-[#373B63] py-[11px] font-Poppins bg-[#EFF2F5] px-2 font-semibold min-h-[54px] min-w-[3rem] rounded-xl flex flex-col text-center items-center mb-1 sm:mb-0">
      <span>{a}</span>
      <span className="text-[11px]">{b}</span>
    </div>
  );
};

const DateView = ({ date }: { date: Date }) => {
  return (
    <div className=" text-[14px] font-semibold text-[#373B63] bg-[#EFF2F5] min-w-[6rem] h-[92%] min-h-[54px] rounded-xl flex items-center justify-center mb-1 sm:mb-0">
      {date.getDate()} - {date.toLocaleString("en-US", { weekday: "short" })}
    </div>
  );
};
