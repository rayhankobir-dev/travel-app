import Hero from "@/components/home/hero";
import TrendingDestinations from "@/components/home/trending-destinations";
import { Fragment } from "react";
import CampaignSection from "@/components/home/campaign-section";
import FeaturedSection from "@/components/home/featured-trip-section";

import Food from "@/assets/food.png";
import CityTour from "@/assets/city-tour.png";
import BeachTour from "@/assets/beach-tours.png";
import MuseumTour from "@/assets/museum-tour.png";
import Cruies from "@/assets/cruises.png";
import Hiking from "@/assets/hiking.png";

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <TrendingDestinations />
      <FeaturedSection />
      <CampaignSection />
      <section className="max-w-7xl mx-auto mt-24 px-6 lg:px-0">
        <h2 className="font-semibold text-xl mb-8">Popular things to do</h2>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
          <div className="relative">
            <img src={Cruies} className="rounded-lg" />
            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              Cruies
            </h4>
          </div>

          <div className="relative">
            <img src={MuseumTour} className="rounded-lg" />

            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              Museum Tour
            </h4>
          </div>

          <div className="relative">
            <img src={BeachTour} className="rounded-lg" />

            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              Beach Tour
            </h4>
          </div>

          <div className="relative">
            <img src={CityTour} className="rounded-lg" />

            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              City Tour
            </h4>
          </div>

          <div className="relative">
            <img src={Food} className="rounded-lg" />

            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              Food
            </h4>
          </div>

          <div className="relative">
            <img src={Hiking} className="rounded-lg" />

            <h4 className="w-full absolute bottom-5 left-3 font-light text-md text-white">
              Hiking
            </h4>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
