import { generateChats } from "@/components/chat/chat-data";
import { Chats } from "@/components/chat/chat-group";
import ChatInput from "@/components/chat/chat-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminSupport() {
  const chats = generateChats();
  return (
    <main className="h-full flex border rounded-lg">
      <section className="w-48 border-r">
        <div className="fixed h-full w-48 divide-y overflow-y-scroll">
          <ChatUser />
          <ChatUser />
          <ChatUser />
        </div>
      </section>
      <section className="flex-1 flex flex-col py-2 overflow-y-scroll">
        <div className="px-4 py-1">
          <h2 className="text-lg font-medium">Raju Rayhan</h2>
          <p className="font-light text-sm">Trip: Tour in Cox's Bazar 3day</p>
        </div>
        <Chats className="" chats={chats} />
        <div className="px-4">
          <ChatInput onMessageSend={() => console.log("sent")} />
        </div>
      </section>
    </main>
  );
}

export function ChatUser() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-orange-50 active:bg-orange-50 cursor-pointer">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-orange-400 text-white">F</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5">
        <h2 className="font-medium text-sm leading-none">Raju Rayhan</h2>
        <small className="font-light uppercase">12:45 pm</small>
      </div>
    </div>
  );
}
