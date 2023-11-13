import { Tag } from "../components";


export interface ProfileTagProps {
  title: string;
  tags: Tag[];
  onRemoveTag: (id: number) => void;
  icon: string;
  iconAlt: string;
}

export type ProfileInfoItem = {
  title: string;
  subTitle: string;
  iconSrc: string;
  iconAlt: string;
  subTitleIcon?: string;
  isLink: boolean;
}

export interface ProfileContactBoxProps {
  profileInfo: ProfileInfoItem;
}
