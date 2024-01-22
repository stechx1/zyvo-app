"use client";
import React, { useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth, Unsubscribe } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import { Navbar } from "@/collections/Navbar/Navbar";
import { Footer } from "@/collections/Footer/Footer";
import { usePathname } from "next/navigation";
import getData from "@/firebase/firestore/getData";
import { User } from "@/types/user";
import { conversation } from "@/types/messages";
import { getConversationsSnapshot } from "@/firebase/messages";
import BottomTabNav from "@/collections/Footer/bottomTabNav/bottomTabNav";
import { CoordinatesType } from "@/types/place";

const auth = getAuth(firebase_app);

const defaultValue: {
  user: User | null;
  setUser: (user: User) => void;
  mode: "GUEST" | "HOST";
  setMode: (mode: "GUEST" | "HOST") => void;
  conversations: conversation[];
  setConversations: (conversations: conversation[]) => void;
  currentCoordinates: CoordinatesType | null;
} = {
  user: null,
  setUser: () => {},
  mode: "GUEST",
  setMode: () => {},
  conversations: [],
  setConversations: () => {},
  currentCoordinates: null,
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
  const [currentCoordinates, setCurrentCoordinates] =
    React.useState<CoordinatesType | null>(null);
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

  useEffect(() => {
    console.log('yes');
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        
        setCurrentCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

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
        currentCoordinates,
      }}
    >
      <Navbar />
      {children}
      {pathname !== "/signup" && pathname !== "/signin" && user && (
        <BottomTabNav />
      )}
      {pathname !== "/messages" &&
        pathname !== "/signup" &&
        pathname !== "/signin" && <div className="p-1"><Footer /></div> }
    </AuthContext.Provider>
  );
};
