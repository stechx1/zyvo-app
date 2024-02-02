import {
  DocumentReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { Place } from "@/types/place";
import { Unsubscribe } from "firebase/auth";
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
