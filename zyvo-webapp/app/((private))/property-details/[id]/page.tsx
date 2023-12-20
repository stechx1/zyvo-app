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
import { profileData } from "@/types/profile";
import { getFullName } from "@/lib/utils";
import { DocumentReference } from "firebase/firestore";

const PropertyDetailsPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { id: string };
}) => {
  const { user } = useAuthContext();
  const [place, setPlace] = useState<Place | null>(null);
  const [placeUser, setPlaceUser] = useState<null | profileData>();
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
    <div className="flex container mx-auto my-24 px-14 md:px-10 gap-2  flex-col">
      <div className="text-black text-4xl font-normal font-Poppins">
        {place?.description}
      </div>

      {/* Icon's Details */}
      <div className="flex justify-between mb-3">
        {/* =================================== Left Description =============================  */}
        <div className="items-center flex gap-[0.3rem] sm:gap-4">
          <div className="flex space-x-2">
            <p className="flex items-center text-[11px] sm:text-[16px] text-primary-amber-500 mr-0 text-lg font-Poppins">
              <Image
                src={"/icons/orange-star-icon.svg"}
                alt="star-icon"
                width={14}
                height={14}
                className="mr-1"
              />
              {"5.0"}
            </p>
            <p className=" sm:text-[16px] text-[11px] text-secondary-neutral-400 mr-0 sm:mr-2 font-Poppins text-lg">{`(${30} reviews)`}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Image
              src={"/icons/time.svg"}
              alt="time"
              width={20}
              height={20}
              className="opacity-70"
            />
            <div>2 hr min</div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-lg">
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
          <div className="flex items-center justify-center space-x-2 font-Poppins text-lg">
            <Image
              src={"/icons/gray-share-icon.svg"}
              alt="share-icon"
              width={18}
              height={18}
            />
            <div>Share</div>
          </div>
          <div className="flex items-center justify-center space-x-2 font-Poppins text-lg">
            <Image
              src={"/icons/gray-heart-icon.svg"}
              alt="heart-icon"
              width={20}
              height={20}
              className="opacity-50"
            />
            <div>Favorite</div>
          </div>
        </div>
      </div>

      {/* Pictures of Property*/}
      <div className="flex space-x-4 w-full">
        <Image
          src={getImagesOnIndex(0)}
          alt="detail-image"
          className="w-1/2 h-auto rounded-tl-[20px] rounded-bl-[20px]"
          width={200}
          height={470}
        />
        <div className="hidden md:flex flex-col w-1/4 gap-4">
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
        <div className="flex flex-col w-1/4 gap-4">
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
      <div className="flex gap-10 my-20">
        {/* =================================Left Section=================================== */}

        <div className="w-[70%]">
          <div className="flex flex-col gap-3">
            <div className="text-black text-2xl font-normal font-Poppins">
              About the Space
            </div>
            <div className={` rounded-3xl `}>
              <div className="text-black text-lg font-normal">
                {place?.description ? place.description : "No Description!"}
              </div>
            </div>
          </div>
          {/* <p className="text-primary-emerald-300 text-lg mt-4 hover:underline cursor-pointer w-fit">
            Read more...
          </p> */}
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Included in the booking=================================== */}

          <div className="flex-col flex gap-7">
            <p className="font-Poppins text-2xl font-medium">
              Included in your booking
            </p>
            <div className="flex flex-wrap gap-6">
              {place?.ameneties.map((amenety) => (
                <div
                  className={`border rounded-xl py-3 px-5 gap-3 w-fit flex items-center`}
                  key={amenety}
                >
                  <Image
                    src={"/icons/amenety-icon.png"}
                    alt={"icon"}
                    width={40}
                    height={40}
                  />

                  <div className="text-black text-lg font-normal capitalize">
                    {amenety.toLowerCase()}
                  </div>
                </div>
              ))}
              {place?.ameneties.length === 0 && <div>No Ameneties</div>}
            </div>
          </div>
          <div className="h-[0.5px]  my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
          {/* ================================= Rules Accordion=================================== */}
          <div className="flex-col flex gap-7">
            <p className="font-Poppins text-2xl font-medium">Rules</p>
            <div className="w-full">
              <Accordion items={accordionItems} />
            </div>
          </div>
          <div className="h-[0.5px] my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>

          {/* ================================= Add-ons from the host =================================== */}

          <div className="flex-col flex gap-7">
            <div className="flex flex-col gap-2">
              <p className="font-Poppins text-2xl font-medium">
                Add-ons from the host
              </p>
              <p className="text-lg">
                Host provided services, items or options. Available at checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {place?.addOns.map((addOn, index) => (
                <div
                  className="flex items-center rounded-xl border border-secondary-neutral-200 py-3 px-4"
                  key={index}
                >
                  <div className="rounded-xl bg-gray-100 w-16 h-16 flex items-center justify-center mr-4">
                    <Image
                      src={"/icons/addon-icon.png"}
                      alt={addOn.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium">{addOn.name}</p>
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
        <div className="w-[30%]">
          {user?.userId !== placeUser?.userId && (
            <HostProperties
              photoURL={user?.photoURL ?? ""}
              fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
              buttonText="Message the host"
              onClick={() => {
                router.push("/messages?userId=" + placeUser?.userId);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
