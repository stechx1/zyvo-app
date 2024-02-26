import React, { useState } from "react";
import Image from "next/image";
import { useCommonContext } from "@/context/CommonContext";
import { CustomDropdown } from "@/components/CustomDropdown/CustomDropdown";
import Input from "@/components/Input";
import Button from "@/components/Button";
import verifyEmail from "@/firebase/auth/verifyEmail";
import toast from "react-hot-toast";

export const ProfileContactSection = ({}) => {
  const { user } = useCommonContext();
  const [isOpenArray, setIsOpenArray] = useState(Array(3).fill(false));
  const profileInfo = [
    {
      title: "Email Address",
      iconSrc: "/icons/white-email-icon.svg",
      isVerified: !!user?.emailVerified,
    },
    {
      title: "Phone Number",
      iconSrc: "/icons/white-phone-icon.svg",
      isVerified: !!user?.phoneNumberVerified,
    },
    {
      title: "Verify Identity",
      iconSrc: "/icons/gray-profile-icon.svg",
      isVerified: false,
    },
  ];

  const toggleDropdown = (index: number) => {
    setIsOpenArray((prev) => {
      const newArray = [...prev];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const ConfirmPhoneNumber = () => {
    return (
      <div className="w-80 space-y-3 p-3">
        <Input type="text" roundedFull={false} placeholder="Phone number" />
        <Input type="text" roundedFull={false} placeholder="Enter code" />
        <Button type="gray" text="Save Changes" className="w-full" rounded />
        <u>Resend the code to Phone number</u>
      </div>
    );
  };

  const VerifyIdentity = () => {
    return (
      <div className="p-3 space-y-3">
        <Input type="text" roundedFull={false} placeholder="ID" />
        <input type="file" />
        <Button type="gray" text="Submit Document" className="w-full" rounded />
      </div>
    );
  };

  const openPhoneNumberDropdown = () => {
    setIsOpenArray((prev) => {
      const newArray = [...prev];
      newArray[1] = true;
      return newArray;
    });
  };

  const openIdentityVerificationDropdown = () => {
    setIsOpenArray((prev) => {
      const newArray = [...prev];
      newArray[2] = true;
      return newArray;
    });
  };

  const ConfirmEmail = () => {
    if (user && !user.emailVerified) {
      verifyEmail(user.email).then(({ error }) => {
        if (error) {
          toast.error(error.message);
        }else{
          toast.success("Verification Link sent to your email. Kindly Check your email.")
        }
      });
    }
  };
  return profileInfo.map((item, index) => (
    <div key={index}>
      <div className="flex items-center w-full justify-center sm:justify-start sm:space-x-3 flex-wrap">
        <div className="rounded-2xl bg-secondary-gray-600 text-center space-x-2 w-[90%] sm:w-[4.3rem] h-[4.3rem] flex items-center justify-center">
          <Image src={item.iconSrc} alt={"icon"} width={30} height={30} />
        </div>
        <div className="space-y-0">
          <div className="text-white text-[12.5px] sm:text-lg font-semibold">
            {item.title}
          </div>
          {item.isVerified ? (
            <div className="flex gap-2">
              <p className={`text-white text-xs sm:text-[18px] `}>Verified</p>
              <Image
                src={"/icons/check-mark-white-background.svg"}
                alt={"icon"}
                width={18}
                height={18}
                className="sm:w-[18px] w-[14px]"
              />
            </div>
          ) : (
            <div>
              <div
                onClick={
                  index == 0
                    ? ConfirmEmail
                    : index === 1
                    ? openPhoneNumberDropdown
                    : openIdentityVerificationDropdown
                }
                className={`text-white sm:mt-0 text-xs sm:text-[18px] font-thin opacity-[0.40] underline underline-offset-4 cursor-pointer`}
              >
                Confirm now
              </div>
              <CustomDropdown
                isOpen={isOpenArray[index]}
                setIsOpen={() => toggleDropdown(index)}
              >
                {index === 1 ? ConfirmPhoneNumber() : VerifyIdentity()}
              </CustomDropdown>
            </div>
          )}
        </div>
      </div>

      {index !== profileInfo.length - 1 && (
        <div className="h-[0.5px] hidden sm:block my-5 opacity-[0.20] bg-secondary-neutral-200"></div>
      )}
    </div>
  ));
};
