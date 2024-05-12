import TourActivity from "./tour-activity";

const activities = [
  {
    isStart: true,
    isEnd: false,
    title: "Day 1: Pickup from Airport",
    description: null,
    order: "order-first",
  },
  {
    isStart: false,
    isEnd: false,
    title: "Day 2: Doing something from Airport",
    description: "Helo something",
    order: "order-last",
  },
  {
    isStart: false,
    isEnd: true,
    title: "Day 3: Drop from Airport",
    description: null,
    order: "order-last",
  },
];

export default function TourTimeline() {
  return (
    <section>
      <h3 className="font-semibold text-xl">Activities</h3>

      <div className="px-4 py-5">
        <ol className="relative grid border-s border-dashed border-orange-600">
          {activities.map((activity, index) => (
            <TourActivity key={index} {...activity} />
          ))}
        </ol>
      </div>
    </section>
  );
}
