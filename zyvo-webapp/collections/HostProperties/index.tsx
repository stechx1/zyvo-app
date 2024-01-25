import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
}) {
  const router = useRouter();
  return (
    <div className="border rounded-lg p-4 text-center space-y-2">
      <div>{`${mode === "GUEST" ? "Hosted" : "Guest"} By`}</div>
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
        <div className="text-lg">{fullName}</div>
        <div>
          <Image
            src={"/icons/green-tick.svg"}
            alt="tick"
            width={15}
            height={15}
          />
        </div>
      </div>
      <hr />
      {showReviewButton && (
        <Button
          type="gray"
          text={`Review ${mode === "GUEST" ? "Booking" : "Guest"}`}
          bordered
          rounded
          full
          className="border-gray-700"
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
      <div className="flex items-center justify-center space-x-2">
        <Image src={bottomTextIcon} alt="time" width={15} height={15} />
        <div>{bottomText}</div>
      </div>
    </div>
  );
}
