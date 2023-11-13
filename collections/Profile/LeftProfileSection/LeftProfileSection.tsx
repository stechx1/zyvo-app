import { Description } from "@/components/Description";
import { useState } from "react";
import { ProfileInfoTag } from "./ProfileInfoTag";
import Button from "@/components/Button";
import { Tag } from "@/types";

export const LeftProfileSection = () => {
  const myLocations: Tag[] = [
    { id: 1, label: "New York, US" },
    { id: 2, label: "Brooklyn, US" },
    { id: 3, label: "Manhattan, US" },
  ];

  const myProfessions: Tag[] = [
    { id: 1, label: "Software Developer" },
    { id: 2, label: "Lawyer" },
    { id: 3, label: "Teacher" },
  ];

  const myLanguages: Tag[] = [
    { id: 1, label: "English" },
    { id: 2, label: "Spanish" },
    { id: 3, label: "German" },
  ];

  const myHobbies: Tag[] = [
    { id: 1, label: "Sports" },
    { id: 2, label: "Painting" },
  ];
  const myPets: Tag[] = [
    { id: 1, label: "Cat" },
    { id: 2, label: "Dog" },
  ];

  const [locations, setLocations] = useState<Tag[]>(myLocations);
  const [workProfessions, setWorkProfessions] = useState<Tag[]>(myProfessions);
  const [languages, setLanguages] = useState<Tag[]>(myLanguages);
  const [hobbies, setHobbies] = useState<Tag[]>(myHobbies);
  const [pets, setPets] = useState<Tag[]>(myPets);

  const removeTag = (
    id: number,
    list: Tag[],
    setList: (value: React.SetStateAction<Tag[]>) => void
  ) => {
    const updatedTags = list.filter((tag) => tag.id !== id);
    console.log(updatedTags);

    setList(updatedTags);
  };

  return (
    <div className="w-[70%] flex flex-col gap-12 ">
      <Description
        title="Complete your profile"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took."
        showBorder={false}
      />
      <Description
        title=" About Me"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has
          survived not only..."
        showBorder={true}
      />

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
        onRemoveTag={(id) => removeTag(id, workProfessions, setWorkProfessions)}
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
          roundedfull
        />
        <Button text="Skip for now" onClick={() => {}} type="white" />
      </div>
    </div>
  );
};
