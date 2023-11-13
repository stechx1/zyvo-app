import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import { residentialListing } from "@/data";

export default function Home() {
  return <PropertyList propertyListing={residentialListing} />;
}
