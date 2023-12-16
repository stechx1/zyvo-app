"use client";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 0,
    });
  }, []);
  return null;
};
