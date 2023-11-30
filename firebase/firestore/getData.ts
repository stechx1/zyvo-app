import firebase_app from "@/config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function getData(colllection: string, id: string) {
  let result = null;
  let error = null;

  try {
    result = (await getDoc(doc(db, colllection, id))).data();
  } catch (e) {
    console.log(e);
    error = e;
  }

  return { result, error };
}
