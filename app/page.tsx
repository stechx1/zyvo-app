"use client";

import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import { residentialListing } from "@/data";

export default function Home() {
  return (
    <div className="bg-white">
      <PropertyList propertyListing={residentialListing} />
    </div>
  );
}
