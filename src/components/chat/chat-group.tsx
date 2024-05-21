/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Chat from "./chat";
import { BiSupport } from "react-icons/bi";
import { ChatType, generateChats } from "./chat-data";
import ChatInput from "./chat-input";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function ChatGroup() {
  const [chats, setChats] = useState<ChatType[]>(generateChats());
  const { user }: any = useAuth();

  const handleSendMessage = async (message: string) => {
    socket.emit("message", {
      user,
      message,
    });
  };

  useEffect(() => {
    socket.connect();

    socket.emit("join", user);

    socket.on("receive-message", (data) => {
      console.log("Recv:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <Card className="w-full mx-auto border" onAuxClick={() => setChats([])}>
      <div className="inline-flex items-center gap-3 p-6">
        <div>
          <BiSupport size={35} className="text-orange-600" />
        </div>
        <div>
          <CardTitle className="font-medium text-xl">
            Customer support
          </CardTitle>
          <CardDescription className="max-w-xl font-light text-sm">
            Cnnecting your all times support chats.
          </CardDescription>
          <strong className="capitalize">{user.role}</strong>
        </div>
      </div>
      <CardContent className={cn("max-h-[80%] h-[30rem] overflow-y-scroll")}>
        {chats?.map((chat) => (
          <Chat key={chat.id} {...chat} />
        ))}
      </CardContent>
      <CardFooter>
        <ChatInput onMessageSend={handleSendMessage} />
      </CardFooter>
    </Card>
  );
}

interface ChatsProps {
  chats: ChatType[];
  className?: string;
}

export function Chats({ className, chats }: ChatsProps) {
  return (
    <CardContent
      className={cn("max-h-full h-full overflow-y-scroll", className)}
    >
      {chats?.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </CardContent>
  );
}
