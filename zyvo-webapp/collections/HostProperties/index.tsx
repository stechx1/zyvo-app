import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

export default function HostProperties({
  photoURL,
  fullName,
  mode,
  onMessageClick,
  showReviewButton = false,
  onReviewClick,
  onProfileClick,
  bottomText,
  bottomTextIcon,
  cardStyle,
  isVerified = false,
}: {
  photoURL: string;
  fullName: string;
  mode: "GUEST" | "HOST";
  onMessageClick?: () => void;
  showReviewButton?: boolean;
  onReviewClick?: () => void;
  onProfileClick?: () => void;
  bottomText: string;
  bottomTextIcon: string;
  cardStyle?: "mobile" | "desktop";
  isVerified?: boolean;
}) {
  return (
    <>
      {cardStyle !== "mobile" ? (
        <div className="border rounded-[6%] sm:rounded-lg lg:rounded-2xl p-4 text-center bg-white">
          <div className="text-[19px]">{`${
            mode === "GUEST" ? "Hosted" : "Guest"
          } By`}</div>
          <div
            className="flex items-center justify-center space-x-2"
            role={onProfileClick ? "button" : ""}
            onClick={() => onProfileClick && onProfileClick()}
          >
            <div>
              <div className="rounded-full border-2 border-gray-200 p-1">
                <Image
                  src={photoURL ? photoURL : "/icons/profile-icon.png"}
                  alt="profile-pic"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-[22px]">{fullName}</div>
            <div>
              {isVerified && (
                <Image
                  src={"/icons/green-tick.svg"}
                  alt="tick"
                  width={15}
                  height={15}
                  className="sm:w-[22px] sm:h-[22px]"
                />
              )}
            </div>
          </div>
          <hr className="my-4" />
          {showReviewButton && (
            <Button
              type="gray"
              text={`Review ${mode === "GUEST" ? "Booking" : "Guest"}`}
              bordered
              rounded
              full
              className="border-gray-700 my-2"
              onClick={() => onReviewClick && onReviewClick()}
            />
          )}
          <Button
            type="white"
            text={`Message the ${mode === "GUEST" ? "host" : "guest"}`}
            bordered
            rounded
            full
            className="border-gray-700"
            onClick={() => onMessageClick && onMessageClick()}
          />
          <div className="flex items-center justify-center space-x-2 mt-3">
            <Image
              src={bottomTextIcon}
              alt="time"
              width={15}
              height={15}
              className="sm:w-[22px] sm:h-[22px]"
            />
            <div>{bottomText}</div>
          </div>
        </div>
      ) : (
        <div className="py-3 flex border rounded-2xl">
          <div className="text-sm px-3 w-[45%] border-r-2">
            Hosted by
            <div className="flex items-center mt-2">
              <div className="rounded-full border-2 border-gray-200 p-1">
                <Image
                  src={photoURL ? photoURL : "/icons/profile-icon.png"}
                  alt="profile-pic"
                  width={25}
                  height={25}
                  className="rounded-full min-w-[25px]"
                />
              </div>
              <div className="text-base font-medium mx-1">{fullName}</div>
              {isVerified && (
                <Image
                  src={"/icons/green-tick.svg"}
                  alt="tick"
                  width={15}
                  height={15}
                />
              )}
            </div>
          </div>
          <div className="px-4 w-[55%] space-y-2 flex flex-col justify-center">
            <div className="flex items-center justify-center text-sm space-x-2">
              <Image src={bottomTextIcon} alt="time" width={15} height={15} />
              <div>{bottomText}</div>
            </div>
            <Button
              type="white"
              text={`Message the ${mode === "GUEST" ? "host" : "guest"}`}
              bordered
              rounded
              full
              className="border-gray-700"
              onClick={() => onMessageClick && onMessageClick()}
            />
          </div>
        </div>
      )}
    </>
  );
}
