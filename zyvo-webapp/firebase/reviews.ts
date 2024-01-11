import firebase_app from "@/config";
import { User } from "@/types/profile";
import { Review } from "@/types/review";
import {
  Unsubscribe,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  onSnapshot,
  query,
  setDoc,
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

export async function addReview({
  comment,
  placeRating,
  communicationRating,
  responseRating,
  placeId,
  userId,
}: {
  comment: string;
  placeRating: number;
  communicationRating: number;
  responseRating: number;
  placeId: string;
  userId: string;
}) {
  let result = null;
  let error = null;

  try {
    const reviewRef = doc(collection(db, "reviews"));
    const review: Review = {
      reviewId: reviewRef.id,
      comment,
      communicationRating,
      createdAt: new Date(),
      placeRating,
      responseRating,
      placeRef: doc(collection(db, "places"), placeId),
      userRef: doc(collection(db, "users"), userId),
    };
    setDoc(reviewRef, review);
    updatePlaceReviews(
      placeId,
      (placeRating + responseRating + communicationRating) /
        ((placeRating > 0 ? 1 : 0) +
          (communicationRating > 0 ? 1 : 0) +
          (responseRating > 0 ? 1 : 0))
    );
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
    console.log(e);
  }
  return { result, error };
}

async function updatePlaceReviews(docId: string, newRating: number) {
  const placeRef = doc(collection(db, "places"), docId);
  const place = await (await getDoc(placeRef)).data();
  if (place) {
    let rating = place.rating ?? 0;
    let reviewCounts = place.reviewCounts ?? 0;
    let updatedRating =
      (rating * reviewCounts + newRating) / (reviewCounts + 1);
    setDoc(
      placeRef,
      {
        rating: updatedRating,
        reviewsCount: reviewCounts + 1,
      },
      {
        merge: true,
      }
    );
  }
}
