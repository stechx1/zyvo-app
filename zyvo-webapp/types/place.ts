import { DocumentReference } from "firebase/firestore";
import { Geohash } from "geofire-common";
export type amenety =
  | "WIFI"
  | "WASHER"
  | "HEATING"
  | "DRYER"
  | "KITCHEN"
  | "AIR CONDITIONING";

type addOn = {
  name: string;
  price: number;
};
export type CoordinatesType = { lat: number; lng: number };

export type Place = {
  placeId: string;
  addOns: addOn[];
  allowPets: boolean;
  ameneties: amenety[];
  availableMonths: number[];
  availableDays: number[];
  availableHoursFrom: string;
  availableHoursTo: string;
  bathrooms: number;
  bedrooms?: number;
  size?: number;
  peopleCount: number;
  coordinates: CoordinatesType;
  city: string;
  country: string;
  description: string;
  discountedMinHours: number;
  discountPercentage: number;
  hostRules: string;
  images: string[];
  instantBook: boolean;
  minHours: number;
  parkingRules: string;
  pricePerHour: number;
  activityType: string;
  selfCheckIn: boolean;
  spaceType: string;
  state: string;
  street: string;
  zipCode: string;
  createdAt?: Date;
  userRef?: DocumentReference;
  reviewsCount: number;
  rating: number;
  status: string;
  geohash: Geohash;
};
