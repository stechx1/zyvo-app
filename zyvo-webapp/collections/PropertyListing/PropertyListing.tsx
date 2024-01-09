"use client";
import React from "react";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { Place } from "@/types/place";
// import { Pagination } from "@/components/Pagination/Pagination";

export const PropertyList = ({
  propertyListing,
}: {
  propertyListing: Place[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {propertyListing.map((property, index) => (
          <PropertyCard key={index} propertyItem={property} />
        ))}
      </div>

      {/* Pass totalPages, currentPage, and onPageChange to the Pagination component */}
      {/* <Pagination totalPages={totalPagesForItems} currentPage={currentPage} onPageChange={handlePageChange} /> */}
    </div>
  );
};