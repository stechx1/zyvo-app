export type PropertyItem = {
    id: number;
    title: string;
    imageUrl: string;
    host: string;
    location: string;
    hostImage: string;
    type: string;
    price: number;
    reviews: string;
    rating: number;
    milesAway: string;
  };


export interface PropertyLisitngProps {
    propertyListing: PropertyItem[];
}