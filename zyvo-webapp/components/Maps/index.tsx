import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { CoordinatesType } from "@/types/place";

const containerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};
export default function Map({
  coords,
  getCoordinates,
}: {
  coords?: CoordinatesType;
  getCoordinates?: (coords: CoordinatesType) => void;
}) {
  const [position, setPosition] = useState(coords);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    if (coords) setPosition(coords);
  }, [coords]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
    // googleMapsApiKey: "AIzaSyDsxdFAwUtHndtsA0LFToyIFvp9RTi5k68",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map);
      map.moveCamera({ center: position, zoom: 20 });
    },
    [position]
  );

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);
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
        onUnmount={onUnmount}
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
