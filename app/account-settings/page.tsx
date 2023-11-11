"use client";
import React from "react";
import { LeftAccountSection } from "@/collections/AccountSettings/LeftAccountSection/LeftAccountSection";
import { RightAccountSection } from "@/collections/AccountSettings/RightAccountSection/RightAccountSection";

const AccountSettingPage = () => {
  return (
    <div className="flex container mx-auto my-24 px-14 md:px-10 lg:gap-20 gap-10">
      <LeftAccountSection />
      <RightAccountSection />
    </div>
  );
};

export default AccountSettingPage;
