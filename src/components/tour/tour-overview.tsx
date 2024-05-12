import { cn } from "@/lib/utils";

export default function TourOverview({
  className,
  overview,
}: {
  className?: string;
  overview: string;
}) {
  return (
    <section className={cn(className)}>
      <h3 className="font-semibold text-xl">Tour Overview</h3>
      <p className="font-light text-sm">{overview}</p>
    </section>
  );
}
