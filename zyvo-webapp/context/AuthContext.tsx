"use client";
import React, { useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth, Unsubscribe } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import { Navbar } from "@/collections/Navbar/Navbar";
import { Footer } from "@/collections/Footer/Footer";
import { usePathname } from "next/navigation";
import getData from "@/firebase/firestore/getData";
import { User } from "@/types/profile";
import { conversation } from "@/types/messages";
import { getConversationsSnapshot } from "@/firebase/messages";

const auth = getAuth(firebase_app);

const defaultValue: {
  user: User | null;
  setUser: (user: User) => void;
  mode: "GUEST" | "HOST";
  setMode: (mode: "GUEST" | "HOST") => void;
  conversations: conversation[];
  setConversations: (conversations: conversation[]) => void;
} = {
  user: null,
  setUser: () => {},
  mode: "GUEST",
  setMode: () => {},
  conversations: [],
  setConversations: () => {},
};
export const AuthContext = createContext(defaultValue);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [mode, setMode] = React.useState<"GUEST" | "HOST">("GUEST");
  const [conversations, setConversations] = React.useState<conversation[]>([]);
  const [convosSubscribeFN, setConvosSubscribeFN] =
    React.useState<Unsubscribe>();
  const [loading, setLoading] = React.useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getData("users", user.uid)
          .then(({ result, error }) => {
            setUser(result as User);
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

  useEffect(() => {
    if (user) {
      const unsubscribe = getConversationsSnapshot(
        user.userId,
        (convos) => {
          setConversations(convos);
        },
        (e) => {
          console.log(e);
        }
      );
      setConvosSubscribeFN(() => {
        return unsubscribe;
      });
    } else {
      convosSubscribeFN && convosSubscribeFN();
    }
  }, [user]);

  if (loading) return <PreLoader />;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: (user) => setUser(user),
        mode,
        setMode: (mode: "GUEST" | "HOST") => setMode(mode),
        conversations,
        setConversations: (conversations) => setConversations(conversations),
      }}
    >
      <Navbar />
      {children}
      {(pathname !== "/messages" && pathname !== "/signup" && pathname !== "/signin") && <Footer />}
    </AuthContext.Provider>
  );
};
