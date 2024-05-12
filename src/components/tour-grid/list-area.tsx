import { useState } from "react";
import SortsOptions, { SortOption } from "./sort-options";
import TourItem from "./tour-item";

const sortOptionsLabels: Record<SortOption, string> = {
  ft: "Featured",
  az: "A to Z",
  za: "Z to A",
  hl: "High to Low",
  lh: "Low to High",
};

const tour = {
  location: "Cox's Bazar, Bangladesh",
  title: "Freshment with Paragading 3day | 2night",
  overview:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos maiores provident consequuntur modi face.!",
  duration: 4,
  startDate: "12-2-2024",
  endDate: "16-2-2024",
  groupSize: 120,
  totalBooked: 50,
  price: 2500,
  discount: 20,
};

export default function ListingArea() {
  const [sortBy, setSortBy] = useState<SortOption>("az");

  return (
    <section className="col-span-12 lg:col-span-9">
      <div className="flex justify-between gap-2">
        <p className="font-light text-sm">1362 results</p>
        <div className="inline-flex items-center gap-2 font-light text-sm">
          Sort by:
          <SortsOptions
            options={sortOptionsLabels}
            selected={sortBy}
            setSelected={setSortBy}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 py-3">
        <TourItem {...tour} />
        <TourItem {...tour} />
      </div>
    </section>
  );
}
