import firebase_app from "@/config";
import { User } from "@/types/user";
import { Review } from "@/types/review";
import {
  Unsubscribe,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export function getReviewsSnapshot(
  onSuccess: (data: Review[]) => void,
  placeId?: string,
  guestId?: string,
  onError?: (error: string) => void
) {
  if (!placeId && !guestId) return;
  let unsubscribe: Unsubscribe = () => {};
  console.log(placeId);
  console.log(guestId);

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "reviews"),
        placeId
          ? where("placeRef", "==", doc(db, "places", placeId))
          : guestId
          ? where("guestRef", "==", doc(db, "users", guestId))
          : where("", "==", ""),
        orderBy("createdAt", "desc")
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
  guestId,
}: {
  comment: string;
  placeRating: number;
  communicationRating: number;
  responseRating: number;
  placeId?: string;
  userId: string;
  guestId?: string;
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
      [placeId ? "placeRef" : guestId ? "guestRef" : ""]: doc(
        collection(db, placeId ? "places" : guestId ? "users" : ""),
        placeId ? placeId : guestId ? guestId : ""
      ),
      userRef: doc(collection(db, "users"), userId),
    };
    await setDoc(reviewRef, review);
    if (placeId)
      await updatePlaceReviews(
        placeId,
        (placeRating + responseRating + communicationRating) /
          ((placeRating > 0 ? 1 : 0) +
            (communicationRating > 0 ? 1 : 0) +
            (responseRating > 0 ? 1 : 0))
      );
    if (guestId)
      await updateGuestReviews(
        guestId,
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
    let reviewsCount = place.reviewsCount ?? 0;
    let updatedRating =
      (rating * reviewsCount + newRating) / (reviewsCount + 1);
    setDoc(
      placeRef,
      {
        rating: updatedRating,
        reviewsCount: reviewsCount + 1,
      },
      {
        merge: true,
      }
    );
  }
}
async function updateGuestReviews(docId: string, newRating: number) {
  const guestRef = doc(collection(db, "users"), docId);
  const guest = await (await getDoc(guestRef)).data();
  if (guest) {
    let rating = guest.rating ?? 0;
    let reviewsCount = guest.reviewsCount ?? 0;
    let updatedRating =
      (rating * reviewsCount + newRating) / (reviewsCount + 1);
    setDoc(
      guestRef,
      {
        rating: updatedRating,
        reviewsCount: reviewsCount + 1,
      },
      {
        merge: true,
      }
    );
  }
}
