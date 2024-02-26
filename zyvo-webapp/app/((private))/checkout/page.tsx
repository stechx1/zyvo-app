"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCommonContext } from "@/context/CommonContext";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/types/user";
import { Place } from "@/types/place";
import { getPlaceByRef } from "@/firebase/place";
import { DocumentReference } from "firebase/firestore";
import { getUserByRef } from "@/firebase/user";
import HostProperties from "@/collections/HostProperties";
import { getFullName } from "@/lib/utils";
import { getBookingSnapshot } from "@/firebase/booking";
import { Booking } from "@/types/booking";
import PropertySideDetails from "@/collections/PropertySideDetails";
import { getRouteDetails } from "@/lib/actions";
import { useScreenDimensions } from "@/hooks/useScreenDimension";
import MobileSearchAndFilter from "@/components/MobileSearchInputandFilter";
import { Elements } from "@stripe/react-stripe-js";
import { createPaymentIntent, updatePaymentIntent } from "@/lib/stripeActions";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/collections/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const CheckoutPage = () => {
  const router = useRouter();
  const { user, mode, currentCoordinates } = useCommonContext();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [placeUser, setPlaceUser] = useState<null | User>();
  const [placeDistance, setPlaceDistance] = useState<number | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  const searchParams = useSearchParams();
  const [width] = useScreenDimensions();

  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
    if (!bookingId) {
      router.back();
      return;
    }
    const unsubscribe = getBookingSnapshot(
      bookingId,
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

  const getPlace = async (place: DocumentReference) => {
    const { result } = await getPlaceByRef(place);
    if (result) {
      setPlace(result);
      if (result.userRef) getUser(result.userRef);
    }
  };
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
  }, [place, currentCoordinates]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const createIntent = useCallback(
    async (price: number) => {
      if (bookingId) {
        const data = await createPaymentIntent(price, bookingId);
        if (data.clientSecret) setClientSecret(data.clientSecret);
      }
    },
    [createPaymentIntent, bookingId]
  );
  const updateIntent = useCallback(
    async (intentId: string, price: number) => {
      if (bookingId) {
        const data = await updatePaymentIntent(intentId, price);
        if (data.clientSecret) setClientSecret(data.clientSecret);
      }
    },
    [createPaymentIntent, bookingId]
  );

  useEffect(() => {
    if (booking && place) {
      if (booking.paymentIntentId) {
        updateIntent(
          booking.paymentIntentId,
          place.pricePerHour * booking.hours
        );
      } else {
        createIntent(place.pricePerHour * booking.hours);
      }
    }
  }, [createIntent, booking, place]);

  const getUser = async (sender: DocumentReference) => {
    const { result } = await getUserByRef(sender);
    if (result) {
      setPlaceUser(result);
    }
  };

  const getImagesOnIndex = (index: number) => {
    if (place?.images?.length && place?.images?.length > index) {
      return place?.images[index];
    }
    return "/images/no-image.jpg";
  };

  return (
    <>
      <div className="sm:container md:my-20 sm:px-14 md:px-5 lg:px-16">
        <div className="sm:hidden block">
          <MobileSearchAndFilter type="header" />
        </div>
        <hr className="sm:hidden block mx-[-20px] my-2.5" />
        <div className="md:flex md:gap-12">
          <div className="text-black mt-8 text-lg sm:text-4xl md:hidden font-normal font-Poppins">
            Checkout and Pay
          </div>
          <div className="md:hidden h-[0.5px] mt-[10px] mb-[10px] opacity-[0.20] bg-secondary-gray-700"></div>
          <div className="w-full md:w-[45%] lg:w-[35%] md:order-2">
            <div className="flex flex-col sm:space-y-8 space-y-4">
              {place && booking && (
                <div className="order-2 md:mt-0 mt-4 md:order-1 bg-white">
                  <PropertySideDetails
                    rating={place.rating}
                    reviewsCount={place.reviewsCount}
                    imageURL={getImagesOnIndex(0)}
                    price={place.pricePerHour * booking.hours}
                    description={place.description}
                    hours={booking.hours}
                    distance={placeDistance}
                  />
                </div>
              )}
              {placeUser && (
                <div className="order-1 md:order-2 bg-white">
                  <HostProperties
                    cardStyle={width < 640 ? "mobile" : "desktop"}
                    bottomText={
                      width < 640
                        ? "Respond within 1 hr"
                        : "Typically responds within 1 hr"
                    }
                    bottomTextIcon="/icons/time.svg"
                    mode={mode}
                    photoURL={placeUser?.photoURL ?? ""}
                    fullName={placeUser ? getFullName(placeUser) ?? "" : ""}
                    isVerified={placeUser?.emailVerified}
                    onMessageClick={() => {
                      router.push("/messages?userId=" + placeUser?.userId);
                    }}
                    onProfileClick={() =>
                      router.push("/profile?userId=" + placeUser.userId)
                    }
                  />
                </div>
              )}
            </div>
          </div>
          {/* =================================Left Section=================================== */}
          {place && user && clientSecret && booking && (
            <div className="w-full lg:w-[65%] md:w-[55%] md:order-1">
              <Elements options={options as any} stripe={stripePromise}>
                <CheckoutForm booking={booking} place={place} user={user} />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
