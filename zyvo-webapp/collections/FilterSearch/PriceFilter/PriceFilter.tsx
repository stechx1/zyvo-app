import React, { useState } from "react";

export const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleMinPriceDecrement = () => {
    if (minPrice > 0) {
      setMinPrice(minPrice - 1);
    }
  };

  const handleMinPriceIncrement = () => {
    setMinPrice(minPrice + 1);
  };

  const handleMaxPriceDecrement = () => {
    if (maxPrice > 0) {
      setMaxPrice(maxPrice - 1);
    }
  };

  const handleMaxPriceIncrement = () => {
    setMaxPrice(maxPrice + 1);
  };

  return (
    <div className="border rounded-xl p-[18px] h-52">
      <div className="mb-4">
        <h3 className="text-md mb-3">Min. Hourly Price</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleMinPriceDecrement}
            className="h-[30px] w-[30px]  rounded-full border border-secondary-neutral-200"
          >
            -
          </button>
          <span>${minPrice}</span>
          <button
            onClick={handleMinPriceIncrement}
            className="h-[30px] w-[30px] rounded-full border border-secondary-neutral-200"
          >
            +
          </button>
        </div>
      </div>
      <div className="h-[0.3px] my-5 opacity-[0.20] bg-secondary-gray-700"></div>

      <div>
        <h3 className="text-md mb-3">Max. Hourly Price</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleMaxPriceDecrement}
            className="h-[30px] w-[30px]  rounded-full border border-secondary-neutral-200"
          >
            -
          </button>
          <span>${maxPrice}</span>
          <button
            onClick={handleMaxPriceIncrement}
            className="h-[30px] w-[30px] rounded-full border border-secondary-neutral-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
