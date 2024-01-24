import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CoordinatesType } from "@/types/place";
import { useAuthContext } from "@/context/AuthContext";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: 0,
  lng: 0,
};
export default function Map({
  coords,
  getCoordinates,
}: {
  coords?: CoordinatesType;
  getCoordinates?: (coords: CoordinatesType) => void;
}) {
  const [position, setPosition] = useState(coords);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const { currentCoordinates } = useAuthContext();

  useEffect(() => {
    if (coords) setPosition(coords);
    else if (currentCoordinates) setPosition(currentCoordinates);
  }, [coords, currentCoordinates]);

  useEffect(() => {
    if (map) onLoad(map);
  }, [position, map]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
  });

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.moveCamera({ center: position, zoom: 20 });
  };

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng && getCoordinates) {
      getCoordinates({ lat, lng });
    }
  };

  return isLoaded ? (
    <div className="w-full h-full rounded-l-xl">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={10}
        onLoad={onLoad}
        onClick={onDragEnd}
      >
        {position && (
          <Marker
            position={position}
            draggable={!!getCoordinates}
            onDragEnd={onDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
