import { DocumentReference } from "firebase/firestore";

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
  bedrooms: number;
  beds: number;
  city: string;
  coordinates: number[];
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
  propertyType: string;
  selfCheckIn: boolean;
  spaceType: string;
  state: string;
  street: string;
  zipCode: string;
  createdAt?: Date;
  sender?: DocumentReference;
  reviewsCount: number;
  rating: number;
};
