import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Poppins, Roboto } from "next/font/google";
import { User } from "@/types/user";
import { format, parse, parseISO } from "date-fns";
import { CoordinatesType } from "@/types/place";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getEllipsesText = (text: string, maxLength: number) => {
  if (text.length >= maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
};

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const getOtherUser = (users: User[], user: User) => {
  const filteredUsers = users.filter((u) => {
    return u.userId !== user?.userId;
  });
  if (filteredUsers.length > 0) return filteredUsers[0];
};

export const getFullName = (user?: User) => {
  if (user) {
    return user.firstName + " " + user.lastName;
  }
  return "";
};
export const timeArray = [
  { label: "12:00 AM", value: "00:00" },
  { label: "12:30 AM", value: "00:30" },
  { label: "01:00 AM", value: "01:00" },
  { label: "01:30 AM", value: "01:30" },
  { label: "02:00 AM", value: "02:00" },
  { label: "02:30 AM", value: "02:30" },
  { label: "03:00 AM", value: "03:00" },
  { label: "03:30 AM", value: "03:30" },
  { label: "04:00 AM", value: "04:00" },
  { label: "04:30 AM", value: "04:30" },
  { label: "05:00 AM", value: "05:00" },
  { label: "05:30 AM", value: "05:30" },
  { label: "06:00 AM", value: "06:00" },
  { label: "06:30 AM", value: "06:30" },
  { label: "07:00 AM", value: "07:00" },
  { label: "07:30 AM", value: "07:30" },
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "09:00 AM", value: "09:00" },
  { label: "09:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
  { label: "06:00 PM", value: "18:00" },
  { label: "06:30 PM", value: "18:30" },
  { label: "07:00 PM", value: "19:00" },
  { label: "07:30 PM", value: "19:30" },
  { label: "08:00 PM", value: "20:00" },
  { label: "08:30 PM", value: "20:30" },
  { label: "09:00 PM", value: "21:00" },
  { label: "09:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" },
];
export const monthsArray = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 1 },
  { name: "Mar", value: 2 },
  { name: "Apr", value: 3 },
  { name: "May", value: 4 },
  { name: "Jun", value: 5 },
  { name: "Jul", value: 6 },
  { name: "Aug", value: 7 },
  { name: "Sep", value: 8 },
  { name: "Oct", value: 9 },
  { name: "Nov", value: 10 },
  { name: "Dec", value: 11 },
];
export const daysArray = [
  { name: "Sun", value: 0 },
  { name: "Mon", value: 1 },
  { name: "Tue", value: 2 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 4 },
  { name: "Fri", value: 5 },
  { name: "Sat", value: 6 },
];
export const formatDate = (date: string) => {
  const parsedDate = parseISO(date); // Parse the ISO string to a Date object
  return format(parsedDate, "MMMM d, yyyy");
};

export const formatTime = (timeString: string) => {
  const parsedTime = parse(timeString, "HH:mm", new Date()); // Parse the time string
  const formattedTime = format(parsedTime, "h:mm a"); // Format the time to "h:mm a" (e.g., 4:00 PM)
  return formattedTime;
};
export const debounce = (
  mainFunction: () => void,
  delay: number,
  previousTimer?: NodeJS.Timeout
) => {
  let timer: NodeJS.Timeout;
  return function () {
    previousTimer && clearTimeout(previousTimer);
    timer = setTimeout(() => {
      mainFunction();
    }, delay);
    return timer;
  };
};
export function haversine_distance(mk1: CoordinatesType, mk2: CoordinatesType) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d.toFixed(2); // in Miles
}
export type ActivitiesArrayType = {
  Stays: string;
  "Event Space": string;
  "Photo Shoot": string;
  Meeting: string;
  Party: string;
  "Film Shoot": string;
  Performance: string;
  Workshop: string;
  "Corporate Event": string;
  Wedding: string;
  Dinner: string;
  Retreat: string;
  "Pop-up": string;
  Networking: string;
  "Fitness Class": string;
  "Audio Recording": string;
};
export const ActivitiesArray: ActivitiesArrayType = {
  Stays: "STAYS",
  "Event Space": "EVENTSPACE",
  "Photo Shoot": "PHOTOSHOOT",
  Meeting: "MEETING",
  Party: "PARTY",
  "Film Shoot": "FILMSHOOT",
  Performance: "PERFORMANCE",
  Workshop: "WORKSHOP",
  "Corporate Event": "CORPORATE EVENT",
  Wedding: "WEDDING",
  Dinner: "DINNER",
  Retreat: "RETREAT",
  "Pop-up": "POPUP",
  Networking: "NETWORKING",
  "Fitness Class": "FITNESSCLASS",
  "Audio Recording": "AUDIORECORDING",
};
