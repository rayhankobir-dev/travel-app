import { io } from "socket.io-client";
export const url = "https://travella-api.vercel.app";

export const socket = io(url, {
  autoConnect: false,
});
