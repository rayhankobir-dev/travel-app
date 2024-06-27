import { Calendar, Clock, PersonStanding, User } from "lucide-react";
import { format } from "date-fns";

interface Props {
  duration: number;
  groupSize: number;
  minAge: number;
  maxAge: number;
  startDate: Date;
  endDate: Date;
}
export default function TourStatstics({
  duration,
  groupSize,
  minAge,
  maxAge,
  startDate,
  endDate,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 mb-10 gap-3">
      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <Clock size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Duration</h4>
          <p className="font-light text-sm">{duration} days</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <User size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Group Size</h4>
          <p className="font-light text-sm">{groupSize} people</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <PersonStanding size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Age</h4>
          <p className="font-light text-sm">
            {minAge}-{maxAge} yrs
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p className="h-12 w-12 inline-flex justify-center items-center rounded-lg border">
          <Calendar size={20} />
        </p>
        <div className="space-y-0.5">
          <h4 className="font-medium text-sm">Tour duration</h4>
          <p className="font-light text-sm">
            {format(startDate, "PP")} - {format(endDate, "PP")}
          </p>
        </div>
      </div>
    </section>
  );
}
