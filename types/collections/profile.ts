export type ProfileTag = {
  id: number;
  label: string;
};

export interface ProfileTagProps {
  title: string;
  tags: ProfileTag[];
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
