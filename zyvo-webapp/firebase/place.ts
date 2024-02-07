import {
  DocumentReference,
  Query,
  QueryConstraint,
  WhereFilterOp,
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
import { daysArray } from "@/lib/utils";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export async function addUpdatePlace(placeData: Place, userId: string) {
  let result = null;
  let error = null;

  try {
    let placeRef;
    if (placeData.placeId)
      placeRef = doc(collection(db, "places"), placeData.placeId);
    else placeRef = doc(collection(db, "places"));
    let filters = {
      "X-SUN": false,
      "X-MON": false,
      "X-TUE": false,
      "X-WED": false,
      "X-THU": false,
      "X-FRI": false,
      "X-SAT": false,
      "X-JAN": false,
      "X-FEB": false,
      "X-MAR": false,
      "X-APR": false,
      "X-MAY": false,
      "X-JUN": false,
      "X-JUL": false,
      "X-AUG": false,
      "X-SEP": false,
      "X-OCT": false,
      "X-NOV": false,
      "X-DEC": false,
    };
    placeData.availableMonths.forEach((n) => {
      const date = new Date(2000, n, 1);
      const name =
        date.toLocaleString("en-US", { month: "short" })?.toUpperCase() ?? "";
      filters = { ...filters, ["X-" + name]: true };
    });
    placeData.availableDays.forEach((n) => {
      const name =
        daysArray.find((d) => d.value == n)?.name?.toUpperCase() ?? "";
      filters = { ...filters, ["X-" + name]: true };
    });
    const place: Place = {
      ...placeData,
      placeId: placeRef.id,
      userRef: doc(db, "users", userId),
      createdAt: new Date(),
      geohash: geohashForLocation([
        placeData.coordinates.lat,
        placeData.coordinates.lng,
      ]),
      ...filters,
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
  dates,
  activity,
}: {
  coordinates?: CoordinatesType;
  dates?: Date[];
  activity?: string;
}) {
  let result: Place[] = [];
  let error = null;
  try {
    let days: string[] = [];
    let months: string[] = [];
    dates?.forEach((date) => {
      const month = date.toLocaleString("en-US", { month: "short" });
      !months.includes(month.toUpperCase()) && months.push(month.toUpperCase());
      const day = date.toLocaleString("en-US", { weekday: "short" });
      !days.includes(day.toUpperCase()) && days.push(day.toUpperCase());
    });
    let q: Query | null = null;
    if (!coordinates && (!dates || dates.length === 0) && !activity) {
      result = [];
    } else if (!coordinates) {
      q = query(
        collection(db, "places"),
        ...getQuery({ days, months, activity })
      );
      const data = await getDocs(q);
      result = data.docs.map((doc) => doc.data() as Place);
    } else {
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
          ...(activity ? [where("activityType", "==", activity)] : [])
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
      if (dates && dates?.length > 0) {
        result = matchingDocs.filter((doc) => {
          let filter = false;
          days.forEach((day) => {
            let key = ("X-" + day) as keyof Place;
            if (doc[key]) filter = true;
            else filter = false;
          });
          return filter;
        });
      } else result = matchingDocs;
    }
  } catch (e) {
    console.log(e);
    if (typeof e === "object") error = e as errorType;
  }
  return { result, error };
}

const getQuery = ({
  days,
  months,
  activity,
}: {
  days: string[];
  months: string[];
  activity?: string;
}) => {
  let queryList: {
    property: string;
    operator: WhereFilterOp;
    value: unknown;
  }[] = [];
  if (activity) {
    queryList = [
      ...queryList,
      { property: "activityType", operator: "==", value: activity },
    ];
  }
  for (let i = 0; i < days.length; i++) {
    queryList = [
      ...queryList,
      { property: "X-" + days[i], operator: "==", value: true },
    ];
  }
  for (let i = 0; i < months.length; i++) {
    queryList = [
      ...queryList,
      { property: "X-" + months[i], operator: "==", value: true },
    ];
  }

  const queryConditions: QueryConstraint[] = queryList.map((l) => {
    return where(l.property, l.operator, l.value);
  });

  return queryConditions;
};
