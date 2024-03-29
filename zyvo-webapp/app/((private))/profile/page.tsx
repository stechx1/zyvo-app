"use client";
import React, { useEffect, useState } from "react";
import ProfileForm from "@/collections/Profile/ProfileForm";
import { useCommonContext } from "@/context/CommonContext";
import { useRouter, useSearchParams } from "next/navigation";
import { profileState } from "@/types";
import Button from "@/components/Button";
import addData from "@/firebase/firestore/addData";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { ProfileContactSection } from "@/collections/Profile/RightProfileSection/ProfileContactSection";
import Image from "next/image";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "@/config";
import getData from "@/firebase/firestore/getData";
import { User } from "@/types/user";

const storage = getStorage(firebase_app);

const ProfilePage = () => {
  const auth = getAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const { user, setUser, mode } = useCommonContext();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imgPreview, setImgPreview] = useState<string>();

  const userId = searchParams.get("userId");
  const isMe = !userId || user?.userId == userId;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);

    setImgPreview(objectUrl);
  };
  const [state, setState] = useState<profileState[]>([
    {
      title: "Where I live",
      icon: "/icons/location-line-icon.svg",
      values: [],
      name: "addresses",
    },
    {
      title: "My Work",
      icon: "/icons/bag-icon.svg",
      values: [],
      name: "works",
    },
    {
      title: "Languages I Speak",
      icon: "/icons/translate-icon.svg",
      values: [],
      name: "languages",
    },
    {
      title: "Hobbies",
      icon: "/icons/ball-icon.svg",
      values: [],
      name: "hobbies",
    },
    {
      title: "Pets",
      icon: "",
      values: [],
      name: "pets",
    },
  ]);
  const [otherUser, setOtherUser] = useState<User | null>(null);

  const [aboutMe, setAboutMe] = useState(``);

  useEffect(() => {
    if (user && isMe) {
      setAboutMe(user.aboutMe ?? "");
      setState(
        state.map((data) => {
          if (data.name === "addresses") {
            data.values = user.addresses ?? [];
          }
          if (data.name === "works") {
            data.values = user.works ?? [];
          }
          if (data.name === "languages") {
            data.values = user.languages ?? [];
          }
          if (data.name === "hobbies") {
            data.values = user.hobbies ?? [];
          }
          if (data.name === "pets") {
            data.values = user.pets ?? [];
          }
          return data;
        })
      );
    } else {
      if (userId) {
        getData("users", userId)
          .then(({ result, error }) => {
            const otherUser = result as User;
            setOtherUser(otherUser);
            setAboutMe(otherUser.aboutMe ?? "");
            setState(
              state.map((data) => {
                if (data.name === "addresses") {
                  data.values = otherUser.addresses ?? [];
                }
                if (data.name === "works") {
                  data.values = otherUser.works ?? [];
                }
                if (data.name === "languages") {
                  data.values = otherUser.languages ?? [];
                }
                if (data.name === "hobbies") {
                  data.values = otherUser.hobbies ?? [];
                }
                if (data.name === "pets") {
                  data.values = otherUser.pets ?? [];
                }
                return data;
              })
            );
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [user, userId, isMe]);

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
        photoURL: user.photoURL,
        aboutMe,
        addresses: state.find((data) => data.name === "addresses")?.values,
        works: state.find((data) => data.name === "works")?.values,
        languages: state.find((data) => data.name === "languages")?.values,
        hobbies: state.find((data) => data.name === "hobbies")?.values,
        pets: state.find((data) => data.name === "pets")?.values,
      })
        .then(({ result, error }) => {
          if (error) {
            toast.error(error?.message);
            return;
          }

          toast.success("Profile updated Successfully");

          setUser({
            ...user,
            aboutMe,
            addresses: state.find((data) => data.name === "addresses")?.values,
            works: state.find((data) => data.name === "works")?.values,
            languages: state.find((data) => data.name === "languages")?.values,
            hobbies: state.find((data) => data.name === "hobbies")?.values,
            pets: state.find((data) => data.name === "pets")?.values,
          });
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!auth) router.push("/signin");
  }, [auth]);

  return (
    <div className="flex flex-col my-12 sm:flex-row lg:gap-20 gap-10">
      <div className="sm:w-[30%] flex flex-col gap-6 sm:gap-10 sm:order-2">
        {isMe && (
          <div className="flex flex-col gap-3 sm:hidden">
            <div className="text-black text-2xl font-normal font-Poppins">
              Complete your profile
            </div>
            <div className={` rounded-3xl `}>
              <div className="text-black text-lg font-normal">
                Complete your profile here
              </div>
            </div>
          </div>
        )}
        <div className="h-full sm:h-[350px] w-full rounded-3xl border border-secondary-neutral-200 p-6 items-center sm:justify-center flex-row sm:flex-col flex bg-white">
          <div className="relative">
            <div className="w-[59px] h-[59px] sm:w-[150px] sm:h-[150px] border-8 border-secondary-neutral-200 bg-white rounded-full flex items-center justify-center">
              <Image
                src={
                  imgPreview
                    ? imgPreview
                    : isMe && user?.photoURL
                    ? user?.photoURL
                    : otherUser && otherUser.photoURL
                    ? otherUser?.photoURL
                    : "/icons/profile-icon.png"
                }
                alt="Profile Image"
                className={`sm:w-[125px] sm:h-[125px] rounded-full ${
                  !user?.photoURL && "opacity-10"
                }`}
                width={156}
                height={156}
              />
            </div>
            {isMe && (
              <div className="w-[24px] h-[24px] md:w-[36px] md:h-[36px] rounded-full bg-secondary-green flex items-center justify-center absolute left-10 bottom-1 sm:top-[7rem] sm:left-28">
                <label htmlFor="files">
                  <Image
                    src="/icons/plus-icon.svg"
                    alt="plus-icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="files"
            onChange={onSelectFile}
            className="hidden"
          />
          <div className="gap-1 flex flex-col ml-4 sm:items-center">
            <div className="text-black text-[18px] sm:text-[28px] font-medium font-Poppins sm:mt-[20px]">
              {isMe
                ? user?.firstName + " " + user?.lastName
                : otherUser
                ? otherUser?.firstName + " " + otherUser?.lastName
                : ""}
            </div>
            <div className="text-black text-[13px] sm:text-[20px] font-light font-Poppins">
              {mode === "GUEST" ? "Host" : "Guest"}
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-secondary-gray-700 p-3 sm:p-5 flex justify-around sm:flex-col">
          <ProfileContactSection />
        </div>
      </div>
      <div className="w-full sm:w-[70%] flex flex-col gap-6 sm:gap-12 sm:order-1">
        {isMe && (
          <div className="flex-col gap-3 hidden sm:block">
            <div className="text-black text-[18px] sm:text-h1 font-normal font-Poppins">
              Complete your profile
            </div>
            <div className={` rounded-3xl `}>
              <div className="text-black text-[14px] sm:text-lg font-normal">
              {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="text-black text-[18px] sm:text-2xl font-normal font-Poppins">
            About Me
          </div>
          <div className={`border border-neutral-200 p-6 rounded-3xl bg-white`}>
            <div className="text-black text-[14px] sm:text-lg font-normal">
              <textarea
                className="focus:outline-none w-full"
                rows={Math.min(5, aboutMe.split("\n").length + 1)}
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                disabled={!isMe}
              />
            </div>
          </div>
        </div>
        <ProfileForm state={state} setState={setState} disabled={!isMe} />
        {isMe && (
          <div className="w-fit flex gap-1">
            <Button
              text="Save Profile"
              onClick={submitProfile}
              type="green"
              roundedfull
              isLoading={loading}
            />
            {/* <Button text="Skip for now" onClick={() => {}} type="white" /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
