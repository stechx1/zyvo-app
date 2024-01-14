"use client";
import React, { useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import { Navbar } from "@/collections/Navbar/Navbar";
import { usePathname } from "next/navigation";

const auth = getAuth(firebase_app);

const defaultValue: {
  user: User | null;
  setUser: (user: User) => void;
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
  const [user, setUser] = React.useState<User | null>(null);
  const [mode, setMode] = React.useState<"GUEST" | "HOST">("GUEST");
  const [loading, setLoading] = React.useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
    </AuthContext.Provider>
  );
};
