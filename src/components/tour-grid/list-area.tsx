import SortsOptions, { SortOption } from "./sort-options";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { publicAxios } from "@/api";
import TourItem from "./tour-item";

const sortOptionsLabels: Record<SortOption, string> = {
  az: "A to Z",
  za: "Z to A",
  hl: "High to Low",
  lh: "Low to High",
};

export default function ListingArea() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "az"
  );

  const [fetching, setFetching] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);

        const params = {
          location: searchParams.get("location"),
          from: searchParams.get("from"),
          to: searchParams.get("to"),
          maxPrice: searchParams.get("maxPrice"),
          sort: searchParams.get("sort"),
        };

        const res = await publicAxios.get("/trips", { params });
        setTrips(res.data.data.trips);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortBy);
    setSearchParams(params);
  }, [searchParams, setSearchParams, sortBy]);

  return (
    <section className="col-span-12 lg:col-span-9">
      <div className="flex justify-between gap-2">
        <p className="font-light text-sm">{trips.length} results</p>
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
        {fetching || trips.length == 0 ? (
          <TripsSkeleton />
        ) : (
          trips?.map((trip, index) => <TourItem key={index} trip={trip} />)
        )}
      </div>
    </section>
  );
}

function TripsSkeleton() {
  return (
    <section className="space-y-2">
      <article className="h-48 flex gap-3 border rounded-lg p-3">
        <Skeleton className="h-full w-full max-w-48 rounded-lg" />
        <div className="w-full flex flex-col justify-between pr-4">
          <div className="w-full flex flex-col gap-1">
            <Skeleton className="h-3 max-w-48" />
            <Skeleton className="h-8 max-w-md mt-2" />
            <Skeleton className="h-2 w-full mt-4" />
            <Skeleton className="h-2 w-full mt-2" />
            <Skeleton className="h-2 w-1/2 mt-2" />
          </div>
          <div className="flex gap-10">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="w-48 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-2 w-full mt-4" />
            <Skeleton className="h-2 w-full mt-2" />
            <Skeleton className="h-2 w-1/2 mt-2" />
          </div>
          <Skeleton className="h-8 rounded-lg" />
        </div>
      </article>
      <article className="h-48 flex gap-3 border rounded-lg p-3">
        <Skeleton className="h-full w-full max-w-48 rounded-lg" />
        <div className="w-full flex flex-col justify-between pr-4">
          <div className="w-full flex flex-col gap-1">
            <Skeleton className="h-3 max-w-48" />
            <Skeleton className="h-8 max-w-md mt-2" />
            <Skeleton className="h-2 w-full mt-4" />
            <Skeleton className="h-2 w-full mt-2" />
            <Skeleton className="h-2 w-1/2 mt-2" />
          </div>
          <div className="flex gap-10">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <Separator orientation="vertical" className="hidden md:block" />
        <div className="w-48 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-2 w-full mt-4" />
            <Skeleton className="h-2 w-full mt-2" />
            <Skeleton className="h-2 w-1/2 mt-2" />
          </div>
          <Skeleton className="h-8 rounded-lg" />
        </div>
      </article>
    </section>
  );
}
