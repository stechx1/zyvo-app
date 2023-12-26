import firebase_app from "@/config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export default async function addData(
  colllection: string,
  id: string,
  data: any
) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
