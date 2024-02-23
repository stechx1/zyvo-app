import { DocumentReference } from "firebase/firestore";

export type Booking = {
  bookingId: string;
  hours: number;
  from: Date;
  to: Date;
  placeRef: DocumentReference;
  userRef: DocumentReference;
  hostRef: DocumentReference;
  createdAt: Date;
  status: BookingStatusType;
  placeReviewRef?: DocumentReference;
  guestReviewRef?: DocumentReference;
};

export type BookingStatusType =
  | "REQUESTED"
  | "FINISHED"
  | "WAITING PAYMENT"
  | "CANCELLED"
  | "CONFIRMED"
  | "DECLINED";
