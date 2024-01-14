import { DocumentReference } from "firebase/firestore";
import { User } from "./user";
import { Place } from "./place";

export type Review = {
  reviewId: string;
  createdAt: Date;
  comment: string;
  placeRating: number;
  communicationRating: number;
  responseRating: number;
  user?: User;
  place?: Place;
  host?: User;
  userRef: DocumentReference;
  placeRef?: DocumentReference;
  guestRef?: DocumentReference;
};
