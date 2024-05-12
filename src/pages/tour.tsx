/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, User } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import FeaturedSection from "@/components/home/featured-trip-section";
import TourFaq from "@/components/tour/tour.faq";
import TourTimeline from "@/components/tour/tour-timeline";
import TourHighLights from "@/components/tour/tour-highlights";
import TourServices from "@/components/tour/tour-services";
import TourOverview from "@/components/tour/tour-overview";
import WeatherForcast from "@/components/tour/weather-forcast";
import ImageGallery from "@/components/tour/tour-gallery";
import BookingCard from "@/components/tour/tour-booking";
import SupportCard from "@/components/tour/support-card";
import TourStatstics from "@/components/tour/tour-statstics";

const place = "Cox's Bazar";
export default function SingleTour() {
  useEffect(() => {
    // fetch(
    //   "https://api.openweathermap.org/data/2.5/forecast?q=Naogaon&units=metric&appid=e6de7be75ad5fce9bc74bcbee51c17bf"
    // )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  }, []);
  return (
    <Fragment>
      <TorHead />
      <ImageGallery />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-5 mt-10 px-6 lg:px-0">
        <TourDetails />
        <div className="hi-fit col-span-12 lg:col-span-3 order-1 lg:order-2 space-y-3">
          <BookingCard />
          <WeatherForcast location="Naogaon" />
          <SupportCard />
        </div>
      </div>
      <FeaturedSection />
    </Fragment>
  );
}

function TorHead() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-0 mt-24 py-5 space-y-4">
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="font-semibold text-3xl">
          Explore all things to do in Packege
        </h1>
      </div>
      <div className="flex gap-4">
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <Star size={15} /> 4.8 (234)
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <MapPin size={15} /> {place}
        </p>
        <p className="inline-flex items-center gap-2 font-thin text-sm">
          <User size={15} /> 23+ people
        </p>
      </div>
    </section>
  );
}

function TourDetails() {
  return (
    <section className="max-w-7xl mx-auto col-span-12 lg:col-span-9 order-2 lg:order-1">
      <TourStatstics
        duration={4}
        groupSize={120}
        minAge={18}
        maxAge={40}
        startDate="May 2, 2024"
        endDate="May 20, 2024"
      />
      <TourOverview
        overview={`The Phi Phi archipelago is a must-visit while in Phuket, and this
        speedboat trip whisks you around the islands in one day. Swim over the
        coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at
        Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in "The
        Beach." Boat transfers, snacks, buffet lunch, snorkeling equipment, and
        Phuket hotel pickup and drop-off all included.`}
      />
      <TourHighLights />
      <Separator className="my-6" />
      <TourServices />
      <Separator className="my-6" />
      <TourTimeline />
      <Separator className="my-6" />
      <TourFaq />
    </section>
  );
}
