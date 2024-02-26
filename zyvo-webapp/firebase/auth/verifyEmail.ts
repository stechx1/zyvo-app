import firebase_app from "@/config";
import { getAuth, sendEmailVerification } from "firebase/auth";

const auth = getAuth(firebase_app);
type errorType = { message: string; code: string };

export default async function verifyEmail(email: string) {
  let result = null,
    error = null;
  try {
    if (auth.currentUser) {
      result = await sendEmailVerification(auth.currentUser);
    }
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
  }

  return { result, error };
}
