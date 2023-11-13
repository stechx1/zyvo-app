export type Tag = {
  id: number;
  label: string;
};

export interface IconTagProps {
  icon: string;
  iconAlt: string;
  closable?: boolean;
  onRemoveTag?: (id: number) => void;
  roundedBorder?: "md" | "lg" | "xl" | "full";
  tagId: number;
  label: string;
}
