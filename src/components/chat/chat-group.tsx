import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Chat from "./chat";
import EmptyConversiationImg from "@/assets/empty conversiation.svg";
import { BiSupport } from "react-icons/bi";
import ChatInput from "./chat-input";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  ChatInputSkeleton,
  ConversiationsSkeleton,
} from "../skeleton/chat-skeleton";
import { authAxios } from "@/api";
import { IChat } from "@/types";

export function ChatGroup() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [chats, setChats] = useState<IChat[] | null>(null);
  const { user } = useAuth();

  const handleSendMessage = async (message: string) => {
    if (user?._id) {
      socket.emit("send-to-admin", {
        sender: user._id,
        message,
      });
    }
  };

  useEffect(() => {
    async function fetchChats() {
      if (user?._id) {
        try {
          const res = await authAxios.get<{ data: IChat[] }>(
            `/chats/conversiations/${user._id}`
          );
          const conversiations = res.data.data;
          setChats(conversiations.length > 0 ? conversiations : null);
        } catch (error) {
          console.error("Error fetching chats:", error);
        } finally {
          setIsFetching(false);
        }
      }
    }
    fetchChats();
  }, [user?._id]);

  useEffect(() => {
    const handleMessage = (data: { from: string; chat: IChat }) => {
      setChats((prev: IChat[] | null) =>
        prev ? [...prev, data.chat] : [data.chat]
      );
    };

    socket.on("receive-message", handleMessage);
    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("join", user);

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <Card className="w-full mx-auto border" onAuxClick={() => setChats([])}>
      <div className="w-full inline-flex items-center gap-3 p-6 border-b">
        <div>
          <BiSupport size={35} className="text-orange-600" />
        </div>
        <div>
          <CardTitle className="font-medium text-xl">
            Customer support
          </CardTitle>
          <CardDescription className="max-w-xl font-light text-sm">
            Connecting your all times support chats.
          </CardDescription>
        </div>
      </div>
      <CardContent className={cn("max-h-[80%] h-[30rem] overflow-y-scroll")}>
        {isFetching ? <ConversiationsSkeleton /> : <Chats chats={chats} />}
      </CardContent>
      <CardFooter className="py-4 border-t">
        {isFetching ? (
          <ChatInputSkeleton />
        ) : (
          <ChatInput onMessageSend={handleSendMessage} />
        )}
      </CardFooter>
    </Card>
  );
}

interface ChatsProps {
  chats: IChat[] | null;
  className?: string;
}

export function Chats({ className, chats }: ChatsProps) {
  return (
    <CardContent
      className={cn("max-h-full h-full overflow-y-scroll", className)}
    >
      {chats ? (
        chats.map((chat) => <Chat key={chat._id} chat={chat} />)
      ) : (
        <div className="h-full flex flex-col justify-center items-center ">
          <img
            src={EmptyConversiationImg}
            className="max-w-48 px-3 text-sm py-4 mx-auto"
          />
          <p className="text-sm font-light text-orange-600">
            No available conversiations.
          </p>
        </div>
      )}
    </CardContent>
  );
}
