"use client";
import React from "react";
import { LeftProfileSection } from "@/collections/Profile/LeftProfileSection/LeftProfileSection";
import { RightProfileSection } from "@/collections/Profile/RightProfileSection/RightProfileSection";

const ProfilePage = () => {
  return (
    <div className="flex lg:gap-20 gap-10">
      <LeftProfileSection />
      <RightProfileSection />
    </div>
  );
};

export default ProfilePage;
