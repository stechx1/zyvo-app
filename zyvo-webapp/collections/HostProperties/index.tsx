import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

export default function HostProperties({
  photoURL,
  fullName,
  buttonText,
  onClick,
}: {
  photoURL: string;
  fullName: string;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 text-center space-y-2">
      <div>Hosted By</div>
      <div className="flex items-center justify-center space-x-2">
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
      <Button
        type="white"
        text={buttonText}
        bordered
        rounded
        full
        className="border-gray-700"
        onClick={() => onClick && onClick()}
      />
      <div className="flex items-center justify-center space-x-2">
        <Image src={"/icons/time.svg"} alt="time" width={15} height={15} />
        <div>Typically responds within 1 hr</div>
      </div>
    </div>
  );
}
