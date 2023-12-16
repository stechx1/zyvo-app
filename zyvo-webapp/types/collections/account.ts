export interface InputSectionProps {
  title: string;
  inputName: string;
    type: "text" | "email" | "password" | "year" | "lock";
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
