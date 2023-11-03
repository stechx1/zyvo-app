import firebase_app from "@/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { profileData, setProfile } from "./profile";

const auth = getAuth(firebase_app);

export async function googleSignin() {
  let result = null,
    error = null;
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

        setProfile(user?.uid, profileData);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
