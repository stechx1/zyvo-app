export type ProfileInfoItem = {
  title: string;
  iconSrc: string;
  isVerified: boolean;
};

export interface profileState {
  title: string;
  icon: string;
  values: string[];
  name: string;
}
