import { Button } from "../ui/button";
import TrendingDestItem from "./trending-dest-item";

export default function TrendingDestinations() {
  return (
    <section className="max-w-7xl mt-28 mx-auto px-6 lg:px-0">
      <div className="flex justify-between gap-2">
        <h2 className="font-semibold text-lg mb-5">Trending destinations</h2>
        <Button variant="link">See All</Button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 ga-2 py-3">
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
        <TrendingDestItem />
      </div>
    </section>
  );
}
