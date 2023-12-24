import Image from "next/image";
import React from "react";

export default function OrderAmountBox() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex">
        <Image
          src={"/images/dummyImage-1.png"}
          alt="image"
          width={95}
          height={95}
          className="rounded-xl object-cover"
        />
        <div className="ml-4">
          <div className="text-[#A4A4A4] text-sm">
            <span>Order Code #12345AB</span>
          </div>
          <div className="text-xl">Cabin in Peshastin</div>
          <div className="flex">
            <Image
              src={"/icons/starIcon.svg"}
              alt="star-icon"
              width={15}
              height={15}
            />
            <div className="ml-1">
              <span className="text-[#FCA800] text-sm">
                5,0 <span className="text-[#A4A4A4]"> (1k+)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center">
        <div>2 Hours</div>
        <div>$300</div>
      </div>
      <div className="flex justify-between items-center">
        <div>Zyvo Service Fee</div>
        <div>$2</div>
      </div>
      <div className="flex justify-between items-center">
        <div>Cleaning Fee</div>
        <div>$20</div>
      </div>
      <div className="flex justify-between items-center">
        <div>Taxes</div>
        <div>$10</div>
      </div>
      <hr />
      <div className="flex justify-between items-center text-xl">
        <div>Total</div>
        <div>$322</div>
      </div>
    </div>
  );
}
