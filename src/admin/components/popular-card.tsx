import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Trip } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Map, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface Props {
  title: string;
  subTitle: string;
  trips: Trip[];
}

export default function PopularTripsCard({ title, subTitle, trips }: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardDescription>{subTitle}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <ScrollArea className="w-full h-full md:h-96">
        <CardContent>
          {trips?.map((trip: Trip) => (
            <Card
              key={trip._id}
              className="flex justify-between gap-1 mb-2 group"
            >
              <CardHeader className=" p-0">
                <img
                  src={trip.images[0].url}
                  className="max-h-24 max-w-24 aspect-square rounded-l-lg"
                />
              </CardHeader>
              <CardContent className="w-full flex flex-col p-2">
                <CardTitle className="w-full h-7 overflow-hidden text-md">
                  <Link
                    to={`/trips/${trip.slug}`}
                    className="group-hover:text-orange-500"
                  >
                    {trip.title}
                  </Link>
                </CardTitle>
                <CardDescription className="w-full h-8 overflow-hidden text-xs font-light">
                  {trip.overview}
                </CardDescription>
                <CardDescription className="flex items-center gap-4 mt-1 text-gray-500 text-xs md:textsm">
                  <span className="min-w-fit flex gap-1 items-center">
                    <Map size={14} /> Cox's Bazar
                  </span>
                  <span className="min-w-fit flex gap-1 items-center">
                    <FaBangladeshiTakaSign size={12} /> {trip.cost}
                  </span>
                  <span className="min-w-fit flex gap-1 items-center">
                    <Users size={12} /> 1 Person
                  </span>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
