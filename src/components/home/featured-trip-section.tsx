import { Button } from "../ui/button";
import { FeaturedTrips } from "./featured-trips";

export default function FeaturedSection() {
  return (
    <section className="max-w-7xl mt-28 mx-auto px-6 lg:px-0">
      <div className="flex justify-between gap-2 py-3">
        <h2 className="font-semibold text-lg mb-5">Find Popular Tours</h2>
        <Button variant="link">See All</Button>
      </div>

      <div className="">
        <FeaturedTrips />
      </div>
    </section>
  );
}
