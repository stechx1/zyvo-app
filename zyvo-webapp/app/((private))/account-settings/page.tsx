"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "@/types/profile";
import Input from "@/components/Input";
import { InputSectionProps } from "@/types";
import Button from "@/components/Button";
import { ProfileContactSection } from "@/collections/Profile/RightProfileSection/ProfileContactSection";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import addData from "@/firebase/firestore/addData";
import toast from "react-hot-toast";
import Link from "next/link";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";

const storage = getStorage(firebase_app);

const InputSection: React.FC<InputSectionProps> = ({
  title,
  inputName,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <>
    <div className="flex flex-col gap-3 w-full sm:w-[40%]">
      <p className="font-Poppins text-[18px] sm:text-lg font-normal">{title}</p>
      <Input
        name={inputName}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
    <div className="h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
  </>
);
const AccountSettingPage = () => {
  const { user, setUser } = useAuthContext();
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>();
  const [accountSettings, setAccountSettings] = useState<User>({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    emailVerified: false,
    photoURL: "",
    phoneNumber: "",
    phoneNumberVerified: false,
    isSocialLogin: true,
  });
  useEffect(() => {
    if (user) setAccountSettings(user);
  }, [user]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);

    setImgPreview(objectUrl);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const submitProfile = async () => {
    if (auth.currentUser && user) {
      setIsLoading(true);
      if (selectedFile) {
        const profileImgRef = ref(
          storage,
          `profile-images/${selectedFile.name}`
        );

        await uploadBytes(profileImgRef, selectedFile);
        const profileImageURL = await getDownloadURL(profileImgRef);
        user.photoURL = profileImageURL;
      }
      addData("users", auth.currentUser?.uid, {
        ...accountSettings,
      })
        .then(({ result, error }) => {
          if (error) {
            toast.error(error?.message);
            return;
          }

          toast.success("Profile updated Successfully");

          setUser({
            ...accountSettings,
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="flex flex-col sm:container sm:flex-row lg:gap-20 gap-10">
      <div className="w-full sm:w-[30%] flex flex-col gap-10 sm:order-2">
        <div className="sm:hidden flex flex-col gap-3">
          <div className="text-black text-[18px] sm:text-2xl font-normal font-Poppins">
            Account Settings
          </div>
          <div className={` rounded-3xl `}>
            <div className="text-black text-[15px] sm:text-lg font-normal">
              Change your account settings here
            </div>
          </div>
        </div>
        <div className="h-full sm:h-[380px] w-full rounded-3xl border border-secondary-neutral-200 p-3 sm:p-6 items-center sm:justify-center flex-row sm:flex-col flex">
          <div className="relative">
            <div className="w-[59px] h-[59px] sm:w-[188px] sm:h-[188px] border-8 border-secondary-neutral-200 bg-white rounded-full flex items-center justify-center">
              <Image
                src={
                  imgPreview
                    ? imgPreview
                    : user?.photoURL
                      ? user?.photoURL
                      : "/icons/profile-icon.png"
                }
                alt="Profile Image"
                className={`sm:w-[156px] sm:h-[156px] rounded-full ${!user?.photoURL && "opacity-10"
                  }`}
                width={156}
                height={156}
              />
            </div>
            <div className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full bg-secondary-green flex items-center justify-center absolute left-10 bottom-1 sm:top-36 sm:left-36">
              <label htmlFor="files">
                <Image
                  src="/icons/plus-icon.svg"
                  alt="plus-icon"
                  width={13}
                  height={13}
                  className="cursor-pointer"
                />
              </label>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            id="files"
            onChange={onSelectFile}
            className="hidden"
          />
          <div className="gap-1 flex flex-row sm:flex-col ml-4 sm:ml-0 items-center w-full justify-between">
            <div className="flex flex-col sm:items-center">
              <div className="text-black text-[16px] sm:text-[28px] font-medium font-Poppins sm:mt-[20px]">
                {user?.firstName + " " + user?.lastName}
              </div>
              <div className="text-black text-[13px] sm:text-[20px] font-light font-Poppins">
                Guest
              </div>
            </div>
            <Link
              href={"/profile"}
              className="bg-secondary-gray-700 text-white text-[14px] sm:text-[18px] py-2 px-2 sm:px-10 rounded-md flex h-9 sm:h-auto w-fit
               sm:w-full items-center justify-center"
            >
              Edit my Profile
            </Link>
          </div>
        </div>
        <div className=" rounded-3xl bg-secondary-gray-700 p-3 sm:p-5 flex sm:flex-col object-contain">
          <ProfileContactSection />
        </div>
      </div>
      <div className="w-full sm:w-[70%] flex flex-col gap-12 sm:order-1">
        <div className="hidden sm:flex flex-col gap-3">
          <div className="text-black text-2xl font-normal font-Poppins">
            Account Settings
          </div>
          <div className={` rounded-3xl `}>
            <div className="text-black text-lg font-normal">
              Change your account settings here
            </div>
          </div>
        </div>
        <InputSection
          title="Email"
          inputName="email"
          type="text"
          value={accountSettings?.email ?? ""}
          placeholder="Email..."
          onChange={handleChange}
        />

        <InputSection
          title="Phone Number"
          inputName="phone"
          type="text"
          value={accountSettings?.phone ?? ""}
          placeholder="Phone Number..."
          onChange={handleChange}
        />
        {!accountSettings?.isSocialLogin && (
          <InputSection
            title="Password"
            inputName="password"
            type="password"
            value={accountSettings?.password ?? ""}
            placeholder="Password..."
            onChange={handleChange}
          />
        )}

        <div className="flex flex-col gap-3 w-[100%]">
          <p className="font-Poppins text-lg font-normal">Address</p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4">
            <Input
              name="country"
              type="text"
              onChange={handleChange}
              value={accountSettings?.country ?? ""}
              placeholder="Country..."
            />

            <Input
              name="state"
              type="text"
              onChange={handleChange}
              value={accountSettings?.state ?? ""}
              placeholder="State..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4">
            <Input
              name="city"
              type="text"
              onChange={handleChange}
              value={accountSettings?.city ?? ""}
              placeholder="City..."
            />
            <Input
              name="street"
              type="text"
              onChange={handleChange}
              value={accountSettings?.street ?? ""}
              placeholder="Street..."
            />
          </div>
        </div>
        <div className="h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>

        <InputSection
          title="Payment Method"
          inputName="paymentMethod"
          type="text"
          value={accountSettings?.paymentMethod ?? ""}
          placeholder="Payment Method..."
          onChange={handleChange}
        />

        <div className="w-fit flex gap-1">
          <Button
            text="Save Changes"
            onClick={submitProfile}
            type="green"
            roundedfull
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingPage;
