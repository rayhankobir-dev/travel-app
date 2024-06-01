import { cn } from "@/lib/utils";

export function ChatUserInfo({
  fullName,
  status,
}: {
  fullName: string | undefined;
  status: boolean;
}) {
  return (
    <div className="px-4 py-3.5 bg-gray-100 border-b">
      <h3 className="text-sm font-medium">{fullName}</h3>
      <p
        className={cn(
          "inline-flex items-center gap-1.5 font-light text-sm",
          status ? "text-green-500" : "text-rose-500"
        )}
      >
        <span
          className={cn(
            "animate-pulse p-1 rounded-full",
            status ? "bg-green-200" : "bg-rose-200"
          )}
        >
          <span
            className={cn(
              "block w-2 h-2 rounded-full",
              status ? "bg-green-600" : "bg-rose-600"
            )}
          ></span>
        </span>
        {status ? "Online" : "Offline"}
      </p>
    </div>
  );
}
