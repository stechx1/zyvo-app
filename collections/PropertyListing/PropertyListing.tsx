"use client"
import React, { useState } from "react";
import { PropertyLisitngProps } from "@types";
import { Pagination, PropertyCard } from "@components";

export const PropertyList: React.FC<PropertyLisitngProps> = ({ propertyListing }) => {
  // Define states for totalPages and currentPage
  const [currentPage, setCurrentPage] = useState(1); // Set the initial value

  // Define a function for onPageChange
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Assuming a certain number of items per page
  const itemsPerPage = 10; // You can adjust this based on your needs

  // Calculate the total pages based on the number of items and items per page
  const totalItems = propertyListing.length;
  const totalPagesForItems = Math.ceil(totalItems / itemsPerPage);

  // Calculate the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = propertyListing.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-24">
        {itemsToDisplay.map((property, index) => (
          <PropertyCard key={index} propertyItem={property} />
        ))}
      </div>

      {/* Pass totalPages, currentPage, and onPageChange to the Pagination component */}
      <Pagination totalPages={totalPagesForItems} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};
