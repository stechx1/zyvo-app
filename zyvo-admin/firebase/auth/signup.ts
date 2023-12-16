import firebase_app from "@/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
type errorType = { message: string; code: string };

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
