import { DocumentReference } from "firebase/firestore";

export type Booking = {
  bookingId: string;
  hours: number;
  date: Date;
  from: string;
  to: string;
  place?: DocumentReference;
  user?: DocumentReference;
  createdAt?: Date;
};
