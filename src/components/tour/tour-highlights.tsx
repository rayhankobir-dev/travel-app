import { Dot } from "lucide-react";

const hightLights = [
  "Be amazed by the variety of marine life in the archepelago",
  "Enjoy relaxing in paradise with white sand beaches and azure turquoise water",
  "Be amazed by the variety of marine life in the archepelago",
  "Feel the comfort of a tour limited to 35 passengers",
  "Catch a glimpse of the wild monkeys around Monkey Beach",
];
export default function TourHighLights() {
  return (
    <section>
      <h3 className="font-medium text-md mt-5">Tour Highlights</h3>
      <ul className="flex flex-col font-light text-sm py-3">
        {hightLights.map((highLight, index) => (
          <li key={index} className="inline-flex items-center">
            <Dot />
            {highLight}
          </li>
        ))}
      </ul>
    </section>
  );
}
