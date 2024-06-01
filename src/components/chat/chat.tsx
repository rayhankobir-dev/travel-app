import { cn, formatDateTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IChat } from "@/types";
import useAuth from "@/hooks/useAuth";

export default function Chat({ chat }: { chat: IChat }) {
  const { user } = useAuth();
  const isOwner = user?._id == chat.sender._id;
  return (
    <article
      dir={isOwner ? "rtl" : "ltr"}
      className="flex items-end gap-2 py-2"
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-xs">
          {chat?.sender?.fullName[0]}
        </AvatarFallback>
        <AvatarImage />
      </Avatar>
      <div className="px-1">
        <p
          dir="ltr"
          className={cn(
            "w-full py-2 bg-gray-200 rounded-2xl px-3.5 text-sm",
            isOwner ? "rounded-br-none" : "rounded-bl-none"
          )}
        >
          {chat?.message}
        </p>
        <div className="flex items-center gap-1 text-xs">
          <strong className="font-semibold">
            {chat.sender._id == user?._id
              ? "You"
              : chat.isAdmin
              ? "Admin"
              : chat.sender.fullName}
          </strong>
          <time dir="ltr" className="space-x-1">
            <span>{formatDateTime(chat?.createdAt).date}</span>
            <span>{formatDateTime(chat?.createdAt).time}</span>
          </time>
        </div>
      </div>
    </article>
  );
}
