import type { Server } from "node:http";
import { WebSocketServer } from "ws";

export const attachWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (socket) => {
    console.log("Rider connected");
    socket.send(JSON.stringify({ type: "welcome" }));

    socket.on("message", (data) => {
      console.log("Received:", data.toString());
      socket.send(JSON.stringify({ type: "echo", data: data.toString() }));
    });

    socket.on("close", () => console.log("Rider disconnected"));
  });

  return wss;
};