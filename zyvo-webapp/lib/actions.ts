"use server";
import { CoordinatesType } from "@/types/place";

export const getGooglePlaces = async (query: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Cgeometry&input=${query}&inputtype=textquery&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`
    );
    const data = await response.json();
    console.log(data);

    return data?.candidates?.length
      ? (data.candidates as {
          formatted_address: string;
          geometry: { location: CoordinatesType };
          name: string;
        }[])
      : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export const getRouteDetails = async (
  origin: CoordinatesType,
  destination: CoordinatesType
) => {
  try {
    const response = await fetch(
      `https://routes.googleapis.com/directions/v2:computeRoutes`,
      {
        method: "POST",
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? "",
          // "X-Goog-Api-Key": "AIzaSyDsxdFAwUtHndtsA0LFToyIFvp9RTi5k68",
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          origin: {
            via: false,
            vehicleStopover: false,
            sideOfRoad: false,
            location: {
              latLng: {
                latitude: origin.lat,
                longitude: origin.lng,
              },
            },
          },
          destination: {
            via: false,
            vehicleStopover: false,
            sideOfRoad: false,
            location: {
              latLng: {
                latitude: destination.lat,
                longitude: destination.lng,
              },
            },
          },
        }), // body data type must match "Content-Type" header
      }
    );
    const data = await response.json();
    return data?.routes?.length
      ? { distance: Math.round(data.routes[0].distanceMeters / 1609.34) }
      : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
