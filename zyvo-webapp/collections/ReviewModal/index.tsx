import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface Props {}

function ReviewModal(props: Props) {
  const {} = props;

  return (
    <div className="justify-center text-center px-5 sm:px-10 py-5 space-y-5">
      <div className="font-bold">Review Booking</div>
      <div className="flex justify-between items-center">
        <div>Response Rate</div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              width={18}
              height={18}
              src={"/icons/empty-star-icon.svg"}
              alt="rate-icon"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>Communication</div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              width={18}
              height={18}
              src={"/icons/empty-star-icon.svg"}
              alt="rate-icon"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>Property</div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              width={18}
              height={18}
              src={"/icons/empty-star-icon.svg"}
              alt="rate-icon"
            />
          ))}
        </div>
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
