"use client";
import React, { useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import { User } from "firebase/auth/cordova";
import { Navbar } from "@/collections/Navbar/Navbar";
import { Footer } from "@/collections/Footer/Footer";

const auth = getAuth(firebase_app);
const defaultValue: { user: User | null } = { user: null };
export const AuthContext = createContext(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

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
    <AuthContext.Provider value={{ user }}>
      <Navbar />
      {children}
      <Footer />
    </AuthContext.Provider>
  );
};
