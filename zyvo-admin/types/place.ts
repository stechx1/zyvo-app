type amenety =
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
  addOns: addOn[];
  allowPets: boolean;
  ameneties: amenety[];
  availableMonths: number[];
  availableDays: number[];
  availableHoursFrom: number;
  availableHoursTo: number;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  city: "Washington";
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
  spaceType: "HOME" | "ROOM";
  state: string;
  street: string;
  zipCode: string;
};
