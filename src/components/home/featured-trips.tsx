import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TripCard from "./trip-card";
import { useEffect, useState } from "react";
import { publicAxios } from "@/api";
import SpinerLoading from "../ui/spinner-loading";
import { Trip } from "@/types";

export function FeaturedTrips() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState(null);
  useEffect(() => {
    async function fetchPopularTrips() {
      try {
        const res = await publicAxios.get("/trips/popular");
        setTrips(res.data.data.trips);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPopularTrips();
  }, []);
  return loading || !trips ? (
    <SpinerLoading />
  ) : (
    <Carousel className="w-full max-w-full">
      <CarouselContent className="-ml-1">
        {trips?.map((trip: Trip) => (
          <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
            <TripCard trip={trip} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
