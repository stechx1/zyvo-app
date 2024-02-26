"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged, getAuth, Unsubscribe } from "firebase/auth";
import firebase_app from "@/config";
import { PreLoader } from "@/components/PreLoader";
import getData from "@/firebase/firestore/getData";
import { User } from "@/types/user";
import { conversation } from "@/types/messages";
import { getConversationsSnapshot } from "@/firebase/messages";
import { CoordinatesType, Place } from "@/types/place";
import { updateLastActive } from "@/firebase/user";
import addData from "@/firebase/firestore/addData";

const auth = getAuth(firebase_app);

const defaultValue: {
  user: User | null;
  setUser: (user: User) => void;
  mode: "GUEST" | "HOST";
  setMode: (mode: "GUEST" | "HOST") => void;
  conversations: conversation[];
  setConversations: (conversations: conversation[]) => void;
  places: Place[];
  setPlaces: (places: Place[]) => void;
  currentCoordinates: CoordinatesType | null;
} = {
  user: null,
  setUser: () => {},
  mode: "GUEST",
  setMode: () => {},
  conversations: [],
  setConversations: () => {},
  places: [],
  setPlaces: () => {},
  currentCoordinates: null,
};
export const CommonContext = createContext(defaultValue);

export const useCommonContext = () => useContext(CommonContext);

export const CommonContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"GUEST" | "HOST">("GUEST");
  const [conversations, setConversations] = useState<conversation[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [convosSubscribeFN, setConvosSubscribeFN] = useState<Unsubscribe>();
  const [loading, setLoading] = useState(true);
  const [currentCoordinates, setCurrentCoordinates] =
    useState<CoordinatesType | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // if email is verified update it
        addData("users", user?.uid, { emailVerified: user.emailVerified })
          .then((result) => {
            getData("users", user.uid)
              .then(({ result, error }) => {
                setUser(result as User);
              })
              .catch((e) => {
                console.log(e);
              });
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
    const data = localStorage.getItem("zyvo-data:mode");
    if (data) {
      const decodedData = atob(data);
      const parsedData = JSON.parse(decodedData);
      setMode(parsedData.mode);
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && user) {
      updateLastActive(user?.userId);
      interval = setInterval(() => {
        updateLastActive(user?.userId);
      }, 60000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, user]);

  if (loading) return <PreLoader />;

  return (
    <CommonContext.Provider
      value={{
        user,
        setUser: (user) => setUser(user),
        mode,
        setMode: (mode: "GUEST" | "HOST") => setMode(mode),
        conversations,
        setConversations: (conversations) => setConversations(conversations),
        places,
        setPlaces: (places) => setPlaces(places),
        currentCoordinates: currentCoordinates,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};
