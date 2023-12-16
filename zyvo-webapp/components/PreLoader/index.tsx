"use client";
import Lottie from "lottie-react";
import loadingData from "./data.json";

export const PreLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Lottie
        style={{ height: "250px", width: "250px" }}
        animationData={loadingData}
      />
    </div>
  );
};
