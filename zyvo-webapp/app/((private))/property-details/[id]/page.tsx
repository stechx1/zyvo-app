"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AccordionItem } from "@/types";
import Accordion from "@/components/Accordion/Accordion";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getPlaceSnapshot } from "@/firebase/place";
import { Place } from "@/types/place";
import HostProperties from "@/collections/HostProperties";
import { getUserByRef } from "@/firebase/user";
import { User } from "@/types/user";
import { getFullName, timeArray } from "@/lib/utils";
import { DocumentReference } from "firebase/firestore";
import AvailabilitySelection from "@/collections/AvailabilitySelection";
import toast from "react-hot-toast";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useScreenDimensions } from "@/hooks/useScreenDimension";

export type BookingDetailsType = {
  placeId: string;
  hours: number;
  date: string;
  from: string;
  to: string;
};

const PropertyDetailsPage = ({ params }: { params: { id: string } }) => {
  const { user, mode } = useAuthContext();
  const [place, setPlace] = useState<Place | null>(null);
  const [readMore, setReadMore] = useState<boolean>(false);
  const [placeUser, setPlaceUser] = useState<null | User>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedavailableHoursTo, setSelectedavailableHoursTo] =
    useState<string>();
  const [selectedavailableHoursFrom, setSelectedavailableHoursFrom] =
    useState<string>();
  const [hours, setHours] = useState(1);
  const [width] = useScreenDimensions();

  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
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
  }, [user]);

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
      const data: BookingDetailsType = {
        placeId: place?.placeId,
        hours,
        date: selectedDate.toISOString(),
        from: selectedavailableHoursFrom,
        to: selectedavailableHoursTo,
      };
      router.push("/checkout?data=" + JSON.stringify(data));      
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

  return (
    <div className="flex sm:container sm:mx-auto my-5 sm:px-14 md:px-10 gap-2 flex-col">
      <div className="flex flex-row ">
        <div className="text-black text-[18px] sm:text-4xl font-normal font-Poppins">
          {place?.description}
        </div>
        <div className="sm:hidden flex space-x-2 ml-2 items-center">
          <p className="flex items-center text-[13px] sm:text-[16px] text-primary-amber-500 mr-0 font-Poppins">
            <Image
              src={"/icons/orange-star-icon.svg"}
              alt="star-icon"
              width={14}
              height={14}
              className="mr-1"
            />
            {place?.rating?.toFixed(1)}
          </p>
          <p className=" sm:text-[16px] text-[13px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins">{`(${
            place?.reviewsCount ?? 0
          } reviews)`}</p>
        </div>
      </div>

      {/* Icon's Details */}
      <div className="flex justify-between mb-3">
        {/* =================================== Left Description =============================  */}
        <div className="items-center flex gap-[1rem] sm:gap-4">
          <div className="space-x-4 sm:space-x-2 hidden sm:flex">
            <p className="flex items-center text-[11px] sm:text-[16px] text-primary-amber-500 mr-0 text-lg font-Poppins">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={14}
                height={14}
                className="mr-1"
              />
              {place?.rating?.toFixed(1)}
            </p>
            <p className=" sm:text-[16px] text-[11px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins text-lg">{`(${
              place?.reviewsCount ?? 0
            } reviews)`}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[12px] sm:text-base">
            <Image
              src={"/icons/time.svg"}
              alt="time"
              width={20}
              height={20}
              className="opacity-70"
            />
            <div>{place?.minHours} hr min</div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[12px] sm:text-base">
            <Image
              src={"/icons/square-fit-icon.svg"}
              alt="square-fit"
              width={18}
              height={18}
            />
            <div>323 sqft</div>
          </div>
        </div>

        {/* =================================== Right Description =============================  */}

        <div className="flex space-x-4">
          <div className="flex items-center justify-center space-x-2 font-Poppins text-[12px] sm:text-base">
            <Image
              src={"/icons/gray-share-icon.svg"}
              alt="share-icon"
              width={19}
              height={19}
            />
            <div>Share</div>
          </div>
          <div className="flex items-center justify-center space-x-2 font-Poppins text-[12px] sm:text-base">
            <Image
              src={"/icons/gray-heart-icon.svg"}
              alt="heart-icon"
              width={22}
              height={22}
              className="opacity-50"
            />
            <div>Favorite</div>
          </div>
        </div>
      </div>

      {/* Pictures of Property*/}
      <div className="flex xl:space-x-3 xl:h-[58vh] lg:h-[50vh] md:h-[50vh] sm:h-[45vh] h-[30vh] lg:space-x-3 md:space-x-2 sm:space-x-3 space-x-2 w-full">
        <Image
          src={getImagesOnIndex(0)}
          alt="detail-image"
          className="w-3/5 bg-gray-100 object-cover rounded-tl-[20px] rounded-bl-[20px]"
          width={200}
          height={170}
        />
        <div className="hidden md:flex md:flex-col md:w-1/4 gap-2 md:gap-2 xl:gap-3 lg:gap-3 sm:gap-3">
          <Image
            src={getImagesOnIndex(1)}
            alt="detail-image"
            className="object-cover w-full h-1/2"
            width={200}
            height={470}
          />
          <Image
            src={getImagesOnIndex(2)}
            alt="detail-image"
            className="object-cover w-full h-1/2"
            width={200}
            height={470}
          />
        </div>
        <div className="flex flex-col w-2/5 md:w-1/4 gap-2 xl:gap-3 lg:gap-3 md:gap-2 sm:gap-3">
          <Image
            src={getImagesOnIndex(3)}
            alt="detail-image"
            className="object-cover w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
          <Image
            src={getImagesOnIndex(4)}
            alt="detail-image"
            className="object-cover w-full h-1/2 rounded-tr-[20px] rounded-br-[20px]"
            width={200}
            height={470}
          />
        </div>
      </div>

      {place && (
        <div className="sm:hidden md:hidden lg:hidden xl:hidden block mt-7 border rounded-lg p-4 text-center space-y-2 mb-8">
          <div className="text-2xl">${place?.pricePerHour}/hr</div>
          <div className="text-sm text-gray-800">
            {place?.minHours} hr minimum
          </div>

          <hr />

          <div className="flex items-center justify-between space-x-2">
            <div className="text-sm text-gray-800">
              {place?.discountedMinHours}+ Hrs discount
            </div>
            <div className="text-sm text-gray-800">
              {place?.discountPercentage}% off
            </div>
          </div>
        </div>
      )}

      <div className="sm:hidden block border border-gray-700 rounded-xl">
        {width <= 640 && (
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
          />
        )}
      </div>

      <div className="my-8 block sm:hidden md:hidden lg:hidden xl:hidden">
        <HostProperties
          mode={mode}
          bottomText="Typically responds within 1 hr"
          bottomTextIcon="/icons/time.svg"
          photoURL={placeUser?.photoURL ?? ""}
          fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
          onMessageClick={() => {
            router.push("/messages?userId=" + placeUser?.userId);
          }}
        />
      </div>

      <div className="sm:flex sm:gap-10 my-10 sm:my-20">
        {/* =================================Left Section=================================== */}

        <div className="w-full sm:w-[70%]">
          <div className="flex flex-col gap-3">
            <div className="text-black text-[18px] sm:text-2xl font-normal font-Poppins">
              About the Space
            </div>
            <div className={`${!readMore && "line-clamp-3"}`}>
              <div className="text-black text-[14px] sm:text-lg font-normal">
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
            <p className="font-Poppins text-[18px] sm:text-2xl font-medium">
              Included in your booking
            </p>
            <div className="flex flex-wrap xl:gap-6 lg:gap-6 md:gap-6 sm:gap-6 gap-2">
              {place?.ameneties.map((amenety) => (
                <div
                  className={`border rounded-xl xl:py-3 lg:py-3 md:py-3 sm:py-3 py-1 px-2 xl:px-5 lg:px-5 md:px-5 sm:px-4 xl:gap-3 lg:gap-3 gap-3 w-fit flex items-center`}
                  key={amenety}
                >
                  <Image
                    src={"/icons/amenety-icon.png"}
                    alt={"icon"}
                    width={40}
                    height={40}
                    className="xl:w-[40] lg:w-[40] md:w-[40] sm:w-[40] w-[2rem] xl:h-[40] "
                  />

                  <div className="text-black text-[14px] sm:text-lg font-normal capitalize">
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
            <p className="font-Poppins text-[18px] sm:text-2xl font-medium">
              Rules
            </p>
            <div className="w-full">
              <Accordion items={accordionItems} />
            </div>
          </div>
          <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>

          {/* ================================= Add-ons from the host =================================== */}

          <div className="flex-col flex xl:gap-7 lg:gap-7 md:gap-7 sm:gap-7 gap-2">
            <div className="flex flex-col xl:gap-2 lg:gap-2 md:gap-2">
              <p className="font-Poppins text-[18px] sm:text-2xl font-medium">
                Add-ons from the host
              </p>
              <p className="text-[14px] sm:text-lg">
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
                    <p className="font-medium">{addOn.name}</p>
                    <div className="flex gap-2">
                      <p>${addOn.price} / item</p>
                    </div>
                  </div>
                </div>
              ))}
              {place?.addOns.length === 0 && <div>No Add Ons Added!</div>}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
        </div>
        <div className="w-full sm:w-[30%] hidden sm:block md:block lg:block xl:block">
          {place && (
            <div className="border rounded-lg p-4 text-center space-y-2 mb-8">
              <div className="text-2xl">${place?.pricePerHour}/hr</div>
              <div className="text-sm text-gray-800">
                {place?.minHours} hr minimum
              </div>

              <hr />

              <div className="flex items-center justify-between space-x-2">
                <div className="text-sm text-gray-800">
                  {place?.discountedMinHours}+ Hrs discount
                </div>
                <div className="text-sm text-gray-800">
                  {place?.discountPercentage}% off
                </div>
              </div>
            </div>
          )}

          {user && placeUser && user?.userId !== placeUser?.userId && (
            <>
              <div className="sm:block md:block lg:block xl:block hidden border border-gray-700 rounded-xl">
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
                />
              </div>
              <div className="my-8 hidden sm:block md:block lg:block xl:block">
                <HostProperties
                  mode={mode}
                  bottomText="Typically responds within 1 hr"
                  bottomTextIcon="/icons/time.svg"
                  photoURL={placeUser?.photoURL ?? ""}
                  fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
                  onMessageClick={() => {
                    router.push("/messages?userId=" + placeUser?.userId);
                  }}
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
