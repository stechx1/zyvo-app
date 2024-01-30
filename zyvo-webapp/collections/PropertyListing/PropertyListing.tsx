"use client";
import React from "react";
import { PropertyCard } from "@/collections/PropertyCard/PropertyCard";
import { Place } from "@/types/place";
import { useAuthContext } from "@/context/AuthContext";
// import { Pagination } from "@/components/Pagination/Pagination";

export const PropertyList = ({ places, grids }: { places: Place[], grids:string }) => {
  const { currentCoordinates } = useAuthContext();
  return (
    <div>
      <div className={`grid ${grids} gap-3 md:gap-6`}>
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
