import { ProfileContactSection } from "@/collections/Profile/RightProfileSection/ProfileContactSection";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";

export const RightAccountSection = () => {
  const { user } = useAuthContext();
  const profileInfo = [
    {
      title: "Email Address",
      subTitle: "Verified",
      iconSrc: "/icons/white-email-icon.svg",
      iconAlt: "email-icon",
      subTitleIcon: "/icons/check-mark-white-background.svg",
      isLink: false,
    },
    {
      title: "Phone Number",
      subTitle: "Verified",
      iconSrc: "/icons/white-phone-icon.svg",
      iconAlt: "phone-icon",
      subTitleIcon: "/icons/check-mark-white-background.svg",
      isLink: false,
    },
    {
      title: "Verify Identity",
      subTitle: "Verified",
      iconSrc: "/icons/gray-profile-icon.svg",
      iconAlt: "profile-icon",
      subTitleIcon: "/icons/check-mark-white-background.svg",
      isLink: false,
    },
  ];
  return (
    <div className="w-[30%] flex flex-col gap-10">
      <div className="h-[380px] w-full rounded-3xl border border-secondary-neutral-200 p-6 items-center justify-center flex-col flex">
        <div className="relative">
          <div className="w-[188px] h-[188px] border-8 border-secondary-neutral-200 bg-white rounded-full flex items-center justify-center">
            <Image
              src={user?.photoURL ?? "/icons/profile-icon.png"}
              alt="Profile Image"
              className="w-[156px] h-[156px] rounded-full"
              width={156}
              height={156}
            />
          </div>
          <div className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full bg-secondary-green flex items-center justify-center absolute top-36 right-4">
            <Image
              src="/icons/plus-icon.svg"
              alt="plus-icon"
              width={13}
              height={13}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="gap-1 flex flex-col items-center">
          <div className="text-black text-[28px] font-medium font-Poppins mt-[20px]">
            Katelyn
          </div>
          <button className="bg-secondary-gray-700 text-white text-[18px] py-2 px-16 rounded-md flex w-full items-center justify-center">
            Edit my Profile
          </button>
        </div>
      </div>
      <div className="rounded-3xl bg-secondary-gray-700 p-5">
        {profileInfo.map((item, index) => (
          <div key={index}>
            <ProfileContactSection profileInfo={item} />
            {index !== profileInfo.length - 1 && (
              <div className="h-[0.5px] my-5 opacity-[0.20] bg-secondary-neutral-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
