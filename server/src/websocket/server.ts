import type { Server } from "node:http";
import { WebSocketServer } from "ws";
import { getRiderId } from "./identify.js";
import { parseLocationMessage } from "../validators/location.validator.js";
import { saveLocation } from "../services/location.service.js";

export const attachWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (socket, request) => {
    const riderId = getRiderId(request);
    if (!riderId) {
      socket.close(4001, "riderId required");
      return;
    }
    console.log(`Rider connected: ${riderId}`);

    socket.on("message", async (data) => {
      const location = parseLocationMessage(data.toString());
      if (!location) {
        socket.send(JSON.stringify({ type: "error", message: "Invalid location message" }));
        return;
      }
      try {
        await saveLocation(riderId, location.lat, location.lng);
        socket.send(JSON.stringify({ type: "ack" }));
      } catch {
        socket.send(JSON.stringify({ type: "error", message: "Could not save location" }));
      }
    });

    socket.on("close", () => console.log(`Rider disconnected: ${riderId}`));
  });

  return wss;
};