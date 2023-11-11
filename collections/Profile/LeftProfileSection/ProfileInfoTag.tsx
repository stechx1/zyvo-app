import { ProfileTagProps } from "@/types";
import Image from "next/image";

export const ProfileInfoTag: React.FC<ProfileTagProps> = ({
  title,
  tags,
  onRemoveTag,
  icon,
  iconAlt,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-black text-2xl font-normal font-Poppins">
        {title}
      </div>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag) => (
          <div
            className="border border-neutral-200 rounded-full py-3 px-5 gap-2 w-fit flex items-center"
            key={tag.id}
          >
            <Image src={icon} alt={iconAlt} width={22} height={22} />

            <div className="text-black text-lg font-normal">{tag.label}</div>

            <Image
              src="/icons/close-icon-grey-background.svg"
              alt="close-icon"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => onRemoveTag(tag.id)}
            />
          </div>
        ))}
        <div className="border border-neutral-200 rounded-full py-3 px-5 gap-3 w-fit flex items-center">
          <div className="text-black text-lg font-normal">Add New</div>
          <div className="w-[24px] h-[24px] rounded-full bg-secondary-green flex items-center justify-center">
            <Image
              src="/icons/plus-icon.svg"
              alt="plus-icon"
              width={13}
              height={13}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="h-[0.5px] mt-[40px] opacity-[0.20] bg-secondary-gray-700"></div>
    </div>
  );
};
