import firebase_app from "@/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { User } from "@/types/user";
import addData from "../firestore/addData";
import toast from "react-hot-toast";
import { getUserById } from "../user";

const auth = getAuth(firebase_app);
type errorType = { message: string; code: string };

export async function googleSignin() {
  try {
    let provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(function ({ user }) {
        const User: User = {
          userId: user?.uid,
          firstName: "",
          lastName: "",
          email: "",
          emailVerified: false,
          photoURL: "",
          phoneNumber: "",
          phoneNumberVerified: false,
          isSocialLogin: true,
          rating: 0,
          reviewsCount: 0,
          favoritePlaces: [],
          lastActive: new Date(),
          createdAt: new Date(),
        };
        const splitedDisplayName = user.displayName?.split(" ") ?? [""];
        if (splitedDisplayName?.length > 1) {
          User.lastName = splitedDisplayName.slice(1).join(" ");
        }
        User.firstName = splitedDisplayName[0];
        User.email = user.email ?? "";
        User.emailVerified = user.emailVerified ?? "";
        User.photoURL = user.photoURL ?? "";
        User.phoneNumber = user.phoneNumber ?? "";
        User.phoneNumberVerified = !!user.phoneNumber;
        getUserById(user.uid)
          .then(({ result, error }) => {
            if (error) console.log(error);
            else if (!result) {
              addData("users", user?.uid, User);
            }
          })
          .catch((e) => {
            console.log(e);
          });
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
