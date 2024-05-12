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
import TorHeader from "@/components/tour/tour-header";
import { Fragment } from "react/jsx-runtime";

const overview = `The Phi Phi archipelago is a must-visit while in Phuket, and this
speedboat trip whisks you around the islands in one day. Swim over the
coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at
Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in "The
Beach." Boat transfers, snacks, buffet lunch, snorkeling equipment, and
Phuket hotel pickup and drop-off all included.`;

export default function SingleTour() {
  return (
    <Fragment>
      <TorHeader
        title="Explore all things to do in Packege"
        place="Cox's Bazar"
        rating={4.8}
        totalRatedUser={234}
        totalPeopleEnrolled={500}
      />
      <ImageGallery />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-5 mt-10 px-6 lg:px-0">
        <section className="max-w-7xl mx-auto col-span-12 lg:col-span-9 order-2 lg:order-1">
          <TourStatstics
            duration={4}
            groupSize={120}
            minAge={18}
            maxAge={40}
            startDate="May 2, 2024"
            endDate="May 20, 2024"
          />
          <TourOverview overview={overview} />
          <TourHighLights />
          <Separator className="my-6" />
          <TourServices />
          <Separator className="my-6" />
          <TourTimeline />
          <Separator className="my-6" />
          <TourFaq />
        </section>
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
