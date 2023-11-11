export interface InputSectionProps {
  title: string;
  inputName: string;
    type: "text" | "email" | "password";
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
