import { baseURL } from "@/api";
import { io } from "socket.io-client";
export const url = baseURL;

export const socket = io(url, {
  autoConnect: false,
});
