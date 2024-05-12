import { cn } from "@/lib/utils";

interface Props {
  isStart: boolean;
  isEnd: boolean;
  title: string;
  description?: string | null;
  order?: string | null;
}
export default function TourActivity({
  isStart,
  isEnd,
  title,
  description,
  order,
}: Props) {
  return (
    <li className={cn("ms-6", order, isStart && "mb-10", isEnd && "mt-5")}>
      <div
        className={cn(
          "absolute w-4 h-4 bg-orange-600 rounded-full -start-2",
          (isStart || isEnd) && "w-6 h-6 -start-3"
        )}
      ></div>
      <h4 className="text-sm font-medium">{title}</h4>
      {description && (
        <p className="text-sm font-light max-w-xl py-1">{description}</p>
      )}
    </li>
  );
}
