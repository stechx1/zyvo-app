import firebase_app from "@/config";
import { User } from "@/types/user";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
const db = getFirestore(firebase_app);

export async function getUserByRef(userRef: DocumentReference) {
  let result = null;
  let error = null;

  try {
    result = (await getDoc(userRef)).data() as User;
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
export async function getUserByPath(userPath: string) {
  let result = null;
  let error = null;

  try {
    result = (await getDoc(doc(db, userPath))).data() as User;
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
export async function getUserById(userId: string) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(collection(db, "users"), userId);

    result = (await getDoc(userRef)).data() as User;
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
export async function updateFavourites(userId: string, placeId: string) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(collection(db, "users"), userId);
    const user = (await getDoc(userRef)).data() as User;
    let newFavouritePlaces: string[] = user?.favoritePlaces ?? [];
    if (newFavouritePlaces.includes(placeId)) {
      newFavouritePlaces = newFavouritePlaces.filter(
        (place) => place != placeId
      );
    } else {
      newFavouritePlaces = [...newFavouritePlaces, placeId];
    }
    result = newFavouritePlaces;
    setDoc(userRef, { favoritePlaces: newFavouritePlaces }, { merge: true });
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
export async function updateLastActive(userId: string) {
  let result = null;
  let error = null;

  try {
    const userRef = doc(collection(db, "users"), userId);
    setDoc(userRef, { lastActive: new Date() }, { merge: true });
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
