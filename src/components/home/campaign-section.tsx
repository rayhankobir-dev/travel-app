import CampaignLady from "@/assets/lady.png";
import { Button } from "../ui/button";

export default function CampaignSection() {
  return (
    <section className="campaign-section grid grid-cols-1 md:grid-cols-5 mt-24 mx-6 lg:mx-auto md:h-[400px] max-w-7xl rounded-2xl overflow-hidden">
      <div className="col-span-3 p-5 flex justify-center items-center">
        <div>
          <h1 className="max-w-md font-semibold text-5xl">
            Grab up to 35% off on your favorite Destination
          </h1>
          <p className="font-thin text-xl py-3">
            Limited time offer, don't miss the opportunity
          </p>
          <Button className="bg-orange-600 text-white">Book Now</Button>
        </div>
      </div>
      <img
        src={CampaignLady}
        className="col-span-2 w-full h-full overflow-hidden"
      />
    </section>
  );
}
