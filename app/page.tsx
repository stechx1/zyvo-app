import { PropertyList } from "@collections";
import { residentialListing } from "@data";

export default function Home() {
  return (
    <div className="bg-white">
      <PropertyList propertyListing={residentialListing} />
    </div>
  );
}
