import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface Props {}

function ReviewModal(props: Props) {
  const {} = props;

  return (
    <div className="justify-center text-center px-10 py-5 space-y-5">
      <div className="font-bold">Review Booking</div>
      <div className="flex justify-between items-center">
        <div>Response Rate</div>
        <Image
          width={100}
          height={100}
          src={"/icons/ratings.svg"}
          alt="rate-icon"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>Communication</div>
        <Image
          width={100}
          height={100}
          src={"/icons/ratings.svg"}
          alt="rate-icon"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>Property</div>
        <Image
          width={100}
          height={100}
          src={"/icons/ratings.svg"}
          alt="rate-icon"
        />
      </div>
      <textarea
        className="outline-none border rounded-xl p-3 w-full"
        placeholder="Message.."
        rows={5}
      />
      <Button
        className="w-full"
        text="Publish Review"
        type="green"
        roundedfull
      />
    </div>
  );
}

export default ReviewModal;
