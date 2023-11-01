import firebase_app from "@/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

export type profileData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  photoURL?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
};
export function setProfile(id: string, data: profileData) {
  setDoc(doc(db, "users", id), data)
    .then((result) => {})
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
