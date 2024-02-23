import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AccordionItem } from "@/types";
import { Place } from "@/types/place";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDate, formatTime } from "@/lib/utils";
import Accordion from "@/components/Accordion/Accordion";
import Button from "@/components/Button";
import { User } from "@/types/user";
import { Booking } from "@/types/booking";

interface CheckoutFormProps {
  place: Place;
  booking: Booking;
  user: User;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  place,
  booking,
  user,
}) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4000/confirmation/" + booking.bookingId,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      console.log(error.message ?? null);
    } else {
      console.log("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

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
          label: formatDate(booking.to.toISOString()),
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
  return (
    <>
      {/* <PaymentElement
        id="payment-element"
        options={{
          layout: "auto",
        }}
      />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>} */}
      <div className="flex flex-col sm:gap-3">
        <div className="flex flex-row">
          <div
            role="button"
            onClick={() => {
              router.push("/");
            }}
            className="hidden md:block"
          >
            <Image
              src="/icons/back-arrow.svg"
              alt="back-arrow"
              width={35}
              height={35}
              className="cursor-pointer mr-3"
            />
          </div>
          <div className="hidden md:block mt-1 text-black text-3xl font-normal font-Poppins">
            Checkout and Pay
          </div>
        </div>
        <div className=" h-[0.5px] mt-4 mb-6 sm:mb-[50px] opacity-[0.20] bg-secondary-gray-700"></div>
        {/* =================================Booking Details=================================== */}
        <div className="text-black text-lg sm:text-2xl font-medium font-Poppins">
          Booking Details
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {bookingDetails.map((tag) => (
            <div
              className={`border bg-white border-neutral-200 rounded-full py-2.5 px-3 gap-3 w-fit flex items-center`}
              key={tag.id}
            >
              <Image
                src={tag.icon}
                alt={tag.iconAlt}
                width={20}
                height={20}
                className="w-[15px] sm:w-[24px] sm:h-[24px]"
              />
              <div className="text-black text-[13px] mt-[1px] sm:text-[19px] font-normal whitespace-nowrap">
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

        <div className="flex-col flex gap-4">
          <div className="flex flex-row justify-between">
            <p className="font-Poppins text-lg sm:text-2xl font-medium">
              Payment Method
            </p>
          </div>
          <div className="flex flex-col gap-3 w-[100%]">
            <PaymentElement
              id="payment-element"
              options={{
                layout: "auto",
              }}
            />
          </div>
        </div>
        <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>
        <div className="text-black text-lg sm:text-2xl font-normal font-Poppins">
          Refund Policies
        </div>
        <div className={` rounded-3xl `}>
          <div className="text-black text-sm sm:text-h4 font-normal">
            Description of refund policies...
          </div>
        </div>
      </div>
      <p className="text-primary-emerald-300 text-[15px] sm:text-lg mt-4 hover:underline cursor-pointer w-fit">
        Read more...
      </p>
      <div className="h-[0.5px] my-[30px] sm:my-[50px]  opacity-[0.20] bg-secondary-gray-700"></div>

      {/* ================================= Rules Accordion=================================== */}
      <div className="flex-col flex gap-2 sm:gap-5">
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
      <div className="h-[0.5px] my-[30px] sm:my-[50px] opacity-[0.20] bg-secondary-gray-700"></div>
      <Button
        className="sm:mb-0 mb-16 h-[2.5rem] sm:h-auto w-[8rem] sm:w-[14rem]"
        text="Confirm & Pay"
        onClick={handleSubmit}
        type="green"
        roundedfull
        disabled={isLoading || !stripe || !elements}
        isLoading={isLoading}
      />
    </>
  );
};

export default CheckoutForm;
