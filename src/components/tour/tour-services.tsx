import { Dot } from "lucide-react";

export default function TourServices({ services }: { services: string[] }) {
  return (
    <section>
      <h3 className="font-semibold text-xl">What's included</h3>
      <ul className="grid lg:grid-cols-2 gap-y-2 gap-x-4 py-3">
        {services?.map((service: string, index: number) => (
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
