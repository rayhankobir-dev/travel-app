import { ArrowRight, MapPin, Plane } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { Trip } from "@/types";

export default function TourItem({ trip }: { trip: Trip }) {
  return (
    <Card className="grid md:flex justify-between rounded-2xl">
      <CardHeader className="min-w-fit relative p-3">
        <img
          src={trip.images[0].url}
          className="h-48 aspect-square rounded-xl"
        />
        {trip.discount > 0 && (
          <div className="absolute top-5 left-5 py-1.5 px-2 bg-orange-500 font-thin text-xs text-white rounded-lg">
            {trip.discount} % OFF
          </div>
        )}
      </CardHeader>

      <CardContent className="w-full flex flex-col justify-between px-3 md:px-5 pb-1.5 md:py-5">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <MapPin size={15} /> <span>{trip.location?.location}</span>
          </p>
          <h3 className="font-medium text-sm">{trip.title}</h3>
          <p className="font-thin text-sm max-h-16 overflow-hidden">
            {trip.overview}
          </p>
        </div>

        <div className="inline-flex justify-between gap-2 font-thin text-sm py-1.5">
          <p>
            <strong>Started At:</strong> {format(trip.startedAt, "PP")}
          </p>
          <p>
            <strong>Ended At:</strong> {format(trip.endedAt, "PP")}
          </p>
          <p>
            <strong>Duration:</strong> {trip.duration} days
          </p>
        </div>
      </CardContent>

      <Separator orientation="vertical" className="hidden md:block" />
      <Separator orientation="horizontal" className="md:hidden" />

      <CardFooter className="min-w-fit flex flex-col justify-between p-3 md:py-5 px-3 md:px-6">
        <div className="w-full grid grid-cols-2 md:flex md:flex-col gap-2">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <strong>Transportation:</strong> <Plane size={15} /> Mixed
          </p>
          <p className="inline-flex items-center gap-2 font-light text-sm">
            <strong>Aviailable:</strong>
            {trip.bookingCount && trip.groupSize - trip.bookingCount}
            {!trip.bookingCount && trip.groupSize} person
          </p>
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <strong>Tax:</strong> {trip.tax} %
          </p>
        </div>
        <p className="flex items-center gap-1.5 font-thin text-md py-3 lg:py-0">
          From
          <strong className="flex items-center font-medium">
            <FaBangladeshiTakaSign size={13} /> {trip.cost.toFixed(2)}
          </strong>
        </p>
        <Button
          variant="outline"
          className="w-full md:w-fit rounded-lg border-orange-500 hover:bg-orange-50 text-orange-600 hover:text-orange-600"
          asChild
        >
          <Link to={`/trips/${trip.slug}`}>
            View Details <ArrowRight size={15} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
