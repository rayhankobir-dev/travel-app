import Sport1 from "@/assets/sport-1.png";
import { ArrowRight, Clock, MapPin, Plane } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

interface Props {
  location: string;
  title: string;
  overview: string;
  duration: number;
  startDate: string;
  endDate: string;
  groupSize: number;
  totalBooked: number;
  price: number;
  discount: number;
}

export default function TourItem({
  location = "Paris, France",
  title,
  overview,
  duration,
  startDate,
  endDate,
  groupSize,
  totalBooked,
  price,
  discount = 20,
}: Props) {
  return (
    <Card className="grid md:flex justify-between rounded-2xl">
      <CardHeader className="min-w-fit relative p-3 ">
        <img src={Sport1} className="w-full max-h-48 rounded-xl" />
        <div className="absolute top-5 left-5 py-1.5 px-2 bg-orange-500 font-thin text-xs text-white rounded-lg">
          {discount} % OFF
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between px-3 md:px-5 pb-1.5 md:py-5">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <MapPin size={15} /> <span>{location}</span>
          </p>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="font-thin text-sm">{overview}</p>
        </div>

        <div className="inline-flex justify-between gap-2 font-thin text-sm py-1.5">
          <p>
            <strong>Tour start:</strong> {startDate}
          </p>
          <p>
            <strong>Tour end:</strong> {endDate}
          </p>
          <p>
            <strong>Total:</strong> {duration} Days
          </p>
        </div>
      </CardContent>

      <Separator orientation="vertical" className="hidden md:block" />
      <Separator orientation="horizontal" className="md:hidden" />

      <CardFooter className="min-w-fit flex flex-col justify-between p-3 md:py-5 px-3 md:px-6">
        <div className="w-full grid grid-cols-2 md:flex md:flex-col gap-2">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <Clock size={15} /> 2 Days 1 Nights
          </p>
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <Plane size={15} /> Air
          </p>
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            Aviailable: <span>{groupSize - totalBooked} person</span>
          </p>
        </div>
        <p className="flex items-center gap-1.5 font-thin text-md py-3 lg:py-0">
          From
          <strong className="flex items-center font-medium">
            <FaBangladeshiTakaSign size={13} /> {price}
          </strong>
        </p>
        <Button
          variant="outline"
          className="w-full md:w-fit rounded-xl border-orange-500 hover:bg-orange-50 text-orange-600 hover:text-orange-600"
          asChild
        >
          <Link to="/list/slug?=gkk">
            View Details <ArrowRight size={15} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
