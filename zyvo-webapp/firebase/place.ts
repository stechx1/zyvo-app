import {
  DocumentReference,
  Query,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { CoordinatesType, Place } from "@/types/place";
import { Unsubscribe } from "firebase/auth";
import {
  Geopoint,
  distanceBetween,
  geohashForLocation,
  geohashQueryBounds,
} from "geofire-common";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export async function addPlace(placeData: Place, userId: string) {
  let result = null;
  let error = null;

  try {
    let placeRef;
    if (placeData.placeId)
      placeRef = doc(collection(db, "places"), placeData.placeId);
    else placeRef = doc(collection(db, "places"));
    const place: Place = {
      ...placeData,
      placeId: placeRef.id,
      userRef: doc(db, "users", userId),
      createdAt: new Date(),
      geohash: geohashForLocation([
        placeData.coordinates.lat,
        placeData.coordinates.lng,
      ]),
    };
    result = await setDoc(placeRef, place, {
      merge: true,
    });
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
    console.log(e);
  }
  return { result, error };
}
export async function deletePlace(placeId: string) {
  let result = null;
  let error = null;

  try {
    const placeRef = doc(db, "places", placeId);
    const result = await getDocs(
      query(collection(db, "bookings"), where("userRef", "==", placeRef))
    );
    if (result.size > 0) await deleteDoc(placeRef);
    else
      throw {
        message: "Cannot delete this Place. Place has bookings!",
        code: "400",
      } as errorType;
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
    console.log(e);
  }
  return { result, error };
}
export function getMyPlacesSnapshot(
  userId: string,
  onSuccess: (data: Place[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "places"),
        where("userRef", "==", doc(db, "users", userId))
      ),
      async (places) => {
        let result: Place[] = [];
        for (let index = 0; index < places.docs.length; index++) {
          const place = places.docs[index].data() as Place;
          const placeId = places.docs[index].id;

          result = [
            ...result,
            {
              ...place,
              placeId,
            },
          ];
        }
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
export function getAllPlacesSnapshot(
  onSuccess: (data: Place[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(collection(db, "places")),
      async (places) => {
        let result: Place[] = [];
        for (let index = 0; index < places.docs.length; index++) {
          const place = places.docs[index].data() as Place;
          const placeId = places.docs[index].id;

          result = [
            ...result,
            {
              ...place,
              placeId,
            },
          ];
        }
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
export function getAllPlaces(
  onSuccess: (data: Place[]) => void,
  onError?: (error: string) => void
) {
  try {
    getDocs(query(collection(db, "places"))).then((places) => {
      let result: Place[] = [];
      for (let index = 0; index < places.docs.length; index++) {
        const place = places.docs[index].data() as Place;
        const placeId = places.docs[index].id;
        result = [
          ...result,
          {
            ...place,
            placeId,
          },
        ];
      }
      onSuccess(result);
    });
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
}
export function getPlaceSnapshot(
  placeId: string,
  onSuccess: (data: Place) => void,
  onError: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(doc(db, "places", placeId), async (place) => {
      let result: Place = place.data() as Place;
      onSuccess(result);
    });
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
export async function getPlaceByRef(placeRef: DocumentReference) {
  let result = null;
  let error = null;

  try {
    result = (await getDoc(placeRef)).data() as Place;
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
export async function getPlacesByLocation_Time_Activity({
  coordinates,
  time,
  activity,
}: {
  coordinates?: CoordinatesType;
  time?: string;
  activity?: string;
}) {
  let result: Place[] = [];
  let error = null;
  try {
    let q: Query | null = null;
    if (!coordinates && !time && activity) {
      q = query(
        collection(db, "places"),
        where("activityType", "==", activity)
      );
      const data = await getDocs(q);
      result = data.docs.map((doc) => doc.data() as Place);
    } else if (coordinates && !time && !activity) {
      const center: Geopoint = [coordinates.lat, coordinates.lng];
      const radiusInM = 50 * 1000;
      const bounds = geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
        const q = query(
          collection(db, "places"),
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1])
        );
        const snapshot = getDocs(q);
        // snapshot.then((d) => console.log(d.docs[0].data()));
        promises.push(snapshot);
      }
      const snapshots = await Promise.all(promises);
      const matchingDocs: Place[] = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const placeCoords: CoordinatesType = doc.get("coordinates");
          const distanceInKm = distanceBetween(
            [placeCoords.lat, placeCoords.lng],
            center
          );
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc.data() as Place);
          }
        }
      }
      result = matchingDocs;
    } else if (coordinates && !time && activity) {
      const center: Geopoint = [coordinates.lat, coordinates.lng];
      const radiusInM = 50 * 1000;
      const bounds = geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
        const q = query(
          collection(db, "places"),
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1]),
          where("activityType", "==", activity)
        );
        const snapshot = getDocs(q);
        promises.push(snapshot);
      }
      const snapshots = await Promise.all(promises);
      const matchingDocs: Place[] = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const placeCoords: CoordinatesType = doc.get("coordinates");
          const distanceInKm = distanceBetween(
            [placeCoords.lat, placeCoords.lng],
            center
          );
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc.data() as Place);
          }
        }
      }
      result = matchingDocs;
    }
  } catch (e) {
    console.log(e);
    error = e;
  }
  return { result, error };
}
