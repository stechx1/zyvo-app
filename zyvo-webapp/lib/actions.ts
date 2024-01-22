"use server";
export const getGooglePlaces = async (query: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Cgeometry&input=${query}&inputtype=textquery&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}`
    );
    const data = await response.json();
    return data?.candidates?.length ? data.candidates : [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
