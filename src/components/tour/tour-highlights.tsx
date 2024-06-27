import { Dot } from "lucide-react";

export default function TourHighLights({
  highlights,
}: {
  highlights: string[];
}) {
  return (
    <section>
      <h3 className="font-medium text-md mt-5">Tour Highlights</h3>
      <ul className="flex flex-col font-light text-sm py-3">
        {highlights?.map((highlight: string, index: number) => (
          <li key={index} className="inline-flex items-center">
            <Dot />
            {highlight}
          </li>
        ))}
      </ul>
    </section>
  );
}
