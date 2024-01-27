export type User = {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  photoURL?: string;
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  isSocialLogin: boolean;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  paymentMethod?: string;
  aboutMe?: string;
  addresses?: string[];
  works?: string[];
  languages?: string[];
  hobbies?: string[];
  pets?: string[];
  notFirstSignIn?: boolean;
  reviewsCount: number;
  rating: number;
  favoritePlaces: string[];
  lastActive: Date;
};
