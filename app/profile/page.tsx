"use client";
import React from "react";
import { LeftProfileSection } from "@/collections/Profile/LeftProfileSection/LeftProfileSection";
import { RightProfileSection } from "@/collections/Profile/RightProfileSection/RightProfileSection";

const ProfilePage = () => {
  return (
    <div className="flex container mx-auto my-24 px-14 md:px-10 lg:gap-20 gap-10">
      <LeftProfileSection />
      <RightProfileSection />
    </div>
  );
};

export default ProfilePage;
