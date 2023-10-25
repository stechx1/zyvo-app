"use client";
import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import firebase_app from "@/config";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(firebase_app);

  React.useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  return (
    <h1>
      Only logged in users can view this page
      <br />
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Logout
      </button>
    </h1>
  );
}

export default Page;
