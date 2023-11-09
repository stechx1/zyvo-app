"use client";
import React, { useState } from "react";
import { ProfileTag } from "@/types";
import { ProfileInfoTag } from "@/collections/ProfileInfoTag/ProfileInfoTag";
import Button from "@/components/Button";

const ProfilePage = () => {
  const myLocations: ProfileTag[] = [
    { id: 1, label: "New York, US" },
    { id: 2, label: "Brooklyn, US" },
    { id: 3, label: "Manhattan, US" },
  ];

  const myProfessions: ProfileTag[] = [
    { id: 1, label: "Software Developer" },
    { id: 2, label: "Lawyer" },
    { id: 3, label: "Teacher" },
  ];

  const myLanguages: ProfileTag[] = [
    { id: 1, label: "English" },
    { id: 2, label: "Spanish" },
    { id: 3, label: "German" },
  ];

  const myHobbies: ProfileTag[] = [
    { id: 1, label: "Sports" },
    { id: 2, label: "Painting" },
  ];
  const myPets: ProfileTag[] = [
    { id: 1, label: "Cat" },
    { id: 2, label: "Dog" },
  ];

  const [locations, setLocations] = useState<ProfileTag[]>(myLocations);
  const [workProfessions, setWorkProfessions] =
    useState<ProfileTag[]>(myProfessions);
  const [languages, setLanguages] = useState<ProfileTag[]>(myLanguages);
  const [hobbies, setHobbies] = useState<ProfileTag[]>(myHobbies);
  const [pets, setPets] = useState<ProfileTag[]>(myPets);

  const removeTag = (
    id: number,
    list: ProfileTag[],
    setList: (value: React.SetStateAction<ProfileTag[]>) => void
  ) => {
    const updatedTags = list.filter((tag) => tag.id !== id);
    console.log(updatedTags);

    setList(updatedTags);
  };

  return (
    <div className="flex container mx-auto my-24 px-14 md:px-10">
      {/* Single Column (70%) */}
      <div className="w-[70%] flex flex-col gap-12 ">
        <div className="flex flex-col gap-3">
          <div className="text-black text-2xl font-normal font-Poppins">
            Complete your profile
          </div>
          <div className="text-black text-lg font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-black text-2xl font-normal font-Poppins">
            About Me
          </div>
          <div className="border border-neutral-200 rounded-xl p-6">
            <div className="text-black text-lg font-normal">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only...
            </div>
          </div>
        </div>

        <ProfileInfoTag
          title="Where I live"
          tags={locations}
          onRemoveTag={(id) => removeTag(id, locations, setLocations)}
          icon={"/icons/location-line-icon.svg"}
          iconAlt="location-icon"
        />
        <ProfileInfoTag
          title="My Work"
          tags={workProfessions}
          onRemoveTag={(id) =>
            removeTag(id, workProfessions, setWorkProfessions)
          }
          icon={"/icons/bag-icon.svg"}
          iconAlt="bag-icon"
        />
        <ProfileInfoTag
          title="Languages I speak"
          tags={languages}
          onRemoveTag={(id) => removeTag(id, languages, setLanguages)}
          icon={"/icons/translate-icon.svg"}
          iconAlt="translate-icon"
        />
        <ProfileInfoTag
          title="Hobbies"
          tags={hobbies}
          onRemoveTag={(id) => removeTag(id, hobbies, setHobbies)}
          icon={"/icons/ball-icon.svg"}
          iconAlt="ball-icon"
        />
        <ProfileInfoTag
          title="Pets"
          tags={pets}
          onRemoveTag={(id) => removeTag(id, pets, setPets)}
          icon={"/icons/translate-icon.svg"}
          iconAlt="translate-icon"
        />
        <div className="w-fit flex gap-1">
          <Button
            text="Save Profile"
            //   onClick={() => {
            //     router.push("/signup");
            //   }}
            type="green"
            rounded
          />
          <Button text="Skip for now" onClick={() => {}} type="white" />
        </div>
      </div>

      {/* Empty Space (30%) */}
      <div className="w-30"></div>
    </div>
  );
};

export default ProfilePage;
