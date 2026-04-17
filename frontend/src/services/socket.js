import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ["polling", "websocket"]
});

console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);