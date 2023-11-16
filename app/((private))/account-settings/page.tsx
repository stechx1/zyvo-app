"use client";
import React from "react";
import { LeftAccountSection } from "@/collections/AccountSettings/LeftAccountSection/LeftAccountSection";
import { RightAccountSection } from "@/collections/AccountSettings/RightAccountSection/RightAccountSection";

const AccountSettingPage = () => {
  return (
    <div className="flex lg:gap-20 gap-10">
      <LeftAccountSection />
      <RightAccountSection />
    </div>
  );
};

export default AccountSettingPage;
