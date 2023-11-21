import { ProfileContactSection } from "@/collections/Profile/RightProfileSection/ProfileContactSection";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export const RightAccountSection = () => {
  const { user } = useAuthContext();
  return (
    <div className="w-[30%] flex flex-col gap-10">
      <div className="h-[380px] w-full rounded-3xl border border-secondary-neutral-200 p-6 items-center justify-center flex-col flex">
        <div className="relative">
          <div className="w-[188px] h-[188px] border-8 border-secondary-neutral-200 bg-white rounded-full flex items-center justify-center">
            <Image
              src={user?.photoURL ? user?.photoURL : "/icons/profile-icon.png"}
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
          <Link
            href={"/profile"}
            className="bg-secondary-gray-700 text-white text-[18px] py-2 px-16 rounded-md flex w-full items-center justify-center"
          >
            Edit my Profile
          </Link>
        </div>
      </div>
      <div className="rounded-3xl bg-secondary-gray-700 p-5">
        <ProfileContactSection />
      </div>
    </div>
  );
};
