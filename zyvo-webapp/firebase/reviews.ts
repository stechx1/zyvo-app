import firebase_app from "@/config";
import { User } from "@/types/profile";
import { Review } from "@/types/review";
import {
  Unsubscribe,
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export function getReviewsSnapshot(
  placeId: string,
  onSuccess: (data: Review[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "reviews"),
        where("placeRef", "==", doc(db, "places", placeId))
      ),
      async (reviews) => {
        let result: Review[] = [];
        for (let index = 0; index < reviews.docs.length; index++) {
          const review = reviews.docs[index].data();
          const user = (await getDoc(review.userRef)).data() as User;
          result = [
            ...result,
            {
              ...review,
              createdAt: review.createdAt.toDate(),
              user,
            } as Review,
          ];
        }
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
