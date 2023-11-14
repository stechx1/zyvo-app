"use client";
import React, { useEffect, useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuthContext } from "@/context/AuthContext";
import { googleSignin } from "@/firebase/auth/sociaiLogin";
import { profileData, setProfile } from "@/firebase/auth/profile";
import toast from "react-hot-toast";

function Page() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
        [e.target.name + "Error"]: "",
      };
    });
  };
  const isFormValid = () => {
    let isValid = true;
    if (!state.firstName) {
      setState((state) => {
        return {
          ...state,
          firstNameError: "Please enter first name",
        };
      });
      isValid = false;
    }
    if (!state.password) {
      setState((state) => {
        return {
          ...state,
          passwordError: "Please enter password",
        };
      });
      isValid = false;
    }
    if (!state.email) {
      setState((state) => {
        return {
          ...state,
          emailError: "Please enter email",
        };
      });
      isValid = false;
    }
    return isValid;
  };
  const handleForm = () => {
    if (!isFormValid()) return;
    signUp(state.email, state.password).then(({ result, error }) => {
      if (error) {
        toast.error(error.code);
        return;
      }
      const user = result?.user;
      if (user) {
        const profileData: profileData = {
          firstName: state.firstName,
          lastName: state.lastName,
          email: "",
          emailVerified: false,
          photoURL: "",
          phoneNumber: "",
          phoneNumberVerified: false,
        };
        const splitedDisplayName = user.displayName?.split(" ") ?? [""];
        if (splitedDisplayName?.length > 1) {
          profileData.lastName = splitedDisplayName.slice(1).join(" ");
        }
        profileData.firstName = splitedDisplayName[0];
        profileData.email = user.email ?? "";
        try {
          setProfile(user?.uid, profileData);
          toast.success("Registered Successfully!");
          return router.push("/");
        } catch (error) {}
      }
    });
  };
  return (
    <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
      <div className="sm:w-[30rem] w-[25rem] mx-auto rounded-xl shadow-2xl">
        <div className="bg-white rounded-3xl px-8 py-10">
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed text-center">Register</h2>
          </div>

          <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="flex justify-between space-x-2">
              <Input
                name="firstName"
                type="text"
                onChange={handleChange}
                value={state.firstName}
                invalidMessage={state.firstNameError}
                placeholder="First Name..."
              />
              <Input
                name="lastName"
                type="text"
                onChange={handleChange}
                value={state.lastName}
                invalidMessage={state.lastNameError}
                placeholder="Last Name..."
              />
            </div>
            <Input
              name="email"
              type="email"
              onChange={handleChange}
              value={state.email}
              invalidMessage={state.emailError}
              placeholder="Email..."
            />
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              value={state.password}
              invalidMessage={state.passwordError}
              placeholder="Password..."
            />
          </div>

          <Button
            text="Create Account"
            onClick={handleForm}
            type="green"
            roundedfull
            full
            isLoading={isLoading}
          />

          <hr className="my-5" />
          <div className="flex flex-col items-center justify-center my-2">
            <div className="my-1">OR REGISTER WITH</div>
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black text-2xl bg-transparent">
                <Image
                  src={"/icons/facebook-icon.svg"}
                  alt={"facebook"}
                  width={13}
                  height={13}
                  className="cursor-pointer"
                />
              </div>
              <div
                className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black text-2xl bg-transparent"
                onClick={googleSignin}
              >
                <Image
                  src={"/icons/google-icon.svg"}
                  alt={"google"}
                  width={17}
                  height={17}
                  className="cursor-pointer"
                />
              </div>
              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black text-2xl bg-transparent">
                <Image
                  src={"/icons/twitter-icon.svg"}
                  alt={"twitter"}
                  width={17}
                  height={17}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="text-center mt-3 mb-2"> Already have an account?</div>

          <Button
            text="Login Here"
            type="white"
            roundedfull
            full
            bordered
            onClick={() => {
              router.push("/signin");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
