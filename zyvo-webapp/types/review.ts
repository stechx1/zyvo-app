import { DocumentReference } from "firebase/firestore";
import { User } from "./profile";
import { Place } from "./place";

export type Review = {
  reviewId: string;
  createdAt: Date;
  comment: string;
  rating:number;
  user?: User;
  place?: Place;
  userRef: DocumentReference;
  placeRef: DocumentReference;
};
