import React, { ReactNode, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CoordinatesType } from "@/types/place";
import { useAuthContext } from "@/context/AuthContext";

export default function Map({
  multipleCoords,
  coords,
  getCoordinates,
  height,
}: {
  multipleCoords?: { coord: CoordinatesType; text: ReactNode }[];
  coords?: CoordinatesType;
  getCoordinates?: (coords: CoordinatesType) => void;
  height?: number;
}) {
  const [position, setPosition] = useState(coords);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const { currentCoordinates } = useAuthContext();

  const containerStyle = {
    width: "100%",
    height: height ?? "400px",
  };
  useEffect(() => {
    if (coords) setPosition(coords);
    else if (currentCoordinates) setPosition(currentCoordinates);
  }, [coords, currentCoordinates]);

  useEffect(() => {
    if (map) onLoad(map);
  }, [position, map]);

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
  });

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    const bounds = new window.google.maps.LatLngBounds();
    if (multipleCoords) {
      multipleCoords?.forEach((c) => {
        bounds.extend(c.coord);
      });
    } else if (coords) {
      bounds.extend(coords);
      // map.moveCamera({ center: position, zoom: 15 });
    } else if (currentCoordinates) {
      bounds.extend(currentCoordinates);
    }
    map.fitBounds(bounds);
    // map.moveCamera({ center: position, zoom: 10 });
    // map.setZoom(10);
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
        // center={position}
        // zoom={10}
        onLoad={onLoad}
        onClick={onDragEnd}
      >
        {!multipleCoords && position && (
          <Marker
            position={position}
            draggable={!!getCoordinates}
            onDragEnd={onDragEnd}
            children={<div>hel</div>}
          />
        )}
        {multipleCoords?.map((c) => {
          return (
            <Marker position={c.coord} draggable={false}>
              {c.text && <InfoWindow>{c.text}</InfoWindow>}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
