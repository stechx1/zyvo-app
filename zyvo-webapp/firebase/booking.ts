import {
  DocumentReference,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firebase_app from "@/config";
import { Unsubscribe } from "firebase/auth";
import { Booking, BookingStatusType } from "@/types/booking";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export async function addUpdateBooking(
  bookingData: {
    date: Date;
    from: string;
    to: string;
    hours: number;
    status: BookingStatusType;
  },
  data: {
    userId: string;
    placeId: string;
    hostId: string;
    bookingId?: string;
  }
) {
  let result = null;
  let error = null;

  try {
    let bookingRef;
    if (data.bookingId)
      bookingRef = doc(collection(db, "bookings"), data.bookingId);
    else bookingRef = doc(collection(db, "bookings"));
    const booking: Booking = {
      ...bookingData,
      bookingId: bookingRef.id,
      userRef: doc(db, "users", data.userId),
      hostRef: doc(db, "users", data.hostId),
      placeRef: doc(db, "places", data.placeId),
      createdAt: new Date(),
    };
    await setDoc(bookingRef, booking, {
      merge: true,
    });
    result = bookingRef.id;
  } catch (e) {
    if (typeof e === "object") error = e as errorType;
    console.log(e);
  }
  return { result, error };
}
export async function updateStatusBooking(
  bookingId: string,
  status: BookingStatusType
) {
  let result = null;
  let error = null;
  try {
    let bookingRef = doc(collection(db, "bookings"), bookingId);
    await setDoc(
      bookingRef,
      { status },
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
export async function updateReviewsBooking(
  bookingId: string,
  placeReviewRef?: DocumentReference,
  guestReviewRef?: DocumentReference
) {
  let result = null;
  let error = null;
  let data = {};
  if (guestReviewRef) data = { guestReviewRef };
  if (placeReviewRef) data = { placeReviewRef };
  try {
    let bookingRef = doc(collection(db, "bookings"), bookingId);
    await setDoc(bookingRef, data, {
      merge: true,
    });
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
  mode: "GUEST" | "HOST",
  userId: string,
  onSuccess: (data: Booking[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "bookings"),
        where(
          mode === "GUEST" ? "userRef" : "hostRef",
          "==",
          doc(db, "users", userId)
        ),
        orderBy("createdAt")
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
export function getPlaceBookingsSnapshot(
  placeId: string,
  onSuccess: (data: Booking[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "bookings"),
        where("placeRef", "==", doc(db, "places", placeId))
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
