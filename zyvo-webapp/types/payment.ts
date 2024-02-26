import { DocumentReference } from "firebase/firestore";

export type Payment = {
  date: Date;
  price: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  bookingRef: DocumentReference;
  guestRef: DocumentReference;
  hostRef: DocumentReference;
};
