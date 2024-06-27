import { Activity } from "@/types";
import TourActivity from "./tour-activity";

export default function TourTimeline({
  activities,
}: {
  activities: Activity[];
}) {
  const activitiesWithFlags = activities.map((activity, index) => ({
    ...activity,
    isStart: index === 0,
    isEnd: index === activities.length - 1,
  }));

  return (
    <section>
      <h3 className="font-semibold text-xl">Activities</h3>

      <div className="px-4 py-5">
        <ol className="relative grid border-s border-dashed border-orange-600">
          {activitiesWithFlags.map((activity, index) => (
            <TourActivity key={index} {...activity} />
          ))}
        </ol>
      </div>
    </section>
  );
}
