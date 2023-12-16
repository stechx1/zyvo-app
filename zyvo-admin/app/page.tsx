import { PropertyList } from "@/collections/PropertyListing/PropertyListing";
import { residentialListing } from "@/data";

export default function Home() {
  return (
    <div className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 py-8">
      <PropertyList propertyListing={residentialListing} />
    </div>
  );
}
