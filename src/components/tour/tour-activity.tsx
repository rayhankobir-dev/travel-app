import { cn } from "@/lib/utils";

interface Props {
  isStart?: boolean;
  isEnd?: boolean;
  title: string;
  description?: string | null;
}
export default function TourActivity({
  isStart,
  isEnd,
  title,
  description,
}: Props) {
  return (
    <li
      className={cn(
        "ms-6",
        isStart && "mb-10 order-first",
        isEnd && "mt-5 order-last"
      )}
    >
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
