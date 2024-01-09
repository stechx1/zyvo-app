import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { Unsubscribe } from "firebase/auth";
import { Booking } from "@/types/booking";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export async function addUpdateBooking(
  booking: Booking,
  userId: string,
  placeId: string,
  docId: string = ""
) {
  let result = null;
  let error = null;

  try {
    let bookingRef;
    if (docId) bookingRef = doc(collection(db, "bookings"), docId);
    else bookingRef = doc(collection(db, "bookings"));

    await setDoc(
      bookingRef,
      {
        ...booking,
        bookingId: bookingRef.id,
        user: doc(db, "users", userId),
        place: doc(db, "places", placeId),
        createdAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
    result = bookingRef.id;
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
    console.log(e);
  }
  return { result, error };
}
export function getBookingSnapshot(
  bookingId: string,
  onSuccess: (data: Booking) => void,
  onError: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      doc(db, "bookings", bookingId),
      async (booking) => {
        let result: Booking = {
          ...booking.data(),
          date: booking.data()?.date.toDate(),
        } as Booking;
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
export function getMyBookingsSnapshot(
  userId: string,
  onSuccess: (data: Booking[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "bookings"),
        where("user", "==", doc(db, "users", userId))
      ),
      async (bookings) => {
        let result: Booking[] = [];
        for (let index = 0; index < bookings.docs.length; index++) {
          const booking = bookings.docs[index].data();
          result = [
            ...result,
            {
              ...booking,
              date: booking.date.toDate(),
            } as Booking,
          ];
          onSuccess(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
