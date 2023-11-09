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
