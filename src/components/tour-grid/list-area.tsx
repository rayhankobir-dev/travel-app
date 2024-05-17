import { useEffect, useState } from "react";
import SortsOptions, { SortOption } from "./sort-options";
import TourItem from "./tour-item";
import { publicAxios } from "@/api";
import SpinerLoading from "../ui/spinner-loading";

const sortOptionsLabels: Record<SortOption, string> = {
  ft: "Featured",
  az: "A to Z",
  za: "Z to A",
  hl: "High to Low",
  lh: "Low to High",
};

export default function ListingArea() {
  const [sortBy, setSortBy] = useState<SortOption>("az");
  const [fetching, setFetching] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicAxios.get("/trip");
        console.log(res.data.data.trips);
        setTrips(res.data.data.trips);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

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
        {fetching ? (
          <SpinerLoading />
        ) : (
          trips?.map((trip, index) => <TourItem key={index} trip={trip} />)
        )}
      </div>
    </section>
  );
}
