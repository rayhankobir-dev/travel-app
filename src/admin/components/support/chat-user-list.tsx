/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChatUser } from "@/types";
import { ChatUser } from "./chat-user";
import { formatDateTime } from "@/lib/utils";
import EmptyConversiationImg from "@/assets/empty conversiation.svg";

export function ChatUserList({
  chatList,
  activeUser,
  setActive,
}: {
  chatList: IChatUser[] | null;
  activeUser: IChatUser | null;
  setActive: any;
}) {
  return (
    <section className="w-48 border-r">
      <div className="sticky px-2.5 py-1.5 bg-gray-100 border-b">
        <h1 className="font-medium text-lg">Support center</h1>
        <p className="font-light text-xs">
          Please send the message by clicking each user.
        </p>
      </div>
      <div className="fixed h-full w-48 overflow-y-scroll">
        {chatList ? (
          chatList.map((user: IChatUser) => (
            <ChatUser
              handleClick={() => setActive(user)}
              key={user._id}
              isActive={activeUser?._id === user?._id}
              fullName={user.fullName}
              date={formatDateTime(user.lastMessagedAt).date}
              time={formatDateTime(user.lastMessagedAt).time}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <img
              src={EmptyConversiationImg}
              className="max-w-40 px-3 text-sm py-4 mx-auto"
            />
            <p className="text-sm font-light text-orange-600">
              No available users
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
