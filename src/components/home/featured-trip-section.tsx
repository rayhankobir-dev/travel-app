import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FeaturedTrips } from "./featured-trips";

export default function FeaturedSection() {
  return (
    <section className="container max-w-7xl mt-28 mx-auto">
      <div className="flex justify-between gap-2 py-3">
        <h2 className="font-semibold text-lg mb-5">Find Popular Tours</h2>
        <Button variant="link" asChild>
          <Link to="/trips?">See All</Link>
        </Button>
      </div>

      <div className="px-8">
        <FeaturedTrips />
      </div>
    </section>
  );
}
