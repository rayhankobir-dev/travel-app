import { baseURL } from "@/api";
import { io } from "socket.io-client";

export const socket = io(baseURL, {
  autoConnect: false,
});
