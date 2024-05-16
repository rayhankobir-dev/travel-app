import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Chat from "./chat";
import { BiSupport } from "react-icons/bi";
import { generateChats } from "./chat-data";
import ChatInput from "./chat-input";
import { socket } from "@/lib/socket";
import { useEffect } from "react";

export function Chats() {
  const chats = generateChats();

  const users = [
    {
      id: "6644d1795c6b4ad139663baf",
      fullName: "Rayhan",
      email: "rayhan@gmail.com",
      role: "admin",
    },
    {
      id: "6644d18d5c6b4ad139663bb6",
      fullName: "Raju",
      email: "raju@gmail.com",
      role: "user",
    },
  ];

  const handleSendMessage = async (message: string) => {
    socket.emit("send-message-to-admins", {
      data: {
        ...users[1],
        message,
      },
    });
  };

  useEffect(() => {
    socket.connect();
    socket.emit("join-admin");
    socket.on("rcv", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card className="w-full mx-auto border">
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
        </div>
      </div>
      <CardContent className="max-h-[80%] h-[26rem] overflow-y-scroll">
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
