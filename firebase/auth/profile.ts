import firebase_app from "@/config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);

export type profileData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};
export function setProfile(id: string, data: profileData) {
  setDoc(doc(db, "users", id), data)
    .then((result) => {})
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
