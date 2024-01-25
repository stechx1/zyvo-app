import Button from "@/components/Button";
import React from "react";

interface Props {
  handleShowMap: () => void;
  mapVisible: boolean;
}

function HomeFilters(props: Props) {
  const { handleShowMap, mapVisible } = props;

  return (
    <div className="sm:flex justify-between hidden">
      <div></div>
      <div>
        <Button
          icon={
            mapVisible
              ? "/icons/white-filter-icon.svg"
              : "/icons/white-showmap-icon.svg"
          }
          text={mapVisible ? "Show List" : "Show Map"}
          type="gray"
          roundedfull
          onClick={handleShowMap}
        />
      </div>
    </div>
  );
}

export default HomeFilters;
