import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { Place } from "@/types/place";
import { Unsubscribe } from "firebase/auth";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export async function addPlace(
  place: Place,
  userId: string,
  docId: string = ""
) {
  let result = null;
  let error = null;

  try {
    let placeRef;
    if (docId) placeRef = doc(collection(db, "places"), docId);
    else placeRef = doc(collection(db, "places"));

    result = await setDoc(
      placeRef,
      {
        ...place,
        placeId: placeRef.id,
        sender: doc(db, "users", userId),
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
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
    await deleteDoc(doc(db, "places", placeId));
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
        where("sender", "==", doc(db, "users", userId))
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
          onSuccess(result);
        }
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
          onSuccess(result);
        }
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
