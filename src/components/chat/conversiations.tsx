import { authAxios } from "@/api";
import { IChat, IChatUser } from "@/types";
import { useEffect, useState } from "react";
import Chat from "./chat";
import { ChatUserInfo } from "@/admin/components/support/chat-user-info";
import ChatInput from "./chat-input";
import { socket } from "@/lib/socket";
import useAuth from "@/hooks/useAuth";
import {
  ChatInputSkeleton,
  ConversiationsSkeleton,
} from "../skeleton/chat-skeleton";

export default function Conversiations({
  activeUser,
}: {
  activeUser: IChatUser;
}) {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [chats, setChats] = useState<IChat[] | null>(null);
  const { user } = useAuth();

  const handleSendMessage = async (message: string) => {
    try {
      const data = {
        sender: user?._id,
        receiver: activeUser._id,
        message,
      };
      socket.emit("send-to-user", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getConversiations() {
      try {
        const res = await authAxios.get(
          `/chats/conversiations/${activeUser._id}`
        );
        setChats(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }
    getConversiations();
  }, [activeUser]);

  useEffect(() => {
    const handleMessage = async (data: { from: string; chat: IChat }) => {
      setChats((prev: IChat[] | null) => {
        if (
          activeUser._id === data.chat.sender._id ||
          user?._id === data.chat.sender._id
        ) {
          return prev ? [...prev, data.chat] : [data.chat];
        } else {
          return prev ? [...prev] : null;
        }
      });
    };

    socket.on("receive-message", handleMessage);
    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [activeUser._id, activeUser.email, user?._id]);

  return (
    <section className="flex-1 flex flex-col">
      <ChatUserInfo fullName={activeUser?.fullName} status={true} />
      {isFetching ? (
        <ConversiationsSkeleton />
      ) : (
        <div className="h-full px-4 overflow-y-scroll ">
          {chats ? (
            chats.map((chat: IChat) => <Chat key={chat._id} chat={chat} />)
          ) : (
            <p>No conversiations</p>
          )}
        </div>
      )}

      {isFetching ? (
        <ChatInputSkeleton />
      ) : (
        <div className="px-4 py-2 border-t">
          <ChatInput onMessageSend={handleSendMessage} />
        </div>
      )}
    </section>
  );
}
