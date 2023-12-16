"use client";
import React, { useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import { Navbar } from "@/collections/Navbar/Navbar";
import { Footer } from "@/collections/Footer/Footer";
import { usePathname } from "next/navigation";
import getData from "@/firebase/firestore/getData";
import { profileData } from "@/types/profile";

const auth = getAuth(firebase_app);

const defaultValue: {
  user: profileData | null;
  setUser: (user: profileData) => void;
  mode: "GUEST" | "HOST";
  setMode: (mode: "GUEST" | "HOST") => void;
} = { user: null, setUser: () => {}, mode: "GUEST", setMode: () => {} };
export const AuthContext = createContext(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<profileData | null>(null);
  const [mode, setMode] = React.useState<"GUEST" | "HOST">("GUEST");
  const [loading, setLoading] = React.useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getData("users", user.uid)
          .then(({ result, error }) => {
            setUser(result as profileData);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        setUser(null);
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });

    return () => unsubscribe();
  }, []);
  if (loading) return <PreLoader />;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => setUser(user),
        mode,
        setMode: (mode: "GUEST" | "HOST") => setMode(mode),
      }}
    >
      <Navbar />
      {children}
      {pathname !== "/messages" && <Footer />}
    </AuthContext.Provider>
  );
};
