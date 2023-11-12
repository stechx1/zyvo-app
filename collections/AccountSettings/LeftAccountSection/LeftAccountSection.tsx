import { Description } from "@/components/Description";
import { InputSectionProps, ProfileTag } from "@/types";
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
  const [accountSettings, setAccountSettings] = useState({
    email: "Katelyncris@email.com",
    phone: "*******5949",
    password: "12345678",
    address: {
      country: "Canada",
      state: "British Columbia (BC)",
      city: "Vancouver",
      street: "123 Main Street",
    },
    paymentMethod: "Visa ****** **** 4567",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  return (
    <div className="w-[70%] flex flex-col gap-12 ">
      <Description
        title="Account Settings"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took."
        showBorder={false}
      />
      <InputSection
        title="Email"
        inputName="email"
        type="text"
        value={accountSettings.email}
        placeholder="Email..."
        onChange={handleChange}
      />

      <InputSection
        title="Phone Number"
        inputName="phone"
        type="text"
        value={accountSettings.phone}
        placeholder="Phone Number..."
        onChange={handleChange}
      />

      <InputSection
        title="Password"
        inputName="password"
        type="password"
        value={accountSettings.password}
        placeholder="Password..."
        onChange={handleChange}
      />

      <div className="flex flex-col gap-3 w-[100%]">
         <p className="font-Poppins text-lg font-normal">Address</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4"> 
          <Input
            name="country"
            type="text"
            onChange={handleChange}
            value={accountSettings.address.country}
            placeholder="Country..."
          />
           
          <Input
            name="state"
            type="text"
            onChange={handleChange}
            value={accountSettings.address.state}
            placeholder="State..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-7 gap-4"> 
          <Input
            name="city"
            type="text"
            onChange={handleChange}
            value={accountSettings.address.city}
            placeholder="City..."
          />
          <Input
            name="street"
            type="text"
            onChange={handleChange}
            value={accountSettings.address.street}
            placeholder="Street..."
          />
        </div>
      </div>
      <div className="h-[0.5px] opacity-[0.20] bg-secondary-gray-700"></div>

      <InputSection
        title="Payment Method"
        inputName="paymentMethod"
        type="text"
        value={accountSettings.paymentMethod}
        placeholder="Payment Method..."
        onChange={handleChange}
      />

      <div className="w-fit flex gap-1">
        <Button text="Save Changes" type="green" roundedfull />
      </div>
    </div>
  );
};
