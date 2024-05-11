import { Fragment } from "react/jsx-runtime";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import Chat from "./chat";
import { generateChats } from "./chat-data";

export function ChatGroup() {
  return (
    <Fragment>
      <section className="mt-14">
        <div className="faq-section h-48 flex justify-start items-end bg-gray-50 bg-opacity-20 px-6 lg:px-0">
          <div className="max-w-7xl w-full mx-auto space-y-2  py-10">
            <h1 className="font-semibold text-3xl">Support Center</h1>
            <p className="font-light text-sm">
              Find our customer's frequent questions and answers.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl grid lg:grid-cols-12 gap-5 mx-auto">
        <div className="col-span-4">
          <div className="grid border divide-y rounded-lg">
            <div className="flex flex-col items-center p-6">
              <MessageCircleWarning size={40} className="text-orange-600" />
              <div className="py-3">
                <h2 className="font-medium text-lg text-center">
                  Direct Chating
                </h2>
                <p className="font-light text-sm text-center mt-3">
                  You can directly chat with our customer support team and they
                  will help you to resolve your problem. Including refunding
                  order manage and cancallation.
                  <br />
                  <br />
                  To refund the money we are taking 7 working days to get back
                  your money in your account.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-6">
              <PhoneCall size={40} className="text-orange-600" />
              <div className="py-3">
                <h2 className="font-medium text-lg text-center">
                  Helpline(16242)
                </h2>
                <p className="font-light text-sm text-center mt-3">
                  Lorem ipsum dolor sit, amet consectetur.
                  <br />
                  <strong>Hot-line:</strong> +9123458
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center p-6">
              <MapPin size={40} className="text-orange-600" />
              <div className="py-3">
                <h2 className="font-medium text-lg text-center">
                  Office Address
                </h2>
                <p className="font-light text-sm text-center mt-3">
                  Baridhara Dhaka-1212, Near by Nadda Bridge, <br />
                  Khilket, Vatara, Dahaka
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <Chats />
        </div>
      </section>
    </Fragment>
  );
}
import { BiSupport } from "react-icons/bi";
import { MapPin, MessageCircleWarning, PhoneCall } from "lucide-react";
function Chats() {
  const chats = generateChats();
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
        {chats.map((chat) => (
          <Chat key={chat.id} {...chat} />
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex w-full bg-white border rounded-xl h-12 overflow-hidden">
          <input
            className="h-full w-full bg-transparent font-light text-md px-3 outline-none"
            placeholder="Write here.."
          />
          <Button className="h-full bg-orange-600 hover:bg-orange-500 text-white rounded-l-none">
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
