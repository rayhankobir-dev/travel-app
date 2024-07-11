import { io } from "socket.io-client";
export const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;
export const url = SOCKET_API_URL;

export const socket = io(url, {
  autoConnect: false,
});
