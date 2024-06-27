import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import BreadcrumbView from "@/components/ui/custom-breadcrumb";
import GeoChart from "@/components/ui/charts/geo-chart";
import PieChart from "@/components/ui/charts/pie-chart";
import SpinerLoading from "@/components/ui/spinner-loading";
import PopularTripsCard from "../components/popular-card";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Map, Users } from "lucide-react";
import { IoMdBook } from "react-icons/io";
import { BiTrip } from "react-icons/bi";
import { Link } from "react-router-dom";
import SEO from "@/components/ui/seo";
import { authAxios } from "@/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetAnalytics() {
      try {
        const res = await authAxios.get("/dashboard");
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetAnalytics();
  }, []);
  return (
    <main className="h-full flex flex-col p-3">
      <SEO title="Admin - Dashboard" />
      <section className="flex flex-col gap-3 mb-6">
        <BreadcrumbView />
        <div className="flex flex-wrap justify-between gap-1.5">
          <div className="flex-1 space-y-1">
            <h1 className="font-semibold text-lg lg:text-2xl">
              Admin Dashboard
            </h1>
            <p className="text-sm font-light">
              While makeing Withdraw please check your payement method.
            </p>
          </div>
          <Button
            variant="outline"
            className="h-8 w-fit border-orange-500 text-orange-500 bg-orange-50 hover:text-orange-600 hover:bg-orange-100"
            asChild
          >
            <Link
              to="/dashboard/trips/create"
              className="flex gap-1 font-light text-xs"
            >
              Create <BiTrip size={14} />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-fit border-blue-500 text-blue-500 bg-blue-50 hover:text-blue-600 hover:bg-blue-100"
            asChild
          >
            <Link
              to="/dashboard/trips/create"
              className="flex gap-1 font-light text-xs"
            >
              <Map size={13} /> Add
            </Link>
          </Button>
        </div>
      </section>
      {loading ? (
        <div className="h-96 w-full flex justify-center items-center">
          <SpinerLoading size={30} className="text-orange-600" />
        </div>
      ) : (
        <section className="h-full flex flex-col gap-4 overflow-y-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <Card className="bg-green-50 border-green-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-green-600">
                  Total Admins
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <Users size={15} /> {data.analytics?.totalTours} admis
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-blue-600">
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <Users size={15} /> {data.analytics?.totalTours} customers
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-green-600">
                  Total Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <Map size={15} /> 10 locations
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-green-600">
                  Total Trips
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <BiTrip size={15} /> {data.analytics?.totalTours} trips
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-orange-600">
                  Published Trips
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <BiTrip size={15} /> {data.analytics?.totalTours} trips
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-purple-600">
                  Total Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <IoMdBook size={15} /> {data.analytics?.totalOrders} bookings
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-purple-rose h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-rose-600">
                  Canceled Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <IoMdBook size={15} />0 bookings
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200 h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-purple-600">
                  Booking Ammount
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <FaBangladeshiTakaSign size={12} /> 8025.00 tk.
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-purple-rose h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-rose-600">
                  Refunded Ammount
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <FaBangladeshiTakaSign size={12} />
                  0.00 tk.
                </CardTitle>
              </CardContent>
            </Card>

            <Card className="bg-rose-50 border-purple-rose h-fit">
              <CardHeader className="py-1.5">
                <CardTitle className="text-md text-rose-600">
                  Cancelation Charge
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardTitle className="inline-flex items-center gap-2 text-sm font-light">
                  <FaBangladeshiTakaSign size={12} />
                  0.00 tk.
                </CardTitle>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Trips locations wise</CardDescription>
                <CardTitle>Total Trips</CardTitle>
              </CardHeader>
              <CardContent className="max-w-full h-96">
                {/* <PieChart data={data?.analytics?.orderStatusData} /> */}
              </CardContent>
            </Card>

            <PopularTripsCard
              title="Popular Trips"
              subTitle="Mostly booked trips"
              trips={data?.popularTours}
            />
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardDescription>Locations based revenue</CardDescription>
              <CardTitle>Top Tourist Attractions</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-[450px]">
              <GeoChart
                data={[
                  ["Country", "Players"],
                  ["United States", 1],
                  ["Bangladesh", 100],
                ]}
              />
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
}
