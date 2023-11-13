import { useAuthContext } from "@/context/AuthContext";
import { ProfileContactSection } from "./ProfileContactSection";
import Image from "next/image";

export const RightProfileSection = () => {
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
      subTitle: "Confirm Now",
      iconSrc: "/icons/white-phone-icon.svg",
      iconAlt: "phone-icon",
      isLink: true,
    },
    {
      title: "Verify Identity",
      subTitle: "Confirm Now",
      iconSrc: "/icons/gray-profile-icon.svg",
      iconAlt: "profile-icon",
      isLink: true,
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
              className={`w-[156px] h-[156px] rounded-full ${
                !user?.photoURL && "opacity-10"
              }`}
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
          <div className="text-black text-[20px] font-light font-Poppins">
            Guest
          </div>
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
