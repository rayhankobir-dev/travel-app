import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatData {
  isOwner?: boolean;
  message: string;
  time: string;
  userName?: string;
}

export default function Chat({
  isOwner = false,
  message,
  time,
  userName = "Admin",
}: ChatData) {
  return (
    <article
      dir={isOwner ? "ltr" : "rtl"}
      className="flex items-end gap-2 py-2"
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-xs">{userName[0]}</AvatarFallback>
        <AvatarImage />
      </Avatar>
      <div className="px-1">
        <p
          dir="ltr"
          className={cn(
            "w-full py-2 bg-gray-200 rounded-2xl px-3.5 text-sm",
            isOwner ? "rounded-bl-none" : "rounded-br-none"
          )}
        >
          {message}
        </p>
        <div className="flex items-center gap-0.5 text-xs">
          <strong className="font-medium">{userName}</strong>
          <time dir="ltr">{time}</time>
        </div>
      </div>
    </article>
  );
}
