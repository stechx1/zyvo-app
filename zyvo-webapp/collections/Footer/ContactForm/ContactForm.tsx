import React from "react";
import Image from "next/image";

export const ContactForm = () => {
  return (
    <div className="flex items-center rounded-full border border-white py-1 sm:py-2 ps-3 pr-1.5 sm:px-3">
      <input
        className="w-full rounded-full border-0 outline-none text-white bg-transparent"
        type="email"
        placeholder="your@email.com"
      />
      <div className="rounded-l-xl">
        <Image
          src={"/icons/send-icon.svg"}
          alt="send-icon"
          width={40}
          height={40}
          className="cursor-pointer w-[35px] xxs:w-[40px]"
        />
      </div>
    </div>
  );
};
