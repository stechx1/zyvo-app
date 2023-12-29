import firebase_app from "@/config";
import { profileData } from "@/types/profile";
import {
  DocumentReference,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
const db = getFirestore(firebase_app);

export async function getUserByRef(userRef: DocumentReference) {
  let result = null;
  let error = null;

  try {
    result = (await getDoc(userRef)).data() as profileData;
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
    result = (await getDoc(doc(db, userPath))).data() as profileData;
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
