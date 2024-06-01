import { ChatUserList } from "@/admin/components/support/chat-user-list";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import useAuth from "@/hooks/useAuth";
import Conversiations from "@/components/chat/conversiations";
import { authAxios } from "@/api";
import { IChatUser } from "@/types";
import {
  AdminChatSkeleton,
  AdminChatUserListSkeleton,
} from "@/components/skeleton/chat-skeleton";

export default function AdminSupport() {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [userLists, setUserLists] = useState<IChatUser[] | null>(null);
  const [activeUser, setActiveUser] = useState<IChatUser | null>(null);
  const { user } = useAuth();

  async function getUserLists() {
    try {
      const res = await authAxios.get<{ data: { users: IChatUser[] } }>(
        "/chats/conversiations"
      );
      const users = res.data.data.users;
      setUserLists(users.length > 0 ? users : null);
    } catch (error) {
      console.error("Error fetching user lists:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getUserLists();
  }, []);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("join", user);
      socket.on("receive-message", getUserLists);
      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  return (
    <main className="h-full flex border rounded-lg overflow-hidden">
      {isFetching ? (
        <AdminChatUserListSkeleton />
      ) : (
        <ChatUserList
          activeUser={activeUser}
          setActive={setActiveUser}
          chatList={userLists}
        />
      )}
      {isFetching ? (
        <AdminChatSkeleton />
      ) : activeUser ? (
        <Conversiations activeUser={activeUser} />
      ) : (
        <AdminChatSkeleton />
      )}
    </main>
  );
}
