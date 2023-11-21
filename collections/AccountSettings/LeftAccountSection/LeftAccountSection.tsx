import { InputSectionProps } from "@/types";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthContext } from "@/context/AuthContext";
import { profileData } from "@/types/profile";

const InputSection: React.FC<InputSectionProps> = ({
  title,
  inputName,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <>
    <div className="flex flex-col gap-3 w-[40%]">
      <p className="font-Poppins text-lg font-normal">{title}</p>
      <Input
        name={inputName}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
    <div className="h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>
  </>
);

export const LeftAccountSection = () => {
  const { user } = useAuthContext();

  const [accountSettings, setAccountSettings] = useState<profileData | null>({
    firstName: "",
    lastName: "",
    email: "",
    emailVerified: false,
    photoURL: "",
    phoneNumber: "",
    phoneNumberVerified: false,
    isSocialLogin: true,
  });
  useEffect(() => {
    setAccountSettings(user);
  }, [user]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => {
      if (prev) return { ...prev, [name]: value };
      else return null;
    });
  };

  return (
    <div className="w-[70%] flex flex-col gap-12 ">
      <div className="flex flex-col gap-3">
        <div className="text-black text-2xl font-normal font-Poppins">
          Account Settings
        </div>
        <div className={` rounded-3xl `}>
          <div className="text-black text-lg font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took.
          </div>
        </div>
      </div>
      <InputSection
        title="Email"
        inputName="email"
        type="text"
        value={accountSettings?.email ?? ""}
        placeholder="Email..."
        onChange={handleChange}
      />

      <InputSection
        title="Phone Number"
        inputName="phone"
        type="text"
        value={accountSettings?.phone ?? ""}
        placeholder="Phone Number..."
        onChange={handleChange}
      />
      {!accountSettings?.isSocialLogin && (
        <InputSection
          title="Password"
          inputName="password"
          type="password"
          value={accountSettings?.password ?? ""}
          placeholder="Password..."
          onChange={handleChange}
        />
      )}

      <div className="flex flex-col gap-3 w-[100%]">
        <p className="font-Poppins text-lg font-normal">Address</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4">
          <Input
            name="country"
            type="text"
            onChange={handleChange}
            value={accountSettings?.country ?? ""}
            placeholder="Country..."
          />

          <Input
            name="state"
            type="text"
            onChange={handleChange}
            value={accountSettings?.state ?? ""}
            placeholder="State..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4">
          <Input
            name="city"
            type="text"
            onChange={handleChange}
            value={accountSettings?.city ?? ""}
            placeholder="City..."
          />
          <Input
            name="street"
            type="text"
            onChange={handleChange}
            value={accountSettings?.street ?? ""}
            placeholder="Street..."
          />
        </div>
      </div>
      <div className="h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>

      <InputSection
        title="Payment Method"
        inputName="paymentMethod"
        type="text"
        value={accountSettings?.paymentMethod ?? ""}
        placeholder="Payment Method..."
        onChange={handleChange}
      />

      <div className="w-fit flex gap-1">
        <Button text="Save Changes" type="green" roundedfull />
      </div>
    </div>
  );
};
