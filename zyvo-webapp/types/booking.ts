import { DocumentReference } from "firebase/firestore";

export type Booking = {
  bookingId: string;
  hours: number;
  date: Date;
  from: string;
  to: string;
  placeRef: DocumentReference;
  userRef: DocumentReference;
  createdAt: Date;
  status:
    | "REQUESTED"
    | "FINISHED"
    | "WAITING PAYMENT"
    | "CANCELLED"
    | "CONFIRMED";
  reviewRef?: DocumentReference;
};
