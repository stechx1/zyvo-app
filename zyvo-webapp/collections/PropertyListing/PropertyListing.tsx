"use client";
import React from "react";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { Place } from "@/types/place";
// import { Pagination } from "@/components/Pagination/Pagination";

export const PropertyList = ({
  places,
}: {
  places: Place[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {places.map((place, index) => (
          <PropertyCard key={index} place={place} />
        ))}
      </div>

      {/* Pass totalPages, currentPage, and onPageChange to the Pagination component */}
      {/* <Pagination totalPages={totalPagesForItems} currentPage={currentPage} onPageChange={handlePageChange} /> */}
    </div>
  );
};
