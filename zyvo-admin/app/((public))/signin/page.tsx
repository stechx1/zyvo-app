"use client";
import React, { useEffect, useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

function Page() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [iskeepLoggedIn, setIsKeepLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);  

  useEffect(() => {
    const data = localStorage.getItem("zyvo-data");
    if (data) {
      const decodedData = atob(data);
      const parsedData = JSON.parse(decodedData);
      if (parsedData.email)
        setState((state) => {
          return { ...state, email: parsedData.email };
        });
      if (parsedData.password)
        setState((state) => {
          return { ...state, password: parsedData.password };
        });
      if (parsedData.isKeepLoggedIn)
        setIsKeepLoggedIn(parsedData.isKeepLoggedIn);
    }
  }, []);

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
    if (iskeepLoggedIn) {
      localStorage.setItem(
        "zyvo-data",
        btoa(
          JSON.stringify({
            email: state.email,
            password: state.password,
            isKeepLoggedIn: true,
          })
        )
      );
    } else {
      localStorage.setItem("zyvo-data", "");
    }
    setIsLoading(true);
    signIn(state.email, state.password).then(({ result, error }) => {
      setIsLoading(false);
      if (error) {
        toast.error(error.code);
        return;
      }
      setTimeout(() => {
        toast.success("Loged in Successfully!");
      }, 1000);
    });
  };

  return (
    <div className='bg-[url("/images/banner-bg.png")] bg-cover bg-center py-8 flex flex-col justify-center items-center'>
      <div className="sm:w-[30rem] w-[25rem] mx-auto rounded-xl shadow-2xl my-10">
        <div className="bg-white rounded-3xl px-8 py-10">
          <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
            <h2 className="leading-relaxed text-center">Login</h2>
          </div>
          <div className="py-6  space-y-4 text-gray-700 sm:text-lg sm:leading-7">
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
            text="Login"
            onClick={handleForm}
            type="green"
            roundedfull
            full
            isLoading={isLoading}
          />
          <div className="flex items-center justify-between my-3">
            <div className="flex items-center">
              <input
                type="radio"
                className="h-5 w-5 accent-gray-500/50"
                checked={iskeepLoggedIn}
                onChange={() => {}}
                onClick={(e) => setIsKeepLoggedIn((state) => !state)}
              />
              <label className="ml-2 text-gray-600">Keep me logged</label>
            </div>
          </div>
          <hr className="my-5" />
        </div>
      </div>
    </div>
  );
}

export default Page;
