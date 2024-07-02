/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Breadcrumb from "@/components/ui/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "@/api";

export default function AllTrips() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await authAxios("/trips");
        setTrips(res.data.data.trips);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <main className="h-full flex flex-col">
      <section className="border-b">
        <Breadcrumb className="px-3 py-3" />
        <div className="flex flex-wrap items-center justify-between px-3 pb-3">
          <div>
            <h2 className="font-medium text-2xl">All Trips</h2>
            <p className="font-light text-sm">Make them published</p>
          </div>
          <div>
            <Button
              variant="outline"
              className="h-8 flex gap-1.5 px-2 font-normal text-sm bg-orange-50 text-orange-500 border-orange-500 hover:bg-orange-100 hover:text-orange-600"
              asChild
            >
              <Link to="/dashboard/trips/create">
                <BiTrip size={14} /> Create trip
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="flex-1 p-3 overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {!loading &&
            trips.map((trip, index) => <TripCard key={index} trip={trip} />)}
        </div>
      </section>
    </main>
  );
}

import { ArrowRight, MapPin, PenBox, Trash2 } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { BiTrip } from "react-icons/bi";
import { Trip } from "@/types";
import toast from "react-hot-toast";
import { format } from "date-fns";

function TripCard({ trip }: { trip: Trip }) {
  async function deleteTrip() {
    try {
      await authAxios.delete(`/trips/${trip._id}`);
      toast.success("Trip successfully deleted");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to delete trip";
      toast.success(message);
    }
  }
  return (
    <Card className="rounded-xl">
      <CardHeader className="min-w-fit relative p-3">
        <img
          src={trip?.images[0]?.url}
          className="object-cover aspect-video rounded-lg"
        />
        <div className="absolute top-3 left-5 py-1.5 px-2 bg-orange-500 font-thin text-xs text-white rounded-lg">
          {trip?.discount} % OFF
        </div>
      </CardHeader>
      <CardContent className="w-full flex flex-col justify-between p-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 font-thin text-sm">
            <MapPin size={15} /> <span>{trip.location?.location}</span>
          </p>
          <h3 className="font-medium text-sm">{trip.title}</h3>
          <p className="font-thin text-sm truncate">{trip.overview}</p>
        </div>
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="min-w-fit flex flex-col justify-between gap-5 p-3">
        <div className="w-full grid grid-cols-2 gap-2">
          <p className="font-light text-sm">
            Tour start:{" "}
            <span className="font-thin">{format(trip.startedAt, "PP")}</span>
          </p>
          <p className="font-light text-sm">
            Tour end:{" "}
            <span className="font-thin">{format(trip.endedAt, "PP")}</span>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Group Size: <span className="font-thin">{trip.groupSize} seat</span>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Aviailable:{" "}
            <span className="font-thin">
              {trip.groupSize - (trip.bookingCount || 0)} seat
            </span>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Booked: <span className="font-thin">{trip.bookingCount} seat</span>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Cost:
            <strong className="flex items-center font-medium">
              <FaBangladeshiTakaSign size={13} /> {trip.cost.toFixed(2)}
            </strong>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Discount Amount:
            <strong className="flex items-center font-medium">
              <FaBangladeshiTakaSign size={13} />{" "}
              {(trip.discount / 100) * trip.cost}
            </strong>
          </p>
          <p className="inline-flex items-center gap-1.5 font-light text-sm">
            Tax(%):
            <strong className="flex items-center font-medium">
              {trip.tax}%
            </strong>
          </p>
        </div>

        <div className="w-full flex justify-between gap-2">
          <Button
            variant="outline"
            className="w-full md:w-fit rounded-lg border-orange-500 hover:bg-orange-50 text-orange-600 hover:text-orange-600"
            asChild
          >
            <Link to={`/trips/${trip.slug}`}>
              View Details <ArrowRight size={15} />
            </Link>
          </Button>

          <div className="flex space-x-1.5">
            <Button
              onClick={deleteTrip}
              className="w-10 h-10 p-2.5 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white"
            >
              <Trash2 />
            </Button>
            <Link
              to={`/dashboard/trips/edit/${trip._id}`}
              className="w-10 h-10 p-2.5 flex bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md"
            >
              <PenBox />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
