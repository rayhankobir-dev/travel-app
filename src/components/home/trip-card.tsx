import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Trip } from "@/types";
import { PiSeat } from "react-icons/pi";
import { TbRipple } from "react-icons/tb";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card className="p-0 overflow-hidden hover:shadow-md duration-300">
      <CardHeader className="p-0">
        <img src={trip.images[0].url} className="max-h-48" />
      </CardHeader>
      <CardContent className="p-3 py-1">
        <p className="inline-flex items-center gap-1 text-xs font-thin">
          <MapPin size={14} />
          <span>{trip.location.location}</span>
        </p>
        <CardTitle className="font-medium text-md hover:text-orange-600 duration-300">
          <Link to="/">{trip.title}</Link>
        </CardTitle>

        <p className="inline-flex items-center gap-1 font-light text-sm mt-1">
          <Users size={14} />
          Available:
          <span className="font-thin">50 person</span>
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between gap-2 px-3 py-2.5">
        <p className="inline-flex items-center gap-1 font-thin text-sm">
          <Clock size={16} /> {trip.discount} days
        </p>
        <p className="inline-flex items-center gap-1 font-thin text-sm">
          From
          <strong className="inline-flex items-center font-semibold">
            <FaBangladeshiTakaSign /> {trip.cost.toFixed(2)}
          </strong>
        </p>
      </CardFooter>
    </Card>
  );
}
