import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  className?: string;
  onMessageSend: (value: string) => void;
}

export default function ChatInput({
  className,
  onMessageSend,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");

  return (
    <div
      className={cn(
        "flex w-full bg-white border rounded-xl h-12 overflow-hidden",
        className
      )}
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-full w-full bg-transparent font-light text-md px-3 outline-none"
        placeholder="Write here.."
      />
      <Button
        onClick={() => onMessageSend(message)}
        className="h-full bg-orange-600 hover:bg-orange-500 text-white rounded-l-none"
      >
        Send
      </Button>
    </div>
  );
}
