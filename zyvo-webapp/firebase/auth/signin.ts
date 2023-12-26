import firebase_app from "@/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
type errorType = { message: string; code: string };

export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
