"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = () => {
    signIn(email, password).then(({ result, error }) => {
      if (error) {
        return console.log(error);
      }
      return router.push("/admin");
    });
  };
  return (
    <div className="min-h-screen bg-zinc-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed text-center">Login</h2>
            </div>
              <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email..."
                />
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password..."
                />
              </div>
              <button
                className="bg-green-light text-gray-950 flex justify-center items-center w-full text-white px-4 py-2 rounded-full focus:outline-none"
                onClick={handleForm}
              >
                Login
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
