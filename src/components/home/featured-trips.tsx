import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TripCard from "./trip-card";

export function FeaturedTrips() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
          <TripCard />
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
          <TripCard />
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
          <TripCard />
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
          <TripCard />
        </CarouselItem>
        <CarouselItem className="pl-1 md:basis-1/3 lg:basis-1/4">
          <TripCard />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
