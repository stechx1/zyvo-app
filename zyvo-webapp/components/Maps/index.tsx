import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CoordinatesType } from "@/types/place";
import { useAuthContext } from "@/context/AuthContext";

export function Map({
  coords,
  getCoordinates,
  height,
}: {
  coords?: CoordinatesType;
  getCoordinates?: (coords: CoordinatesType) => void;
  height?: number;
  zoom?: number;
}) {
  const [position, setPosition] = useState(coords);
  const { currentCoordinates } = useAuthContext();

  const containerStyle = {
    width: "100%",
    height: height ?? "400px",
  };
  useEffect(() => {
    if (coords?.lat !== 0 || coords.lng !== 0) setPosition(coords);
    else if (currentCoordinates) setPosition(currentCoordinates);
  }, [coords, currentCoordinates]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
  });

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
        onClick={onDragEnd}
        zoom={10}
        center={position}
        options={{
          disableDefaultUI: true,
        }}
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
export function MultiMap({
  multipleCoords,
  height,
}: {
  multipleCoords?: { coord: CoordinatesType; text: ReactNode }[];
  height?: number;
}) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const containerStyle = {
    width: "100%",
    height: height ?? "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
  });

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    if (multipleCoords) {
      multipleCoords?.forEach((c) => {
        bounds.extend(c.coord);
      });
    }
    const initialZoom = 10;
    if (mapRef.current) {
      mapRef.current.setZoom(initialZoom);
      mapRef.current.fitBounds(bounds);
    }
  };

  return isLoaded && multipleCoords ? (
    <div className="w-full h-full rounded-l-xl">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={handleMapLoad}
        options={{
          disableDefaultUI: true,
        }}
      >
        {multipleCoords?.map((c, i) => {
          return (
            <Marker key={i} position={c.coord} draggable={false}>
              {<InfoWindow position={c.coord}>{c.text}</InfoWindow>}
            </Marker>
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
