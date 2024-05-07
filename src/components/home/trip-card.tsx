import Trip1 from "@/assets/trip-1.png";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Clock, MapPin, Star } from "lucide-react";

export default function TripCard() {
  return (
    <Card className="p-0 overflow-hidden hover:shadow-md duration-300">
      <CardHeader className="p-0">
        <img src={Trip1} className="" />
      </CardHeader>
      <CardContent className="p-3 py-1">
        <p className="inline-flex items-center gap-1 text-xs font-thin">
          <MapPin size={14} />
          <span>New York, USA</span>
        </p>
        <CardTitle className="font-medium text-md hover:text-orange-600 duration-300">
          <Link to="/">
            Molokini and Turtle Town Snorkeling Adventure Aboard
          </Link>
        </CardTitle>

        <p className="inline-flex items-center gap-1 font-thin text-sm mt-1">
          <Star size={14} />
          <span>4.8(243)</span>
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between gap-2 px-3 py-2.5">
        <p className="inline-flex items-center gap-1 font-thin text-sm">
          <Clock size={16} /> 4 days
        </p>
        <p className="inline-flex items-center gap-1 font-thin text-sm">
          From<strong className="font-semibold">$256</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
