import { Dot } from "lucide-react";
const services = [
  "Local taxes",
  "Hotel pickup and drop-off by air-conditioned minivan",
  "InsuranceTransfer to a private pier",
  "Soft drinks",
  "Towel",
  "Tips",
  "Alcoholic Beverages",
];
export default function TourServices() {
  return (
    <section>
      <h3 className="font-semibold text-xl">What's included</h3>
      <ul className="grid lg:grid-cols-2 gap-y-2 gap-x-4 py-3">
        {services.map((service, index) => (
          <li
            key={index}
            className="inline-flex items-center font-light text-sm"
          >
            <Dot className="min-w-fit" />
            {service}
          </li>
        ))}
      </ul>
    </section>
  );
}
