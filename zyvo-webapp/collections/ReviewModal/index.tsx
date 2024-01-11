import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  handleSubmit: (data: {
    comment: string;
    placeRating: number;
    communicationRating: number;
    responseRating: number;
  }) => void;
}

function ReviewModal(props: Props) {
  const [comment, setComment] = useState("");
  const [placeRating, setPlaceRating] = useState(0);
  const [communicationRating, setCommunicationeRating] = useState(0);
  const [responseRating, setResponseeRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
              src={
                responseRating >= index + 1
                  ? "/icons/starIcon.svg"
                  : "/icons/empty-star-icon.svg"
              }
              alt="rate-icon"
              onClick={() => {
                setResponseeRating(index + 1);
              }}
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
              src={
                communicationRating >= index + 1
                  ? "/icons/starIcon.svg"
                  : "/icons/empty-star-icon.svg"
              }
              alt="rate-icon"
              onClick={() => {
                setCommunicationeRating(index + 1);
              }}
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
              src={
                placeRating >= index + 1
                  ? "/icons/starIcon.svg"
                  : "/icons/empty-star-icon.svg"
              }
              alt="rate-icon"
              onClick={() => {
                setPlaceRating(index + 1);
              }}
            />
          ))}
        </div>
      </div>
      <textarea
        className="outline-none border rounded-xl p-3 w-full"
        placeholder="Message.."
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        className="w-full"
        text="Publish Review"
        type="green"
        roundedfull
        disabled={!communicationRating && !placeRating && !responseRating}
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
          props.handleSubmit({
            comment,
            communicationRating,
            placeRating,
            responseRating,
          });
        }}
      />
    </div>
  );
}

export default ReviewModal;
