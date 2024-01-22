"use client";
import React from "react";
import { PropertyCard } from "@/components/PropertyCard/PropertyCard";
import { Place } from "@/types/place";
import { useAuthContext } from "@/context/AuthContext";
// import { Pagination } from "@/components/Pagination/Pagination";

export const PropertyList = ({ places }: { places: Place[] }) => {
  const { currentCoordinates } = useAuthContext();
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {places.map((place, index) => (
          <PropertyCard
            key={index}
            place={place}
            currentCoordinates={currentCoordinates}
          />
        ))}
      </div>

      {/* Pass totalPages, currentPage, and onPageChange to the Pagination component */}
      {/* <Pagination totalPages={totalPagesForItems} currentPage={currentPage} onPageChange={handlePageChange} /> */}
    </div>
  );
};
