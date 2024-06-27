import { Separator } from "@/components/ui/separator";
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
import TourHeader from "@/components/tour/tour-header";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { publicAxios } from "@/api";
import SpinnerLoading from "@/components/ui/spinner-loading";
import SEO from "@/components/ui/seo";
import { Trip } from "@/types";
import { useParams } from "react-router-dom";
import Error404 from "@/admin/pages/404";

export default function SingleTour() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicAxios.get(`/trips/${slug}`);
        setTrip(res.data.data.trip);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div className="h-screen w-full flex justify-center items-center ">
      <SpinnerLoading />
    </div>
  ) : (
    <Fragment>
      {trip && (
        <>
          <SEO title={trip.title} description={trip.overview} />

          <TourHeader
            title={trip.title}
            location={trip.location}
            totalBooked={trip.groupSize}
          />
          <ImageGallery images={trip.images} />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-5 mt-10 px-6 lg:px-0">
            <section className="max-w-7xl mx-auto col-span-12 lg:col-span-9 order-2 lg:order-1">
              <TourStatstics
                duration={4}
                groupSize={trip.groupSize}
                minAge={trip.minAge}
                maxAge={trip.maxAge}
                startDate={trip.startedAt}
                endDate={trip.endedAt}
              />
              <TourOverview overview={trip.overview} />
              <TourHighLights highlights={trip.highlights} />
              <Separator className="my-6" />
              <TourServices services={trip.services} />
              <Separator className="my-6" />
              <TourTimeline activities={trip.activities} />
              <Separator className="my-6" />
              <TourFaq faqs={trip.faqs} />
            </section>
            <div className="hi-fit col-span-12 lg:col-span-3 order-1 lg:order-2 space-y-3">
              <BookingCard
                id={trip._id}
                personPrice={trip.cost}
                tax={trip.tax}
              />
              <WeatherForcast location={trip.location} />
              <SupportCard />
            </div>
          </div>
          <FeaturedSection />
        </>
      )}

      {!trip && <Error404 title="Trip not found" redirectUrl="/" />}
    </Fragment>
  );
}
