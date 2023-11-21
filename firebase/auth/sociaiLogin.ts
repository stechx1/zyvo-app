import firebase_app from "@/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { profileData } from "@/types/profile";
import addData from "../firestore/addData";
import toast from "react-hot-toast";

const auth = getAuth(firebase_app);
type errorType = { message: string; code: string };

export async function googleSignin() {
  try {
    let provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(function ({ user }) {
        const profileData: profileData = {
          firstName: "",
          lastName: "",
          email: "",
          emailVerified: false,
          photoURL: "",
          phoneNumber: "",
          phoneNumberVerified: false,
          isSocialLogin: true,
        };
        const splitedDisplayName = user.displayName?.split(" ") ?? [""];
        if (splitedDisplayName?.length > 1) {
          profileData.lastName = splitedDisplayName.slice(1).join(" ");
        }
        profileData.firstName = splitedDisplayName[0];
        profileData.email = user.email ?? "";
        profileData.emailVerified = user.emailVerified ?? "";
        profileData.photoURL = user.photoURL ?? "";
        profileData.phoneNumber = user.phoneNumber ?? "";
        profileData.phoneNumberVerified = !!user.phoneNumber;

        addData("users", user?.uid, profileData);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    if (typeof e === "object") {
      toast.error((e as errorType).message);
    }
  }
}
