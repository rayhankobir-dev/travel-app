import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface IChatUserProps {
  isActive: boolean;
  fullName: string;
  date: string;
  time: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function ChatUser({
  isActive,
  handleClick,
  fullName,
  date,
  time,
}: IChatUserProps) {
  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2 px-2 py-2 border-b hover:bg-orange-50 active:bg-orange-50 cursor-pointer hover:border-r",
        isActive && "bg-orange-100 border-r"
      )}
    >
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-orange-400 text-white">
          {fullName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-medium text-sm leading-none">{fullName}</h2>
        <small className="font-light text-xs">
          {date} <span className="uppercase">{time}</span>
        </small>
      </div>
    </div>
  );
}
